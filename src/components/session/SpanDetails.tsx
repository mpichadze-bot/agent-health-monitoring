"use client";

import { useState } from "react";
import { spanDetailData } from "@/data/mockData";
import { X, Pin, Copy, AlertTriangle } from "lucide-react";

interface SpanDetailsProps {
  onClose: () => void;
}

export const SpanDetails = ({ onClose }: SpanDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "errors" | "variables" | "dataSources">(
    "errors"
  );
  const detail = spanDetailData;
  const tabs = [
    { id: "details" as const, label: "Details" },
    { id: "errors" as const, label: "Errors" },
    { id: "variables" as const, label: "Variables" },
    { id: "dataSources" as const, label: "Data Sources" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-sf-border shrink-0">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-sf-text">Span Details</h4>
          <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="Pin" tabIndex={0}>
            <Pin size={10} className="text-sf-text-secondary" />
          </button>
          <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="Copy" tabIndex={0}>
            <Copy size={10} className="text-sf-text-secondary" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="Resize" tabIndex={0}>
            <span className="text-[10px] text-sf-text-secondary">⤢</span>
          </button>
          <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="Minimize" tabIndex={0}>
            <span className="text-[10px] text-sf-text-secondary">✕</span>
          </button>
          <button
            onClick={onClose}
            className="p-0.5 rounded hover:bg-sf-bg"
            aria-label="Close span details"
            tabIndex={0}
          >
            <X size={12} className="text-sf-text-secondary" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 px-3 pt-2 border-b border-sf-border shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-[11px] pb-1.5 ${
              activeTab === tab.id
                ? "font-medium text-sf-text border-b-2 border-sf-blue"
                : "text-sf-text-secondary hover:text-sf-text"
            }`}
            tabIndex={0}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "errors" && detail.errorTitle && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle size={14} className="text-sf-error mt-0.5 shrink-0" />
              <p className="text-sm font-bold text-sf-error">{detail.errorTitle}</p>
            </div>
            <p className="text-xs text-sf-text mb-2">{detail.errorMessage}</p>
            {detail.errorStack && (
              <p className="text-xs text-sf-text-secondary">{detail.errorStack}</p>
            )}
          </div>
        )}
        {activeTab === "details" && (
          <div className="text-xs text-sf-text-secondary">
            <p className="font-medium text-sf-text mb-2">Span: {detail.title}</p>
            <p>Duration: 151 ms</p>
            <p>Status: Error</p>
          </div>
        )}
        {activeTab === "variables" && (
          <p className="text-xs text-sf-text-secondary">No variables captured for this span.</p>
        )}
        {activeTab === "dataSources" && (
          <p className="text-xs text-sf-text-secondary">No data sources for this span.</p>
        )}
      </div>
    </div>
  );
};
