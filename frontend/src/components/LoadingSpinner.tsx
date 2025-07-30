import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'emerald' | 'blue' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'emerald',
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    emerald: 'border-emerald-600',
    blue: 'border-blue-600',
    gray: 'border-gray-600'
  };

  const textColorClasses = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    gray: 'text-gray-600'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin ${colorClasses[color]} border-t-transparent`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs">🕌</span>
        </div>
      </div>
      
      {text && (
        <p className={`text-sm font-medium ${textColorClasses[color]}`}>
          {text}
        </p>
      )}
      
      <div className="text-center max-w-xs">
        <p className="text-xs text-gray-500 font-arabic">"وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ"</p>
        <p className="text-xs text-gray-400 italic mt-1">"And be patient, and your patience is not but through Allah"</p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
