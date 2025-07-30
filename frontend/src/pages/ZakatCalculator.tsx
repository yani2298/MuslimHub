import React, { useState } from 'react';
import { CurrencyDollarIcon, CalculatorIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ZakatCalculator: React.FC = () => {
  const [assets, setAssets] = useState({
    cash: '',
    gold: '',
    silver: '',
    investments: '',
    business: '',
    cryptocurrency: ''
  });
  
  const [debts, setDebts] = useState({
    personalDebts: '',
    businessDebts: ''
  });

  const [result, setResult] = useState<{
    totalWealth: number;
    zakatDue: number;
    isEligible: boolean;
  } | null>(null);

  const handleInputChange = (category: 'assets' | 'debts', field: string, value: string) => {
    if (category === 'assets') {
      setAssets(prev => ({ ...prev, [field]: value }));
    } else {
      setDebts(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateZakat = () => {
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    const totalDebts = Object.values(debts).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    const netWealth = totalAssets - totalDebts;
    
    // Nisab threshold (approximately $450 in gold value)
    const nisabThreshold = 450;
    const zakatRate = 0.025; // 2.5%
    
    const isEligible = netWealth >= nisabThreshold;
    const zakatDue = isEligible ? netWealth * zakatRate : 0;
    
    setResult({
      totalWealth: netWealth,
      zakatDue,
      isEligible
    });
  };

  const assetFields = [
    { key: 'cash', label: 'Cash & Savings', placeholder: 'Enter cash amount' },
    { key: 'gold', label: 'Gold Value', placeholder: 'Enter gold value' },
    { key: 'silver', label: 'Silver Value', placeholder: 'Enter silver value' },
    { key: 'investments', label: 'Investments', placeholder: 'Stocks, bonds, etc.' },
    { key: 'business', label: 'Business Assets', placeholder: 'Business inventory value' },
    { key: 'cryptocurrency', label: 'Cryptocurrency', placeholder: 'Bitcoin, Ethereum, etc.' }
  ];

  const debtFields = [
    { key: 'personalDebts', label: 'Personal Debts', placeholder: 'Credit cards, loans, etc.' },
    { key: 'businessDebts', label: 'Business Debts', placeholder: 'Business loans, etc.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zakat Calculator</h1>
          <p className="text-gray-600">Calculate your Zakat obligation with precision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2 text-emerald-600" />
                Assets
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assetFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      placeholder={field.placeholder}
                      value={assets[field.key as keyof typeof assets]}
                      onChange={(e) => handleInputChange('assets', field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Deductions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {debtFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      placeholder={field.placeholder}
                      value={debts[field.key as keyof typeof debts]}
                      onChange={(e) => handleInputChange('debts', field.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={calculateZakat}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CalculatorIcon className="h-5 w-5" />
              <span>Calculate Zakat</span>
            </button>
          </div>

          <div className="lg:col-span-1">
            {result && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Calculation Result</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Wealth</p>
                    <p className="text-2xl font-bold text-gray-900">${result.totalWealth.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600">Zakat Status</p>
                    <p className={`text-lg font-semibold ${result.isEligible ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {result.isEligible ? 'Zakat Required' : 'Below Nisab Threshold'}
                    </p>
                  </div>
                  
                  {result.isEligible && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Zakat Due (2.5%)</p>
                      <p className="text-3xl font-bold text-emerald-600">${result.zakatDue.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-2">About Zakat</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Zakat is one of the Five Pillars of Islam. It's a form of alms-giving and religious tax.
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Rate: 2.5% of eligible wealth</li>
                    <li>• Nisab: Minimum threshold (~$450)</li>
                    <li>• Lunar year: 354 days ownership</li>
                    <li>• Recipients: 8 categories in Quran</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs font-arabic text-blue-800 text-center">
                  "وَآتُوا الزَّكَاةَ"
                </p>
                <p className="text-xs text-blue-700 text-center italic mt-1">
                  "And give Zakat" - Quran
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
