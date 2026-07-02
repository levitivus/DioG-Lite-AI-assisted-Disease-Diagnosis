import React from 'react';
import { AlertCircle, FileQuestion, RefreshCw } from 'lucide-react';
import Button from './Button';

// 1. LoadingSpinner Component
export const LoadingSpinner = ({
  message = 'Loading details...',
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-4 text-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-primary border-r-transparent border-b-gray-200 border-l-transparent ${sizeClasses[size]}`} />
      {message && <p className="text-sm font-semibold text-gray-500 animate-pulse">{message}</p>}
    </div>
  );
};

// 2. EmptyState Component
export const EmptyState = ({
  icon: Icon = FileQuestion,
  title = 'No records found',
  description = 'There are no items matching your criteria at the moment.',
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center max-w-md mx-auto border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 ${className}`}>
      <div className="p-3.5 rounded-2xl bg-gray-100 text-gray-400 mb-5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
      {actionText && onActionClick && (
        <Button variant="primary" size="sm" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

// 3. ErrorState Component
export const ErrorState = ({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again.',
  retryText = 'Retry Now',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto border border-red-100 rounded-2xl bg-red-50/20 ${className}`}>
      <div className="p-3 rounded-2xl bg-red-50 text-red-500 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-red-600/80 mb-5 font-medium">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 focus:ring-red-500" icon={RefreshCw} onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  );
};

// 4. SkeletonLoader Component
export const SkeletonLoader = ({
  type = 'card', // 'card' | 'text' | 'doctor' | 'row'
  count = 1,
  className = '',
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'doctor':
        return (
          <div className="border border-gray-100 rounded-2xl p-0 overflow-hidden flex flex-col h-full bg-white animate-pulse">
            <div className="aspect-[4/3] w-full bg-gray-200" />
            <div className="p-5 flex flex-col flex-grow gap-3.5">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2 mt-2">
                <div className="h-3.5 bg-gray-200 rounded w-5/6" />
                <div className="h-3.5 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="h-9 bg-gray-200 rounded-xl w-full mt-4" />
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2.5 animate-pulse py-2">
            <div className="h-4.5 bg-gray-200 rounded w-1/3" />
            <div className="h-3.5 bg-gray-200 rounded w-full" />
            <div className="h-3.5 bg-gray-200 rounded w-5/6" />
            <div className="h-3.5 bg-gray-200 rounded w-2/3" />
          </div>
        );
      case 'row':
        return (
          <div className="flex items-center gap-4 py-3 border-b border-gray-100 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-xl shrink-0" />
            <div className="flex-grow space-y-1.5">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
        );
      case 'card':
      default:
        return (
          <div className="border border-gray-100 rounded-2xl p-6 bg-white animate-pulse flex flex-col gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-xl" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />
            <div className="space-y-2">
              <div className="h-3.5 bg-gray-200 rounded w-full" />
              <div className="h-3.5 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`grid gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </div>
  );
};
