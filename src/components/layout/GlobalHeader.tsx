"use client";

import { Search, Plus, Cloud, HelpCircle, Settings, Bell, User } from "lucide-react";

export const GlobalHeader = () => {
  return (
    <header className="h-[45px] bg-sf-white border-b border-sf-border flex items-center px-4 shrink-0">
      <div className="flex items-center gap-2 mr-6">
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.7 2.4C12.8 0.9 14.6 0 16.7 0C19.6 0 22 1.8 22.8 4.3C23.5 3.8 24.4 3.5 25.3 3.5C28 3.5 28 6.7 28 6.7C28 9.4 25.8 11.5 23.1 11.5H5.3C2.4 11.5 0 9.1 0 6.2C0 3.3 2.4 0.9 5.3 0.9C6.4 0.9 7.4 1.2 8.3 1.8"
            fill="#00A1E0"
          />
        </svg>
      </div>

      <div className="flex-1 flex justify-center max-w-[500px] mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[32px] pl-9 pr-3 rounded-md border border-sf-border bg-sf-white text-sm focus:outline-none focus:border-sf-blue"
            aria-label="Global search"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-6">
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Keyboard shortcuts" tabIndex={0}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="15" rx="2" stroke="#706E6B" />
            <line x1="5" y1="5" x2="15" y2="5" stroke="#706E6B" strokeWidth="1" />
            <line x1="5" y1="8" x2="15" y2="8" stroke="#706E6B" strokeWidth="1" />
            <line x1="7" y1="11" x2="13" y2="11" stroke="#706E6B" strokeWidth="1" />
          </svg>
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Add new" tabIndex={0}>
          <Plus size={18} className="text-sf-text-secondary" />
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Cloud status" tabIndex={0}>
          <Cloud size={18} className="text-sf-text-secondary" />
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Help" tabIndex={0}>
          <HelpCircle size={18} className="text-sf-text-secondary" />
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Settings" tabIndex={0}>
          <Settings size={18} className="text-sf-text-secondary" />
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="Notifications" tabIndex={0}>
          <Bell size={18} className="text-sf-text-secondary" />
        </button>
        <button className="p-2 rounded hover:bg-sf-bg" aria-label="User profile" tabIndex={0}>
          <User size={18} className="text-sf-text-secondary" />
        </button>
      </div>
    </header>
  );
};
