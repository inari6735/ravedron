'use client'

import { useState } from 'react';
import { Header, Footer } from '@/components';
import { upcomingEvents, navigationItems, footerSections } from '@/data';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';

const sortOptions = [
  { value: 'date-asc', label: 'Date (Earliest First)' },
  { value: 'date-desc', label: 'Date (Latest First)' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' }
];

const categories = ['All', 'Festival', 'Club Night', 'Warehouse', 'Underground'];

export default function EventsPage() {
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [events] = useState<Event[]>(upcomingEvents);

  const filteredEvents = events.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const priceA = parseInt(a.ticketPrice.replace(/[^\d]/g, ''));
    const priceB = parseInt(b.ticketPrice.replace(/[^\d]/g, ''));
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    switch (sortBy) {
      case 'date-asc':
        return dateA.getTime() - dateB.getTime();
      case 'date-desc':
        return dateB.getTime() - dateA.getTime();
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navigationItems={navigationItems} />
      
      {/* Breadcrumbs */}
      <div className="px-6 py-4 lg:px-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Events</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-16 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-heading mb-4 text-white">
            UNDERGROUND EVENTS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the most exclusive electronic music events, from intimate club nights to massive warehouse raves
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="px-6 lg:px-8 py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-400 text-sm">
            Showing {sortedEvents.length} of {events.length} events
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No events found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Event Categories Legend */}
      <div className="px-6 lg:px-8 py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-heading text-white mb-6">EVENT CATEGORIES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4 bg-gray-800 border border-gray-700">
              <div className="w-4 h-4 bg-purple-600 mr-3"></div>
              <div>
                <h4 className="text-white font-medium">Festival</h4>
                <p className="text-gray-400 text-sm">Multi-day outdoor events</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-800 border border-gray-700">
              <div className="w-4 h-4 bg-blue-600 mr-3"></div>
              <div>
                <h4 className="text-white font-medium">Club Night</h4>
                <p className="text-gray-400 text-sm">Intimate venue experiences</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-800 border border-gray-700">
              <div className="w-4 h-4 bg-orange-600 mr-3"></div>
              <div>
                <h4 className="text-white font-medium">Warehouse</h4>
                <p className="text-gray-400 text-sm">Industrial space raves</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-800 border border-gray-700">
              <div className="w-4 h-4 bg-green-600 mr-3"></div>
              <div>
                <h4 className="text-white font-medium">Underground</h4>
                <p className="text-gray-400 text-sm">Secret location events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer footerSections={footerSections} />
    </div>
  );
}
