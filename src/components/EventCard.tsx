'use client'

import Image from 'next/image';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    switch (event.status) {
      case 'selling-fast':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-yellow-500 text-black">
            SELLING FAST
          </span>
        );
      case 'sold-out':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-red-500 text-white">
            SOLD OUT
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = () => {
    switch (event.category) {
      case 'Festival':
        return 'bg-purple-600';
      case 'Club Night':
        return 'bg-blue-600';
      case 'Warehouse':
        return 'bg-orange-600';
      case 'Underground':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="group bg-gray-900 border border-gray-800 overflow-hidden hover:border-red-500 transition-all duration-300">
      <div className="relative">
        <div className="aspect-[2/1] relative overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
          
          {/* Status Badge */}
          {getStatusBadge() && (
            <div className="absolute top-4 right-4">
              {getStatusBadge()}
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-bold text-white ${getCategoryColor()}`}>
              {event.category.toUpperCase()}
            </span>
          </div>
          
          {/* Date Overlay */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="bg-black bg-opacity-70 px-3 py-2 backdrop-blur-sm">
              <div className="text-2xl font-bold">{formatDate(event.date)}</div>
              <div className="text-sm opacity-90">{event.time}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading text-white mb-2 group-hover:text-red-400 transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">{event.venue}</span>
          <span className="mx-2">•</span>
          <span>{event.location}</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg">
            {event.ticketPrice}
          </div>
          
          <button 
            className={`px-6 py-2 font-medium text-sm transition-colors ${
              event.status === 'sold-out' 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            disabled={event.status === 'sold-out'}
          >
            {event.status === 'sold-out' ? 'SOLD OUT' : 'GET TICKETS'}
          </button>
        </div>
      </div>
    </div>
  );
}
