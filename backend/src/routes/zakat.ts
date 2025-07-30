import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth';

const router = express.Router();

// Zakat calculation constants
const ZAKAT_RATES = {
  NISAB_GOLD: 85, // grams
  NISAB_SILVER: 595, // grams
  ZAKAT_RATE: 0.025, // 2.5%
  LUNAR_YEAR_DAYS: 354,
};

// Current precious metal prices (would come from an API in production)
const CURRENT_PRICES = {
  gold: 65.50, // USD per gram
  silver: 0.85, // USD per gram
  lastUpdated: new Date().toISOString(),
};

// Zakat calculation types
interface ZakatCalculation {
  totalWealth: number;
  nisabValue: number;
  zakatDue: number;
  isEligible: boolean;
  breakdown: {
    cash: number;
    gold: number;
    silver: number;
    investments: number;
    businessAssets: number;
    receivables: number;
    cryptocurrency: number;
    other: number;
  };
  deductions: {
    personalDebts: number;
    businessDebts: number;
    immediateExpenses: number;
  };
}

/**
 * Calculate Nisab value based on precious metals
 */
const calculateNisab = (metalType: 'gold' | 'silver' = 'gold'): number => {
  if (metalType === 'gold') {
    return NISAB_GOLD * CURRENT_PRICES.gold;
  }
  return NISAB_SILVER * CURRENT_PRICES.silver;
};

/**
 * Calculate Zakat for given wealth
 */
const calculateZakat = (wealth: any): ZakatCalculation => {
  const {
    cash = 0,
    gold = 0,
    silver = 0,
    investments = 0,
    businessAssets = 0,
    receivables = 0,
    cryptocurrency = 0,
    other = 0,
    personalDebts = 0,
    businessDebts = 0,
    immediateExpenses = 0,
  } = wealth;

  const breakdown = {
    cash: parseFloat(cash),
    gold: parseFloat(gold),
    silver: parseFloat(silver),
    investments: parseFloat(investments),
    businessAssets: parseFloat(businessAssets),
    receivables: parseFloat(receivables),
    cryptocurrency: parseFloat(cryptocurrency),
    other: parseFloat(other),
  };

  const deductions = {
    personalDebts: parseFloat(personalDebts),
    businessDebts: parseFloat(businessDebts),
    immediateExpenses: parseFloat(immediateExpenses),
  };

  const totalAssets = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);
  const totalWealth = totalAssets - totalDeductions;

  const nisabValue = calculateNisab('gold'); // Use gold nisab by default
  const isEligible = totalWealth >= nisabValue;
  const zakatDue = isEligible ? totalWealth * ZAKAT_RATES.ZAKAT_RATE : 0;

  return {
    totalWealth,
    nisabValue,
    zakatDue,
    isEligible,
    breakdown,
    deductions,
  };
};

/**
 * @route   POST /api/zakat/calculate
 * @desc    Calculate Zakat for given wealth
 * @access  Public
 */
router.post('/calculate', [
  body('cash').optional().isFloat({ min: 0 }).withMessage('Cash must be a positive number'),
  body('gold').optional().isFloat({ min: 0 }).withMessage('Gold value must be a positive number'),
  body('silver').optional().isFloat({ min: 0 }).withMessage('Silver value must be a positive number'),
  body('investments').optional().isFloat({ min: 0 }).withMessage('Investments must be a positive number'),
  body('businessAssets').optional().isFloat({ min: 0 }).withMessage('Business assets must be a positive number'),
  body('receivables').optional().isFloat({ min: 0 }).withMessage('Receivables must be a positive number'),
  body('cryptocurrency').optional().isFloat({ min: 0 }).withMessage('Cryptocurrency must be a positive number'),
  body('other').optional().isFloat({ min: 0 }).withMessage('Other assets must be a positive number'),
  body('personalDebts').optional().isFloat({ min: 0 }).withMessage('Personal debts must be a positive number'),
  body('businessDebts').optional().isFloat({ min: 0 }).withMessage('Business debts must be a positive number'),
  body('immediateExpenses').optional().isFloat({ min: 0 }).withMessage('Immediate expenses must be a positive number'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const calculation = calculateZakat(req.body);

    res.json({
      status: 'success',
      message: calculation.isEligible 
        ? `Zakat calculation completed. You owe $${calculation.zakatDue.toFixed(2)} in Zakat.`
        : `Your wealth is below Nisab threshold. No Zakat is due.`,
      data: {
        calculation,
        nisabInfo: {
          goldNisab: {
            grams: NISAB_GOLD,
            value: calculateNisab('gold'),
            pricePerGram: CURRENT_PRICES.gold,
          },
          silverNisab: {
            grams: NISAB_SILVER,
            value: calculateNisab('silver'),
            pricePerGram: CURRENT_PRICES.silver,
          },
        },
        zakatRate: ZAKAT_RATES.ZAKAT_RATE,
        lastUpdated: CURRENT_PRICES.lastUpdated,
      },
    });

  } catch (error) {
    console.error('Zakat calculation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to calculate Zakat',
    });
  }
});

/**
 * @route   GET /api/zakat/nisab
 * @desc    Get current Nisab values
 * @access  Public
 */
router.get('/nisab', async (req, res) => {
  try {
    const goldNisab = calculateNisab('gold');
    const silverNisab = calculateNisab('silver');

    res.json({
      status: 'success',
      data: {
        nisab: {
          gold: {
            grams: NISAB_GOLD,
            value: goldNisab,
            pricePerGram: CURRENT_PRICES.gold,
          },
          silver: {
            grams: NISAB_SILVER,
            value: silverNisab,
            pricePerGram: CURRENT_PRICES.silver,
          },
          recommended: 'gold', // Islamic scholars recommend gold nisab
        },
        zakatRate: ZAKAT_RATES.ZAKAT_RATE,
        lunarYearDays: ZAKAT_RATES.LUNAR_YEAR_DAYS,
        lastUpdated: CURRENT_PRICES.lastUpdated,
      },
    });

  } catch (error) {
    console.error('Get nisab error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get Nisab values',
    });
  }
});

/**
 * @route   GET /api/zakat/calculator-guide
 * @desc    Get Zakat calculation guide and categories
 * @access  Public
 */
router.get('/calculator-guide', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        guide: {
          title: 'Complete Zakat Calculation Guide',
          description: 'Calculate your Zakat obligation with precision and Islamic accuracy',
          steps: [
            'Determine your lunar calendar year',
            'Calculate total zakatable wealth',
            'Subtract permissible deductions',
            'Check if wealth exceeds Nisab',
            'Apply 2.5% Zakat rate if eligible',
          ],
        },
        categories: {
          assets: [
            {
              name: 'Cash & Bank Accounts',
              description: 'All cash, savings, checking accounts',
              zakatable: true,
              rate: 0.025,
            },
            {
              name: 'Gold & Silver',
              description: 'Jewelry, coins, bars (market value)',
              zakatable: true,
              rate: 0.025,
              note: 'Some scholars exempt jewelry worn regularly',
            },
            {
              name: 'Investments',
              description: 'Stocks, bonds, mutual funds (current value)',
              zakatable: true,
              rate: 0.025,
            },
            {
              name: 'Business Assets',
              description: 'Inventory, equipment used for trade',
              zakatable: true,
              rate: 0.025,
            },
            {
              name: 'Cryptocurrency',
              description: 'Bitcoin, Ethereum, other digital currencies',
              zakatable: true,
              rate: 0.025,
              note: 'Based on current market value',
            },
            {
              name: 'Receivables',
              description: 'Money owed to you (collectible debts)',
              zakatable: true,
              rate: 0.025,
            },
          ],
          deductions: [
            {
              name: 'Personal Debts',
              description: 'Credit cards, personal loans, mortgages',
              deductible: true,
            },
            {
              name: 'Business Debts',
              description: 'Business loans, supplier payments due',
              deductible: true,
            },
            {
              name: 'Immediate Expenses',
              description: 'Rent, utilities, food for current month',
              deductible: true,
            },
          ],
          exemptions: [
            'Primary residence',
            'Personal vehicle for transportation',
            'Household items and clothing',
            'Tools and equipment for profession',
            'Debts owed to others',
          ],
        },
        nisabCalculation: {
          explanation: 'Nisab is the minimum threshold of wealth',
          goldStandard: {
            amount: `${NISAB_GOLD} grams of gold`,
            currentValue: calculateNisab('gold'),
          },
          silverStandard: {
            amount: `${NISAB_SILVER} grams of silver`,
            currentValue: calculateNisab('silver'),
          },
          recommendation: 'Most scholars recommend using gold standard as it benefits the poor',
        },
        islamicRulings: [
          'Wealth must be held for one lunar year (354 days)',
          'Zakat is 2.5% (1/40th) of eligible wealth',
          'Must have clear ownership of assets',
          'Should be calculated annually',
          'Can be paid in portions throughout the year',
        ],
      },
    });

  } catch (error) {
    console.error('Get calculator guide error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get calculator guide',
    });
  }
});

/**
 * @route   POST /api/zakat/save-calculation
 * @desc    Save user's Zakat calculation
 * @access  Private
 */
router.post('/save-calculation', [
  authMiddleware,
  body('calculation').isObject().withMessage('Calculation object is required'),
  body('year').isInt({ min: 1400, max: 2100 }).withMessage('Valid Islamic year required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { calculation, year, notes } = req.body;
    const userId = req.user?.userId;

    // In production, save to user's zakat history in database
    const savedCalculation = {
      id: Date.now().toString(),
      userId,
      year,
      calculation,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    res.json({
      status: 'success',
      message: 'Zakat calculation saved successfully',
      data: {
        calculation: savedCalculation,
      },
    });

  } catch (error) {
    console.error('Save calculation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to save calculation',
    });
  }
});

/**
 * @route   GET /api/zakat/history
 * @desc    Get user's Zakat calculation history
 * @access  Private
 */
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Mock history data (in production, fetch from database)
    const mockHistory = [
      {
        id: '1',
        year: 1445,
        calculation: {
          totalWealth: 10000,
          zakatDue: 250,
          isEligible: true,
        },
        notes: 'First Zakat calculation',
        createdAt: '2024-01-15T00:00:00.000Z',
      },
    ];

    res.json({
      status: 'success',
      data: {
        history: mockHistory,
        totalCalculations: mockHistory.length,
      },
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get calculation history',
    });
  }
});

/**
 * @route   GET /api/zakat/crypto-rates
 * @desc    Get current cryptocurrency rates for Zakat calculation
 * @access  Public
 */
router.get('/crypto-rates', async (req, res) => {
  try {
    // Mock crypto rates (in production, fetch from CoinGecko or similar API)
    const cryptoRates = {
      bitcoin: { symbol: 'BTC', price: 45000, change24h: 2.5 },
      ethereum: { symbol: 'ETH', price: 3200, change24h: -1.2 },
      bnb: { symbol: 'BNB', price: 320, change24h: 0.8 },
      cardano: { symbol: 'ADA', price: 0.45, change24h: 1.5 },
      solana: { symbol: 'SOL', price: 85, change24h: 3.2 },
    };

    res.json({
      status: 'success',
      data: {
        rates: cryptoRates,
        lastUpdated: new Date().toISOString(),
        note: 'Cryptocurrency is zakatable based on current market value',
      },
    });

  } catch (error) {
    console.error('Get crypto rates error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get cryptocurrency rates',
    });
  }
});

export default router;
