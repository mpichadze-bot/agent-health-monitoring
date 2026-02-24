"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface RowActionMenuItem {
  label: string;
  onClick: () => void;
}

interface RowActionMenuProps {
  items: RowActionMenuItem[];
}

export const RowActionMenu = ({ items }: RowActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-sf-bg border border-sf-border"
        aria-label="Row actions"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <ChevronDown size={14} className="text-sf-text-secondary" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-sf-white border border-sf-border rounded-lg shadow-lg z-50 min-w-[160px] py-1">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-sf-text hover:bg-sf-row-hover"
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
