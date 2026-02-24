"use client";

import { useState } from "react";
import { rules as initialRules } from "@/data/mockData";
import { Rule } from "@/lib/types";
import { LayoutGrid } from "lucide-react";

interface RulesTableProps {
  onEditRule?: (rule: Rule) => void;
}

export const RulesTable = ({ onEditRule }: RulesTableProps) => {
  const [rules, setRules] = useState(initialRules);

  const handleToggle = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-sm text-sf-text-secondary">
          {rules.length} Items · Sorted by Last Modified
        </span>
        <button className="p-1.5 rounded hover:bg-sf-bg border border-sf-border" aria-label="Table view" tabIndex={0}>
          <LayoutGrid size={16} className="text-sf-text-secondary" />
        </button>
      </div>

      <div className="bg-sf-white border border-sf-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sf-border bg-sf-bg/50">
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Metric</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Parameters</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Agent Type</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Severity</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Incidents/24 hrs</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Created</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Last Modified</th>
              <th className="text-left px-4 py-2.5 font-medium text-sf-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr
                key={rule.id}
                className="border-b border-sf-border last:border-b-0 hover:bg-sf-row-hover cursor-pointer"
                onClick={() => onEditRule?.(rule)}
                role="button"
                tabIndex={0}
                aria-label={`Edit ${rule.alertName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onEditRule?.(rule);
                  }
                }}
              >
                <td className="px-4 py-3 text-sf-text font-medium">{rule.metric}</td>
                <td className="px-4 py-3 text-sf-text">{rule.parameters}</td>
                <td className="px-4 py-3 text-sf-text">{rule.agent}</td>
                <td className="px-4 py-3 text-sf-text">{rule.agentType}</td>
                <td className="px-4 py-3 text-sf-text">{rule.severity}</td>
                <td className="px-4 py-3 text-sf-text">{rule.incidents24hrs}</td>
                <td className="px-4 py-3 text-sf-text">{rule.created}</td>
                <td className="px-4 py-3 text-sf-text">{rule.lastModified}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(rule.id);
                    }}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      rule.active ? "bg-sf-blue" : "bg-gray-300"
                    }`}
                    aria-label={`Toggle ${rule.alertName} ${rule.active ? "off" : "on"}`}
                    role="switch"
                    aria-checked={rule.active}
                    tabIndex={0}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                        rule.active ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
