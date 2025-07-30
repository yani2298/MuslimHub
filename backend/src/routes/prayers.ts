import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth';

const router = express.Router();

// Prayer calculation methods
const CALCULATION_METHODS = {
  MWL: 'Muslim World League',
  ISNA: 'Islamic Society of North America',
  Egypt: 'Egyptian General Authority of Survey',
  Makkah: 'Umm Al-Qura University, Makkah',
  Karachi: 'University of Islamic Sciences, Karachi',
  Tehran: 'Institute of Geophysics, University of Tehran',
  Jafari: 'Shia Ithna-Ashari, Leva Institute, Qum',
};

// Helper function to calculate prayer times
const calculatePrayerTimes = (
  latitude: number,
  longitude: number,
  date: Date,
  method: string = 'MWL'
) => {
  // This is a simplified calculation. In production, you'd use a proper library
  // like adhan-js or call an external API like AlAdhan
  
  const baseHours = {
    fajr: 5.5,
    sunrise: 6.5,
    dhuhr: 12.0,
    asr: 15.5,
    maghrib: 18.5,
    isha: 20.0,
  };

  // Adjust for latitude (simplified)
  const latitudeAdjustment = Math.sin(latitude * Math.PI / 180) * 0.5;
  
  const prayerTimes = Object.entries(baseHours).reduce((acc, [prayer, hour]) => {
    const adjustedHour = hour + latitudeAdjustment;
    const prayerDate = new Date(date);
    prayerDate.setHours(Math.floor(adjustedHour));
    prayerDate.setMinutes((adjustedHour % 1) * 60);
    prayerDate.setSeconds(0);
    
    acc[prayer] = prayerDate.toISOString();
    return acc;
  }, {} as Record<string, string>);

  return prayerTimes;
};

// Helper function to calculate Qibla direction
const calculateQibla = (latitude: number, longitude: number) => {
  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  
  const dLng = (kaabaLng - longitude) * Math.PI / 180;
  const lat1 = latitude * Math.PI / 180;
  const lat2 = kaabaLat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  bearing = (bearing + 360) % 360; // Normalize to 0-360
  
  return bearing;
};

/**
 * @route   GET /api/prayers/times
 * @desc    Get prayer times for a location and date
 * @access  Public
 */
router.get('/times', [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude required (-90 to 90)'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude required (-180 to 180)'),
  query('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in ISO format'),
  query('method')
    .optional()
    .isIn(Object.keys(CALCULATION_METHODS))
    .withMessage('Invalid calculation method'),
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

    const {
      latitude,
      longitude,
      date = new Date().toISOString(),
      method = 'MWL'
    } = req.query as {
      latitude: string;
      longitude: string;
      date?: string;
      method?: string;
    };

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const prayerDate = new Date(date);

    // Calculate prayer times
    const prayerTimes = calculatePrayerTimes(lat, lng, prayerDate, method);

    // Get current time for next prayer calculation
    const now = new Date();
    const currentTime = now.getTime();
    
    // Find next prayer
    let nextPrayer: { name: string; time: string } | null = null;
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    
    for (const prayer of prayers) {
      const prayerTime = new Date(prayerTimes[prayer]).getTime();
      if (prayerTime > currentTime) {
        nextPrayer = {
          name: prayer,
          time: prayerTimes[prayer],
        };
        break;
      }
    }
    
    // If no prayer today, get Fajr tomorrow
    if (!nextPrayer) {
      const tomorrow = new Date(prayerDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowPrayers = calculatePrayerTimes(lat, lng, tomorrow, method);
      nextPrayer = {
        name: 'fajr',
        time: tomorrowPrayers.fajr,
      };
    }

    res.json({
      status: 'success',
      data: {
        date: prayerDate.toISOString().split('T')[0],
        location: {
          latitude: lat,
          longitude: lng,
        },
        method: {
          id: method,
          name: CALCULATION_METHODS[method as keyof typeof CALCULATION_METHODS],
        },
        prayerTimes,
        nextPrayer,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    });

  } catch (error) {
    console.error('Prayer times error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to calculate prayer times',
    });
  }
});

/**
 * @route   GET /api/prayers/qibla
 * @desc    Get Qibla direction for a location
 * @access  Public
 */
router.get('/qibla', [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude required (-90 to 90)'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude required (-180 to 180)'),
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

    const { latitude, longitude } = req.query as {
      latitude: string;
      longitude: string;
    };

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const qiblaDirection = calculateQibla(lat, lng);

    res.json({
      status: 'success',
      data: {
        location: {
          latitude: lat,
          longitude: lng,
        },
        qibla: {
          direction: qiblaDirection,
          bearing: Math.round(qiblaDirection),
          compass: getCompassDirection(qiblaDirection),
        },
        kaaba: {
          latitude: 21.4225,
          longitude: 39.8262,
        },
      },
    });

  } catch (error) {
    console.error('Qibla calculation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to calculate Qibla direction',
    });
  }
});

/**
 * @route   POST /api/prayers/track
 * @desc    Track prayer completion
 * @access  Private
 */
router.post('/track', [
  authMiddleware,
  body('prayer')
    .isIn(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'])
    .withMessage('Invalid prayer name'),
  body('completed')
    .isBoolean()
    .withMessage('Completed status must be boolean'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in ISO format'),
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

    const { prayer, completed, date = new Date().toISOString() } = req.body;
    const userId = req.user?.userId;

    // This would update the user's prayer history in the database
    // For now, we'll return a success response
    res.json({
      status: 'success',
      message: `Prayer ${prayer} marked as ${completed ? 'completed' : 'missed'}`,
      data: {
        prayer,
        completed,
        date: new Date(date).toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Prayer tracking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to track prayer',
    });
  }
});

/**
 * @route   GET /api/prayers/history
 * @desc    Get user's prayer history
 * @access  Private
 */
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    // This would fetch from the user's prayer history
    // For now, return mock data
    const mockHistory = Array.from({ length: parseInt(days as string) }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      return {
        date: date.toISOString().split('T')[0],
        prayers: {
          fajr: Math.random() > 0.2,
          dhuhr: Math.random() > 0.1,
          asr: Math.random() > 0.1,
          maghrib: Math.random() > 0.05,
          isha: Math.random() > 0.15,
        },
      };
    });

    res.json({
      status: 'success',
      data: {
        history: mockHistory,
        stats: {
          totalPrayers: mockHistory.length * 5,
          completedPrayers: mockHistory.reduce((acc, day) => {
            return acc + Object.values(day.prayers).filter(Boolean).length;
          }, 0),
        },
      },
    });

  } catch (error) {
    console.error('Prayer history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get prayer history',
    });
  }
});

// Helper function to get compass direction
function getCompassDirection(bearing: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
}

export default router;
