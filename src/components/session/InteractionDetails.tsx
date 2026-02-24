"use client";

import { interactionSummary } from "@/data/mockData";
import { CheckCircle, Hash, Zap, Bot, Variable, FileText, Shield, MessageCircle, Maximize2 } from "lucide-react";
import { TraceTree } from "./TraceTree";
import { useState } from "react";
import { SpanDetails } from "./SpanDetails";

interface InteractionDetailsProps {
  onBack: () => void;
  onBackToSession: () => void;
}

export const InteractionDetails = ({ onBack, onBackToSession }: InteractionDetailsProps) => {
  const summary = interactionSummary;
  const [activeTab, setActiveTab] = useState<"trace" | "variables" | "metrics">("trace");
  const [selectedSpanId, setSelectedSpanId] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-full">
      <div className="p-4 shrink-0">
        <div className="flex items-center gap-1 text-xs text-sf-text-secondary mb-2">
          <button onClick={onBackToSession} className="text-sf-blue hover:underline" tabIndex={0}>
            Session Details
          </button>
          <span>&gt;</span>
          <button onClick={onBack} className="text-sf-blue hover:underline" tabIndex={0}>
            Intent Details
          </button>
          <span>&gt;</span>
          <span className="font-medium text-sf-text">Interaction Details</span>
        </div>

        <h3 className="text-lg font-bold text-sf-text mb-4">Interaction Summary</h3>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Topic:</span>
            <Hash size={14} className="text-sf-blue" />
            <span className="text-sm text-sf-blue">{summary.topic.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Action:</span>
            <Zap size={14} className="text-sf-blue" />
            <span className="text-sm text-sf-blue">{summary.action.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Agent:</span>
            <Bot size={14} className="text-sf-blue" />
            <span className="text-sm text-sf-blue">{summary.agent.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Variable(s):</span>
            <Variable size={14} className="text-sf-blue" />
            <span className="text-sm text-sf-blue">{summary.variables.count} variables</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Retrieval:</span>
            <FileText size={14} className="text-green-600" />
            <span className="text-sm text-sf-blue">{summary.retrieval.count} document</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Action:</span>
            <Shield size={14} className="text-sf-blue" />
            <span className="text-sm text-sf-blue">{summary.actionDetail.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            <span className="text-sm text-sf-text-secondary w-20">Response:</span>
            <MessageCircle size={14} className="text-sf-error" />
            <span className="text-sm text-sf-blue">{summary.response.name}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-sf-border flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 pt-3 shrink-0">
          <div className="flex gap-4">
            {(["trace", "variables", "metrics"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm pb-2 capitalize ${
                  activeTab === tab
                    ? "font-medium text-sf-text border-b-2 border-sf-blue"
                    : "text-sf-text-secondary hover:text-sf-text"
                }`}
                tabIndex={0}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Expand" tabIndex={0}>
            <Maximize2 size={14} className="text-sf-text-secondary" />
          </button>
        </div>

        {activeTab === "trace" && (
          <div className="flex-1 overflow-y-auto flex">
            <div className={`${selectedSpanId ? "w-1/2" : "w-full"} overflow-y-auto`}>
              <TraceTree
                selectedSpanId={selectedSpanId}
                onSelectSpan={(id) => setSelectedSpanId(id === selectedSpanId ? null : id)}
              />
            </div>
            {selectedSpanId && (
              <div className="w-1/2 border-l border-sf-border">
                <SpanDetails onClose={() => setSelectedSpanId(null)} />
              </div>
            )}
          </div>
        )}
        {activeTab === "variables" && (
          <div className="p-4 text-sm text-sf-text-secondary">Variables panel placeholder</div>
        )}
        {activeTab === "metrics" && (
          <div className="p-4 text-sm text-sf-text-secondary">Metrics panel placeholder</div>
        )}
      </div>
    </div>
  );
};
