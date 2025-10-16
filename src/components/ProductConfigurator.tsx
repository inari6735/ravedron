'use client';

import { useState } from 'react';
import { ConfiguratorGroup, ConfiguratorOption } from '@/types';
import SafeImage from './SafeImage';

interface ProductConfiguratorProps {
  configuratorGroups: ConfiguratorGroup[];
  onSelectionChange: (selections: Record<string, string>) => void;
  initialSelections?: Record<string, string>;
}

export default function ProductConfigurator({ 
  configuratorGroups, 
  onSelectionChange,
  initialSelections = {}
}: ProductConfiguratorProps) {
  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);

  if (!configuratorGroups || configuratorGroups.length === 0) {
    return null;
  }

  const handleOptionSelect = (groupId: string, optionId: string) => {
    const newSelections = {
      ...selections,
      [groupId]: optionId
    };
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const renderTextOptions = (group: ConfiguratorGroup) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {group.options.map((option) => {
        const isSelected = selections[group.id] === option.id;
        const isDisabled = !option.available;
        
        return (
          <button
            key={option.id}
            onClick={() => !isDisabled && handleOptionSelect(group.id, option.id)}
            disabled={isDisabled}
            className={`py-2 px-3 border text-sm font-medium transition-colors text-center relative ${
              isDisabled
                ? 'border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                : isSelected
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
            }`}
          >
            {option.name}
            {!option.available && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gray-600 rounded-full text-xs flex items-center justify-center text-gray-300">
                ×
              </span>
            )}
            {option.available && option.stock !== undefined && option.stock <= 5 && (
              <span className="block text-xs text-yellow-400 mt-1">Low stock: {option.stock}</span>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderColorOptions = (group: ConfiguratorGroup) => (
    <div className="flex flex-wrap gap-3">
      {group.options.map((option) => {
        const isSelected = selections[group.id] === option.id;
        const isDisabled = !option.available;
        const hasColorCode = option.colorHexCode && option.colorHexCode !== '';
        
        return (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => !isDisabled && handleOptionSelect(group.id, option.id)}
              disabled={isDisabled}
              className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                isDisabled
                  ? 'border-gray-800 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'border-red-500 scale-110'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              style={{
                backgroundColor: hasColorCode ? option.colorHexCode : '#374151',
                opacity: isDisabled ? 0.4 : 1
              }}
              title={`${option.name}${!option.available ? ' - Out of stock' : option.stock ? ` - ${option.stock} in stock` : ''}`}
            >
              {isSelected && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {!option.available && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-xs">×</span>
                </div>
              )}
            </button>
            <span className={`text-xs transition-colors ${
              isDisabled ? 'text-gray-600' : isSelected ? 'text-white' : 'text-gray-400'
            }`}>
              {option.name}
              {option.available && option.stock !== undefined && option.stock <= 5 && (
                <span className="block text-yellow-400 text-[10px]">Low: {option.stock}</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );

  const renderImageOptions = (group: ConfiguratorGroup) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {group.options.map((option) => {
        const isSelected = selections[group.id] === option.id;
        const isDisabled = !option.available;
        
        return (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => !isDisabled && handleOptionSelect(group.id, option.id)}
              disabled={isDisabled}
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                isDisabled
                  ? 'border-gray-800 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'border-red-500 scale-105'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              title={`${option.name}${!option.available ? ' - Out of stock' : option.stock ? ` - ${option.stock} in stock` : ''}`}
            >
              <div className="w-16 h-16 relative">
                {option.media ? (
                  <SafeImage
                    src={option.media}
                    alt={option.name}
                    fill
                    className={`object-cover ${isDisabled ? 'grayscale' : ''}`}
                  />
                ) : (
                  <div className={`w-full h-full bg-gray-800 flex items-center justify-center ${isDisabled ? 'bg-gray-900' : ''}`}>
                    <span className={`text-xs ${isDisabled ? 'text-gray-700' : 'text-gray-500'}`}>
                      {option.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-red-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              {!option.available && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <span className="text-white text-lg">×</span>
                </div>
              )}
            </button>
            <span className={`text-xs text-center transition-colors ${
              isDisabled ? 'text-gray-600' : isSelected ? 'text-white' : 'text-gray-400'
            }`}>
              {option.name}
              {option.available && option.stock !== undefined && option.stock <= 5 && (
                <span className="block text-yellow-400 text-[10px]">Low: {option.stock}</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );

  const renderGroupOptions = (group: ConfiguratorGroup) => {
    switch (group.displayType) {
      case 'color':
        return renderColorOptions(group);
      case 'image':
        return renderImageOptions(group);
      case 'text':
      default:
        return renderTextOptions(group);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-heading text-white mb-4">CONFIGURE PRODUCT</h3>
      {configuratorGroups.map((group) => (
        <div key={group.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="text-sm font-heading text-white tracking-wider">
                {group.name.toUpperCase()}
              </h4>
              <span className="text-xs text-gray-500">
                {group.options.filter(opt => opt.available).length} of {group.options.length} available
              </span>
            </div>
            {selections[group.id] && (
              <div className="text-right">
                <span className="text-xs text-gray-400 block">
                  Selected: {group.options.find(opt => opt.id === selections[group.id])?.name}
                </span>
                {(() => {
                  const selectedOption = group.options.find(opt => opt.id === selections[group.id]);
                  return selectedOption?.stock !== undefined && selectedOption.stock <= 5 ? (
                    <span className="text-xs text-yellow-400">Low stock: {selectedOption.stock}</span>
                  ) : null;
                })()}
              </div>
            )}
          </div>
          {renderGroupOptions(group)}
        </div>
      ))}
    </div>
  );
}
