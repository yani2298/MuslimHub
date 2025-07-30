import express from 'express';
import { query, validationResult } from 'express-validator';
import { optionalAuthMiddleware } from '../middleware/auth';

const router = express.Router();

// Mock Quran data structure (in production, this would come from a database)
const QURAN_CHAPTERS = [
  { number: 1, name: 'Al-Fatiha', englishName: 'The Opening', verses: 7, revelationType: 'Meccan' },
  { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', verses: 286, revelationType: 'Medinan' },
  { number: 3, name: 'Ali Imran', englishName: 'Family of Imran', verses: 200, revelationType: 'Medinan' },
  // ... would contain all 114 chapters
];

const AVAILABLE_TRANSLATIONS = [
  { id: 'en.sahih', name: 'Saheeh International', language: 'English' },
  { id: 'en.pickthall', name: 'Pickthall', language: 'English' },
  { id: 'en.yusufali', name: 'Yusuf Ali', language: 'English' },
  { id: 'fr.hamidullah', name: 'Hamidullah', language: 'French' },
  { id: 'ar.quran', name: 'Arabic Original', language: 'Arabic' },
  { id: 'es.cortes', name: 'Julio Cortes', language: 'Spanish' },
];

const AVAILABLE_RECITERS = [
  { id: 'mishary', name: 'Mishary Rashid Alafasy', language: 'Arabic' },
  { id: 'sudais', name: 'Abdul Rahman Al-Sudais', language: 'Arabic' },
  { id: 'shuraim', name: 'Saud Al-Shuraim', language: 'Arabic' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', language: 'Arabic' },
];

/**
 * @route   GET /api/quran/chapters
 * @desc    Get list of all Quran chapters
 * @access  Public
 */
router.get('/chapters', optionalAuthMiddleware, async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        chapters: QURAN_CHAPTERS,
        totalChapters: QURAN_CHAPTERS.length,
        totalVerses: QURAN_CHAPTERS.reduce((sum, chapter) => sum + chapter.verses, 0),
      },
    });
  } catch (error) {
    console.error('Get chapters error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get chapters',
    });
  }
});

/**
 * @route   GET /api/quran/chapter/:number
 * @desc    Get specific chapter with verses
 * @access  Public
 */
router.get('/chapter/:number', [
  query('translation')
    .optional()
    .isString()
    .withMessage('Translation must be a valid string'),
  query('reciter')
    .optional()
    .isString()
    .withMessage('Reciter must be a valid string'),
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

    const chapterNumber = parseInt(req.params.number);
    const { translation = 'en.sahih', reciter = 'mishary' } = req.query;

    if (chapterNumber < 1 || chapterNumber > 114) {
      return res.status(400).json({
        status: 'error',
        message: 'Chapter number must be between 1 and 114',
      });
    }

    const chapter = QURAN_CHAPTERS.find(c => c.number === chapterNumber);
    if (!chapter) {
      return res.status(404).json({
        status: 'error',
        message: 'Chapter not found',
      });
    }

    // Mock verses data (in production, fetch from database)
    const verses = Array.from({ length: chapter.verses }, (_, i) => ({
      number: i + 1,
      arabic: `آية رقم ${i + 1} من سورة ${chapter.name}`, // Mock Arabic text
      translation: `Verse ${i + 1} of chapter ${chapter.name} in ${translation}`,
      transliteration: `Verse ${i + 1} transliteration`,
      audio: `https://audio.quran.com/${reciter}/${chapterNumber}/${i + 1}.mp3`,
    }));

    res.json({
      status: 'success',
      data: {
        chapter,
        verses,
        translation: AVAILABLE_TRANSLATIONS.find(t => t.id === translation),
        reciter: AVAILABLE_RECITERS.find(r => r.id === reciter),
      },
    });

  } catch (error) {
    console.error('Get chapter error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get chapter',
    });
  }
});

/**
 * @route   GET /api/quran/verse/:chapter/:verse
 * @desc    Get specific verse
 * @access  Public
 */
router.get('/verse/:chapter/:verse', [
  query('translations')
    .optional()
    .isString()
    .withMessage('Translations must be comma-separated string'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const chapterNumber = parseInt(req.params.chapter);
    const verseNumber = parseInt(req.params.verse);
    const { translations = 'en.sahih' } = req.query;

    if (chapterNumber < 1 || chapterNumber > 114) {
      return res.status(400).json({
        status: 'error',
        message: 'Chapter number must be between 1 and 114',
      });
    }

    const chapter = QURAN_CHAPTERS.find(c => c.number === chapterNumber);
    if (!chapter) {
      return res.status(404).json({
        status: 'error',
        message: 'Chapter not found',
      });
    }

    if (verseNumber < 1 || verseNumber > chapter.verses) {
      return res.status(400).json({
        status: 'error',
        message: `Verse number must be between 1 and ${chapter.verses}`,
      });
    }

    const translationIds = (translations as string).split(',').map(t => t.trim());
    const verseTranslations = translationIds.map(id => {
      const translation = AVAILABLE_TRANSLATIONS.find(t => t.id === id);
      return {
        translation: translation || AVAILABLE_TRANSLATIONS[0],
        text: `Verse ${verseNumber} of chapter ${chapter.name} in ${id}`,
      };
    });

    res.json({
      status: 'success',
      data: {
        chapter: {
          number: chapterNumber,
          name: chapter.name,
          englishName: chapter.englishName,
        },
        verse: {
          number: verseNumber,
          arabic: `الآية رقم ${verseNumber} من سورة ${chapter.name}`,
          transliteration: `Verse ${verseNumber} transliteration`,
          translations: verseTranslations,
          audio: `https://audio.quran.com/mishary/${chapterNumber}/${verseNumber}.mp3`,
        },
      },
    });

  } catch (error) {
    console.error('Get verse error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get verse',
    });
  }
});

/**
 * @route   GET /api/quran/search
 * @desc    Search in Quran text
 * @access  Public
 */
router.get('/search', [
  query('q')
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters'),
  query('translation')
    .optional()
    .isString()
    .withMessage('Translation must be a valid string'),
  query('language')
    .optional()
    .isIn(['arabic', 'english', 'transliteration'])
    .withMessage('Language must be arabic, english, or transliteration'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
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
      q: query,
      translation = 'en.sahih',
      language = 'english',
      limit = 20
    } = req.query;

    // Mock search results (in production, use full-text search in database)
    const mockResults = [
      {
        chapter: { number: 1, name: 'Al-Fatiha', englishName: 'The Opening' },
        verse: { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        highlightedText: `In the name of <mark>Allah</mark>, the Entirely Merciful, the Especially Merciful.`,
        relevanceScore: 0.95,
      },
      {
        chapter: { number: 2, name: 'Al-Baqarah', englishName: 'The Cow' },
        verse: { number: 255, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ' },
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
        highlightedText: `<mark>Allah</mark> - there is no deity except Him, the Ever-Living, the Sustainer of existence.`,
        relevanceScore: 0.92,
      },
    ];

    // Filter based on query (mock filtering)
    const filteredResults = mockResults.filter(result =>
      result.translation.toLowerCase().includes((query as string).toLowerCase())
    ).slice(0, parseInt(limit as string));

    res.json({
      status: 'success',
      data: {
        query,
        results: filteredResults,
        totalResults: filteredResults.length,
        searchParams: {
          translation,
          language,
          limit: parseInt(limit as string),
        },
      },
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to search Quran',
    });
  }
});

/**
 * @route   GET /api/quran/translations
 * @desc    Get available translations
 * @access  Public
 */
router.get('/translations', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        translations: AVAILABLE_TRANSLATIONS,
        totalTranslations: AVAILABLE_TRANSLATIONS.length,
      },
    });
  } catch (error) {
    console.error('Get translations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get translations',
    });
  }
});

/**
 * @route   GET /api/quran/reciters
 * @desc    Get available reciters
 * @access  Public
 */
router.get('/reciters', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        reciters: AVAILABLE_RECITERS,
        totalReciters: AVAILABLE_RECITERS.length,
      },
    });
  } catch (error) {
    console.error('Get reciters error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get reciters',
    });
  }
});

/**
 * @route   GET /api/quran/random
 * @desc    Get random verse
 * @access  Public
 */
router.get('/random', [
  query('translation')
    .optional()
    .isString()
    .withMessage('Translation must be a valid string'),
], optionalAuthMiddleware, async (req, res) => {
  try {
    const { translation = 'en.sahih' } = req.query;

    // Get random chapter and verse
    const randomChapter = QURAN_CHAPTERS[Math.floor(Math.random() * QURAN_CHAPTERS.length)];
    const randomVerseNumber = Math.floor(Math.random() * randomChapter.verses) + 1;

    res.json({
      status: 'success',
      data: {
        chapter: randomChapter,
        verse: {
          number: randomVerseNumber,
          arabic: `آية عشوائية رقم ${randomVerseNumber} من سورة ${randomChapter.name}`,
          translation: `Random verse ${randomVerseNumber} from chapter ${randomChapter.name}`,
          transliteration: `Random verse ${randomVerseNumber} transliteration`,
          audio: `https://audio.quran.com/mishary/${randomChapter.number}/${randomVerseNumber}.mp3`,
        },
        translation: AVAILABLE_TRANSLATIONS.find(t => t.id === translation),
      },
    });

  } catch (error) {
    console.error('Get random verse error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get random verse',
    });
  }
});

export default router;
