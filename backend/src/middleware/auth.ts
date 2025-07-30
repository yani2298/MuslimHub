import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        username: string;
      };
    }
  }
}

interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

/**
 * Authentication middleware to verify JWT tokens
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_default_secret'
    ) as JWTPayload;

    // Find user and attach to request
    const user = await User.findById(decoded.userId).select('_id email username');
    
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token. User not found.',
      });
      return;
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token.',
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 'error',
        message: 'Token expired. Please login again.',
      });
      return;
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Authentication failed.',
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_default_secret'
      ) as JWTPayload;

      const user = await User.findById(decoded.userId).select('_id email username');
      
      if (user) {
        req.user = {
          userId: user._id.toString(),
          email: user.email,
          username: user.username,
        };
      }
    } catch (jwtError) {
      // Ignore JWT errors in optional middleware
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

/**
 * Admin role middleware
 */
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required.',
      });
      return;
    }

    const user = await User.findById(req.user.userId);
    
    if (!user || !user.community.badges.includes('admin')) {
      res.status(403).json({
        status: 'error',
        message: 'Admin access required.',
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Authorization failed.',
    });
  }
};
