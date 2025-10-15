'use client'

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export default function SafeImage({ src, alt, fill, className, width, height, sizes, priority }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if it's a localhost URL in development
  const isLocalhost = process.env.NODE_ENV === 'development' && 
    (src.includes('127.0.0.1') || src.includes('localhost'));

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Use regular img tag for localhost in development to avoid Next.js image optimization issues
  if (isLocalhost) {
    return (
      <div className={`relative ${className || ''}`} style={fill ? { width: '100%', height: '100%' } : undefined}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin"></div>
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={className}
            style={{
              ...(fill ? { 
                position: 'absolute',
                inset: 0,
                width: '100%', 
                height: '100%',
                objectFit: 'cover'
              } : {
                width: width ? `${width}px` : 'auto',
                height: height ? `${height}px` : 'auto'
              })
            }}
          />
        )}
      </div>
    );
  }

  // Use Next.js Image for production and non-localhost URLs
  return (
    <>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center ${className || ''}`}>
          <div className="w-8 h-8 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin"></div>
        </div>
      )}
      {hasError ? (
        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center ${className || ''}`}>
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={className}
          sizes={sizes}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized={isLocalhost}
        />
      )}
    </>
  );
}
