'use client'

import { Event } from '@/types';
import EventCard from './EventCard';

interface UpcomingEventsProps {
  events: Event[];
  showAll?: boolean;
}

export default function UpcomingEvents({ events, showAll = false }: UpcomingEventsProps) {
  const displayEvents = showAll ? events : events.slice(0, 3);

  return (
    <section className="py-16 px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-heading text-white mb-2">
              UPCOMING EVENTS
            </h2>
            <p className="text-gray-400 text-lg">
              Join the underground movement at these exclusive events
            </p>
          </div>
          
          {!showAll && (
            <a 
              href="/events" 
              className="text-red-500 hover:text-red-400 transition-colors font-medium text-sm tracking-wider"
            >
              VIEW ALL EVENTS →
            </a>
          )}
        </div>

        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No upcoming events at this time. Check back soon!
            </p>
          </div>
        )}

        {/* Event Categories Legend */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-heading text-white mb-4">EVENT CATEGORIES</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-600 mr-2"></div>
              <span className="text-gray-400 text-sm">Festival</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 mr-2"></div>
              <span className="text-gray-400 text-sm">Club Night</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-600 mr-2"></div>
              <span className="text-gray-400 text-sm">Warehouse</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 mr-2"></div>
              <span className="text-gray-400 text-sm">Underground</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
