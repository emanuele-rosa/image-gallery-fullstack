/* eslint-disable react/prop-types */
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 'default', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Loader2 className={`animate-spin text-white ${sizeClasses[size]}`} />
      </div>
    );
  }

  return <Loader2 className={`animate-spin text-gray-600 ${sizeClasses[size]}`} />;
};

export const LoadingButton = ({ children, isLoading, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`${props.className} relative`}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="small" />
        </span>
      )}
      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </button>
  );
};