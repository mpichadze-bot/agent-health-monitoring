"use client";

import { X, AlertTriangle } from "lucide-react";
import Link from "next/link";

export interface TabItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  closable?: boolean;
  icon?: "alert" | "session";
}

interface TabBarProps {
  tabs: TabItem[];
  onClose?: (id: string) => void;
}

export const TabBar = ({ tabs, onClose }: TabBarProps) => {
  return (
    <div className="h-[36px] bg-sf-white border-b border-sf-border flex items-end px-2 shrink-0">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`flex items-center gap-1.5 px-3 h-[34px] text-sm border-b-2 transition-colors ${
            tab.isActive
              ? "border-sf-blue text-sf-blue font-medium"
              : "border-transparent text-sf-text-secondary hover:text-sf-text hover:bg-sf-row-hover"
          }`}
          tabIndex={0}
        >
          {tab.icon === "alert" && (
            <AlertTriangle size={14} className={tab.isActive ? "text-sf-blue" : "text-sf-text-secondary"} />
          )}
          <span>{tab.label}</span>
          {tab.closable && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose?.(tab.id);
              }}
              className="ml-1 p-0.5 rounded hover:bg-gray-200"
              aria-label={`Close ${tab.label} tab`}
              tabIndex={0}
            >
              <X size={12} />
            </button>
          )}
        </Link>
      ))}
    </div>
  );
};
