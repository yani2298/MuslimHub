import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female';
  location?: {
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  preferences: {
    language: string;
    prayerCalculationMethod: string;
    madhab: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
    notifications: {
      prayers: boolean;
      events: boolean;
      community: boolean;
    };
  };
  profile: {
    avatar?: string;
    bio?: string;
    interests: string[];
    socialLinks?: {
      website?: string;
      twitter?: string;
      instagram?: string;
    };
  };
  religious: {
    zakatCalculations: Array<{
      year: number;
      totalWealth: number;
      zakatDue: number;
      calculatedAt: Date;
    }>;
    prayerHistory: Array<{
      date: Date;
      prayers: {
        fajr: boolean;
        dhuhr: boolean;
        asr: boolean;
        maghrib: boolean;
        isha: boolean;
      };
    }>;
    quranProgress: {
      lastRead: {
        surah: number;
        ayah: number;
        timestamp: Date;
      };
      completedSurahs: number[];
      totalRecitations: number;
    };
  };
  community: {
    joinedGroups: mongoose.Types.ObjectId[];
    followedForums: mongoose.Types.ObjectId[];
    reputation: number;
    badges: string[];
  };
  security: {
    emailVerified: boolean;
    phoneVerified: boolean;
    twoFactorEnabled: boolean;
    lastLogin: Date;
    loginAttempts: number;
    lockUntil?: Date;
  };
  subscription: {
    plan: 'free' | 'premium' | 'lifetime';
    expiresAt?: Date;
    features: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  isAccountLocked(): boolean;
  incrementLoginAttempts(): Promise<void>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false, // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value: Date) {
        return value < new Date();
      },
      message: 'Date of birth must be in the past',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  location: {
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    coordinates: {
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 },
    },
  },
  preferences: {
    language: { type: String, default: 'en' },
    prayerCalculationMethod: { type: String, default: 'MWL' },
    madhab: { 
      type: String, 
      enum: ['hanafi', 'shafi', 'maliki', 'hanbali'],
      default: 'hanafi'
    },
    notifications: {
      prayers: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      community: { type: Boolean, default: true },
    },
  },
  profile: {
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    interests: [{ type: String, maxlength: 50 }],
    socialLinks: {
      website: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
  },
  religious: {
    zakatCalculations: [{
      year: { type: Number, required: true },
      totalWealth: { type: Number, required: true },
      zakatDue: { type: Number, required: true },
      calculatedAt: { type: Date, default: Date.now },
    }],
    prayerHistory: [{
      date: { type: Date, required: true },
      prayers: {
        fajr: { type: Boolean, default: false },
        dhuhr: { type: Boolean, default: false },
        asr: { type: Boolean, default: false },
        maghrib: { type: Boolean, default: false },
        isha: { type: Boolean, default: false },
      },
    }],
    quranProgress: {
      lastRead: {
        surah: { type: Number, min: 1, max: 114 },
        ayah: { type: Number, min: 1 },
        timestamp: { type: Date, default: Date.now },
      },
      completedSurahs: [{ type: Number, min: 1, max: 114 }],
      totalRecitations: { type: Number, default: 0 },
    },
  },
  community: {
    joinedGroups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    followedForums: [{ type: Schema.Types.ObjectId, ref: 'Forum' }],
    reputation: { type: Number, default: 0 },
    badges: [{ type: String }],
  },
  security: {
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
  },
  subscription: {
    plan: { 
      type: String, 
      enum: ['free', 'premium', 'lifetime'],
      default: 'free'
    },
    expiresAt: { type: Date },
    features: [{ type: String }],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ 'location.coordinates': '2dsphere' });
UserSchema.index({ createdAt: -1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if account is locked
UserSchema.methods.isAccountLocked = function(): boolean {
  return !!(this.security.lockUntil && this.security.lockUntil > Date.now());
};

// Method to increment login attempts
UserSchema.methods.incrementLoginAttempts = async function(): Promise<void> {
  // If we have a previous lock that has expired, restart at 1
  if (this.security.lockUntil && this.security.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { 'security.lockUntil': 1 },
      $set: { 'security.loginAttempts': 1 },
    });
  }
  
  const updates: any = { $inc: { 'security.loginAttempts': 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.security.loginAttempts + 1 >= 5 && !this.security.lockUntil) {
    updates.$set = { 'security.lockUntil': Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Remove sensitive data from JSON output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.security.loginAttempts;
  delete userObject.security.lockUntil;
  return userObject;
};

export default mongoose.model<IUser>('User', UserSchema);
