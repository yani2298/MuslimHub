import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth';

const router = express.Router();

// Mock data for community features
const MOCK_FORUMS = [
  {
    id: '1',
    title: 'General Islamic Discussion',
    description: 'Discuss various aspects of Islam, faith, and spirituality',
    category: 'General',
    members: 15420,
    posts: 8934,
    lastActivity: new Date().toISOString(),
    moderators: ['admin', 'scholar_ahmed'],
    tags: ['islam', 'discussion', 'faith'],
  },
  {
    id: '2',
    title: 'Quran Study Circle',
    description: 'Weekly Quran study and tafseer discussions',
    category: 'Education',
    members: 3256,
    posts: 1876,
    lastActivity: new Date().toISOString(),
    moderators: ['hafiz_ali', 'sister_fatima'],
    tags: ['quran', 'tafseer', 'study'],
  },
];

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Community Iftar Gathering',
    description: 'Join us for a blessed iftar meal during Ramadan',
    type: 'iftar',
    date: '2024-04-15T18:30:00.000Z',
    location: {
      name: 'Masjid Al-Noor',
      address: '123 Islamic Center St, City, State',
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    organizer: {
      id: 'org1',
      name: 'Islamic Center Committee',
      verified: true,
    },
    attendees: 156,
    maxCapacity: 200,
    isOnline: false,
    tags: ['ramadan', 'iftar', 'community'],
  },
];

/**
 * @route   GET /api/community/forums
 * @desc    Get list of community forums
 * @access  Public
 */
router.get('/forums', [
  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const { category, limit = 20 } = req.query;

    let forums = MOCK_FORUMS;

    // Filter by category if provided
    if (category) {
      forums = forums.filter(forum => 
        forum.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    // Apply limit
    forums = forums.slice(0, parseInt(limit as string));

    res.json({
      status: 'success',
      data: {
        forums,
        totalForums: MOCK_FORUMS.length,
        categories: [...new Set(MOCK_FORUMS.map(f => f.category))],
      },
    });

  } catch (error) {
    console.error('Get forums error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get forums',
    });
  }
});

/**
 * @route   GET /api/community/events
 * @desc    Get upcoming community events
 * @access  Public
 */
router.get('/events', [
  query('type')
    .optional()
    .isIn(['prayer', 'iftar', 'lecture', 'study', 'charity', 'social'])
    .withMessage('Invalid event type'),
  query('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  query('online')
    .optional()
    .isBoolean()
    .withMessage('Online must be boolean'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const { type, location, online } = req.query;

    let events = MOCK_EVENTS;

    // Filter by type
    if (type) {
      events = events.filter(event => event.type === type);
    }

    // Filter by online/offline
    if (online !== undefined) {
      events = events.filter(event => event.isOnline === (online === 'true'));
    }

    // Sort by date
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json({
      status: 'success',
      data: {
        events,
        totalEvents: events.length,
        eventTypes: ['prayer', 'iftar', 'lecture', 'study', 'charity', 'social'],
      },
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get events',
    });
  }
});

/**
 * @route   POST /api/community/posts
 * @desc    Create a new community post
 * @access  Private
 */
router.post('/posts', [
  authMiddleware,
  body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be 5-200 characters'),
  body('content')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Content must be 10-5000 characters'),
  body('forumId')
    .isString()
    .withMessage('Forum ID is required'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
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

    const { title, content, forumId, tags = [] } = req.body;
    const userId = req.user?.userId;

    // Check if forum exists
    const forum = MOCK_FORUMS.find(f => f.id === forumId);
    if (!forum) {
      return res.status(404).json({
        status: 'error',
        message: 'Forum not found',
      });
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      forumId,
      author: {
        id: userId,
        username: req.user?.username,
      },
      tags,
      likes: 0,
      replies: 0,
      views: 0,
      isPinned: false,
      isLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      data: {
        post: newPost,
      },
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

/**
 * @route   GET /api/community/posts
 * @desc    Get community posts
 * @access  Public
 */
router.get('/posts', [
  query('forumId')
    .optional()
    .isString()
    .withMessage('Forum ID must be a string'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('sortBy')
    .optional()
    .isIn(['newest', 'oldest', 'popular', 'trending'])
    .withMessage('Invalid sort option'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const { forumId, limit = 20, sortBy = 'newest' } = req.query;

    // Mock posts data
    const mockPosts = [
      {
        id: '1',
        title: 'Benefits of Daily Dhikr',
        content: 'Sharing the spiritual benefits I\'ve experienced through consistent daily dhikr...',
        forumId: '1',
        author: { id: 'user1', username: 'faithful_servant' },
        tags: ['dhikr', 'spirituality', 'daily-practice'],
        likes: 45,
        replies: 12,
        views: 234,
        isPinned: false,
        isLocked: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    let posts = mockPosts;

    // Filter by forum if provided
    if (forumId) {
      posts = posts.filter(post => post.forumId === forumId);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        posts.sort((a, b) => (b.likes + b.replies) - (a.likes + a.replies));
        break;
      case 'oldest':
        posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default: // newest
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    posts = posts.slice(0, parseInt(limit as string));

    res.json({
      status: 'success',
      data: {
        posts,
        totalPosts: mockPosts.length,
        sortOptions: ['newest', 'oldest', 'popular', 'trending'],
      },
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get posts',
    });
  }
});

/**
 * @route   POST /api/community/events
 * @desc    Create a new community event
 * @access  Private
 */
router.post('/events', [
  authMiddleware,
  body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be 5-200 characters'),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be 10-1000 characters'),
  body('type')
    .isIn(['prayer', 'iftar', 'lecture', 'study', 'charity', 'social'])
    .withMessage('Invalid event type'),
  body('date')
    .isISO8601()
    .withMessage('Valid date required'),
  body('location')
    .isObject()
    .withMessage('Location object required'),
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

    const { title, description, type, date, location, maxCapacity, isOnline = false } = req.body;
    const userId = req.user?.userId;

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      type,
      date,
      location,
      organizer: {
        id: userId,
        name: req.user?.username,
        verified: false,
      },
      attendees: 0,
      maxCapacity: maxCapacity || null,
      isOnline,
      tags: [type],
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully',
      data: {
        event: newEvent,
      },
    });

  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create event',
    });
  }
});

/**
 * @route   POST /api/community/events/:eventId/join
 * @desc    Join an event
 * @access  Private
 */
router.post('/events/:eventId/join', authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.userId;

    // Find event (mock)
    const event = MOCK_EVENTS.find(e => e.id === eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }

    // Check capacity
    if (event.maxCapacity && event.attendees >= event.maxCapacity) {
      return res.status(400).json({
        status: 'error',
        message: 'Event is at full capacity',
      });
    }

    res.json({
      status: 'success',
      message: 'Successfully joined the event',
      data: {
        eventId,
        userId,
        joinedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Join event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to join event',
    });
  }
});

/**
 * @route   GET /api/community/nearby
 * @desc    Get nearby mosques and Islamic centers
 * @access  Public
 */
router.get('/nearby', [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude required'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude required'),
  query('radius')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Radius must be between 1 and 50 km'),
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

    const { latitude, longitude, radius = 10 } = req.query;

    // Mock nearby places
    const nearbyPlaces = [
      {
        id: '1',
        name: 'Masjid Al-Noor',
        type: 'mosque',
        address: '123 Islamic Center St, City, State',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        distance: 2.5, // km
        prayerTimes: {
          fajr: '05:30',
          dhuhr: '12:15',
          asr: '15:45',
          maghrib: '18:30',
          isha: '20:00',
        },
        services: ['daily_prayers', 'friday_khutbah', 'quran_classes', 'community_events'],
        contact: {
          phone: '+1-555-0123',
          email: 'info@masjidalnoor.org',
          website: 'https://masjidalnoor.org',
        },
        rating: 4.8,
        reviews: 156,
      },
    ];

    res.json({
      status: 'success',
      data: {
        places: nearbyPlaces,
        searchRadius: parseInt(radius as string),
        location: {
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
        },
      },
    });

  } catch (error) {
    console.error('Get nearby places error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get nearby places',
    });
  }
});

export default router;
