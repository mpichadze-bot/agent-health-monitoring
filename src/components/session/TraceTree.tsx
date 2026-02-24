"use client";

import { useState } from "react";
import { traceSpans } from "@/data/mockData";
import { TraceSpan } from "@/lib/types";
import {
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  AlertTriangle,
} from "lucide-react";

interface TraceTreeProps {
  selectedSpanId: string | null;
  onSelectSpan: (id: string) => void;
}

const SpanIcon = ({ span }: { span: TraceSpan }) => {
  if (span.hasWarning || span.hasError) {
    return <AlertTriangle size={12} className="text-sf-error shrink-0" />;
  }
  const colorMap: Record<string, string> = {
    "#EA001E": "text-sf-error",
    "#0176D3": "text-sf-blue",
    "#B968E3": "text-purple-500",
    "#706E6B": "text-sf-text-secondary",
    "#4BCA81": "text-green-500",
  };
  const colorClass = span.iconColor ? colorMap[span.iconColor] || "text-sf-text-secondary" : "text-sf-text-secondary";
  return <span className={`w-3 h-3 rounded-full ${colorClass} border-2 border-current shrink-0`} />;
};

const SpanRow = ({
  span,
  depth,
  selectedSpanId,
  onSelectSpan,
}: {
  span: TraceSpan;
  depth: number;
  selectedSpanId: string | null;
  onSelectSpan: (id: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = span.children && span.children.length > 0;
  const isSelected = span.id === selectedSpanId;

  return (
    <>
      <button
        onClick={() => onSelectSpan(span.id)}
        className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-left hover:bg-sf-row-hover text-xs ${
          isSelected ? "bg-sf-sidebar-active" : ""
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        tabIndex={0}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="shrink-0"
            tabIndex={0}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown size={12} className="text-sf-text-secondary" />
            ) : (
              <ChevronRight size={12} className="text-sf-text-secondary" />
            )}
          </button>
        ) : (
          <span className="w-3 shrink-0" />
        )}

        <SpanIcon span={span} />

        <span
          className={`truncate flex-1 ${
            span.hasError ? "text-sf-error" : "text-sf-text"
          }`}
        >
          {span.name}
        </span>

        {span.hasWarning && (
          <span className="text-[10px] text-sf-error whitespace-nowrap">
            ⚡ {span.warningLabel}
          </span>
        )}

        <span className="text-sf-text-secondary whitespace-nowrap ml-2">
          {span.durationLabel}
        </span>

        <div
          className="w-20 h-2 rounded-full overflow-hidden bg-gray-100 shrink-0 ml-2"
          aria-label={`Duration bar: ${span.durationLabel}`}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${span.barWidth || 10}%`,
              backgroundColor: span.barColor || "#94A3B8",
            }}
          />
        </div>
      </button>

      {hasChildren && isExpanded && span.children!.map((child) => (
        <SpanRow
          key={child.id}
          span={child}
          depth={depth + 1}
          selectedSpanId={selectedSpanId}
          onSelectSpan={onSelectSpan}
        />
      ))}
    </>
  );
};

export const TraceTree = ({ selectedSpanId, onSelectSpan }: TraceTreeProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-sf-border shrink-0">
        <span className="text-xs text-sf-text-secondary">
          Session: <span className="text-sf-text font-medium">#Y890KRTU000KF3bPBG</span>
        </span>
        <span className="w-4 h-4 bg-sf-blue rounded text-white text-[8px] flex items-center justify-center">
          SF
        </span>
        <div className="flex-1" />
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={10} />
          <input
            type="text"
            placeholder="Search events..."
            className="h-[24px] pl-6 pr-2 w-[120px] rounded border border-sf-border text-[10px] focus:outline-none focus:border-sf-blue"
            aria-label="Search trace events"
          />
        </div>
        <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="Filter" tabIndex={0}>
          <Filter size={12} className="text-sf-text-secondary" />
        </button>
        <button className="p-0.5 rounded hover:bg-sf-bg" aria-label="More" tabIndex={0}>
          <MoreHorizontal size={12} className="text-sf-text-secondary" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {traceSpans.map((span) => (
          <SpanRow
            key={span.id}
            span={span}
            depth={0}
            selectedSpanId={selectedSpanId}
            onSelectSpan={onSelectSpan}
          />
        ))}
      </div>
    </div>
  );
};
