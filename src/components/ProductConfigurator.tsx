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
        return (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(group.id, option.id)}
            className={`py-2 px-3 border text-sm font-medium transition-colors text-center ${
              isSelected
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
            }`}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );

  const renderColorOptions = (group: ConfiguratorGroup) => (
    <div className="flex flex-wrap gap-3">
      {group.options.map((option) => {
        const isSelected = selections[group.id] === option.id;
        const hasColorCode = option.colorHexCode && option.colorHexCode !== '';
        
        return (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleOptionSelect(group.id, option.id)}
              className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                isSelected
                  ? 'border-red-500 scale-110'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              style={{
                backgroundColor: hasColorCode ? option.colorHexCode : '#374151'
              }}
              title={option.name}
            >
              {isSelected && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
            <span className={`text-xs transition-colors ${
              isSelected ? 'text-white' : 'text-gray-400'
            }`}>
              {option.name}
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
        return (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleOptionSelect(group.id, option.id)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-red-500 scale-105'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="w-16 h-16 relative">
                {option.media ? (
                  <SafeImage
                    src={option.media}
                    alt={option.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">{option.name.charAt(0)}</span>
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
            </button>
            <span className={`text-xs text-center transition-colors ${
              isSelected ? 'text-white' : 'text-gray-400'
            }`}>
              {option.name}
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
            <h4 className="text-sm font-heading text-white tracking-wider">
              {group.name.toUpperCase()}
            </h4>
            {selections[group.id] && (
              <span className="text-xs text-gray-400">
                Selected: {group.options.find(opt => opt.id === selections[group.id])?.name}
              </span>
            )}
          </div>
          {renderGroupOptions(group)}
        </div>
      ))}
    </div>
  );
}
