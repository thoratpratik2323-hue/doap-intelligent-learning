import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, Users, Check, Bookmark, Share2 } from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const Events = () => {
  const { isDarkMode } = useTheme();

  const [activeCategory, setActiveCategory] = useState('All');
  const [eventsList, setEventsList] = useState(EVENTS_DATA);

  const categories = [
    "All", "Hackathon", "Workshop", "Seminar", "Competition", 
    "Career", "Tech", "Cultural", "Guest Lecture"
  ];

  const toggleEnroll = (id) => {
    setEventsList(eventsList.map(e => e.id === id ? { ...e, enrolled: !e.enrolled } : e));
  };

  const filteredEvents = eventsList.filter(e => 
    activeCategory === 'All' || e.type === activeCategory
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-8 animate-fade-in select-none">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#0a0a0a]'
        }`}>Events</h1>
        <p className={`text-xs font-mono uppercase tracking-wider ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>Stay connected to technical workshops, hackathons & campus events</p>
      </div>

      {/* Featured Banner Card */}
      <div className={`p-6 md:p-8 rounded-3xl space-y-4 border relative overflow-hidden transition-colors ${
        isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
      }`}>
        <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase inline-block border ${
          isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
        }`}>
          FEATURED EVENT
        </span>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          AI & Machine Learning Hackathon 2026
        </h2>

        <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            <span>Aug 28–29</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>9:00 AM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} />
            <span>Tech Block, Lab 3</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>12 seats left</span>
          </div>
        </div>

        <div>
          <button 
            onClick={() => toggleEnroll("1")}
            className={`px-6 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all cursor-pointer ${
              isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {eventsList.find(e => e.id === "1")?.enrolled ? "Enrolled ✓" : "Enroll Now"}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border
              ${activeCategory === cat 
                ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                : (isDarkMode ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:text-black')
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards List */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className={`p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border transition-all ${
              isDarkMode ? 'bg-[#111111] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-black'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
                isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
              }`}>
                <span className="text-[10px] font-mono font-bold uppercase">{evt.dateMonth}</span>
                <span className="text-lg font-black">{evt.dateDay}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                  }`}>
                    {evt.type}
                  </span>
                  {evt.enrolled && (
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 border ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-neutral-100 border-neutral-300 text-black'
                    }`}>
                      <Check size={12} /> Enrolled
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold">{evt.title}</h3>

                <div className={`flex flex-wrap items-center gap-3 text-xs font-mono ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>⏱ {evt.time}</span>
                  <span>📍 {evt.location}</span>
                  <span>👥 {evt.seatsLeft} seats left</span>
                  <span>• {evt.organizer}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button 
                onClick={() => toggleEnroll(evt.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  evt.enrolled
                    ? (isDarkMode ? 'bg-neutral-900 border border-neutral-700 text-white' : 'bg-neutral-100 border border-neutral-300 text-black')
                    : (isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800')
                }`}
              >
                {evt.enrolled ? "Enrolled ✓" : "Enroll"}
              </button>

              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
              }`}>
                <Bookmark size={16} />
              </button>
              <button className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
              }`}>
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
