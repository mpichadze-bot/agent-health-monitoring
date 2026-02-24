"use client";

import Link from "next/link";
import {
  Home,
  Bot,
  Sparkles,
  Database,
  FlaskConical,
  BarChart3,
  Gauge,
  CheckSquare,
  AlertTriangle,
  CreditCard,
  PanelLeftClose,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const buildItems = [
  { name: "Agents", icon: Bot, href: "#" },
  { name: "Prompt Templates", icon: Sparkles, href: "#", hasExternal: true },
  { name: "Data", icon: Database, href: "#", hasChevron: true },
  { name: "Tests", icon: FlaskConical, href: "#" },
];

const observeItems = [
  { name: "Analytics", icon: BarChart3, href: "#" },
  { name: "Optimization", icon: Gauge, href: "#" },
  { name: "Eval", icon: CheckSquare, href: "#" },
  { name: "Alerts", icon: AlertTriangle, href: "/alerts" },
  { name: "Consumption Cards", icon: CreditCard, href: "#" },
];

export const Sidebar = () => {
  return (
    <aside className="w-[200px] bg-sf-white border-r border-sf-border flex flex-col shrink-0 h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sf-border">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="4" height="4" fill="#706E6B" />
          <rect x="6" width="4" height="4" fill="#706E6B" />
          <rect x="12" width="4" height="4" fill="#706E6B" />
          <rect y="6" width="4" height="4" fill="#706E6B" />
          <rect x="6" y="6" width="4" height="4" fill="#706E6B" />
          <rect x="12" y="6" width="4" height="4" fill="#706E6B" />
          <rect y="12" width="4" height="4" fill="#706E6B" />
          <rect x="6" y="12" width="4" height="4" fill="#706E6B" />
          <rect x="12" y="12" width="4" height="4" fill="#706E6B" />
        </svg>
        <span className="text-sm font-medium text-sf-text">Agentforce Studio</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-sm text-sf-text-secondary hover:bg-sf-row-hover"
          tabIndex={0}
        >
          <Home size={16} />
          <span>Home</span>
        </Link>

        <div className="mt-4 mb-1 px-4">
          <span className="text-xs font-bold text-sf-text-secondary uppercase tracking-wider">Build</span>
        </div>
        {buildItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-sm text-sf-text-secondary hover:bg-sf-row-hover"
            tabIndex={0}
          >
            <item.icon size={16} />
            <span className="flex-1">{item.name}</span>
            {item.hasExternal && <ExternalLink size={12} className="text-sf-text-secondary" />}
            {item.hasChevron && <ChevronDown size={14} className="text-sf-text-secondary" />}
          </Link>
        ))}

        <div className="mt-4 mb-1 px-4">
          <span className="text-xs font-bold text-sf-text-secondary uppercase tracking-wider">Observe</span>
        </div>
        {observeItems.map((item) => {
          const isActive = item.name === "Alerts";
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-sm ${
                isActive
                  ? "text-sf-blue bg-sf-sidebar-active border-l-[3px] border-sf-blue font-medium"
                  : "text-sf-text-secondary hover:bg-sf-row-hover"
              }`}
              tabIndex={0}
            >
              <item.icon size={16} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sf-border px-4 py-2">
        <button
          className="flex items-center gap-2 text-sm text-sf-text-secondary hover:text-sf-text"
          aria-label="Collapse sidebar"
          tabIndex={0}
        >
          <PanelLeftClose size={16} />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
};
