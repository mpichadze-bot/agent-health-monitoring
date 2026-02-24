"use client";

import { sessionDetail } from "@/data/mockData";
import { CheckCircle, XCircle, AlertTriangle, Flag, ExternalLink } from "lucide-react";

interface SessionDetailsProps {
  onNavigateToIntent: () => void;
}

export const SessionDetails = ({ onNavigateToIntent }: SessionDetailsProps) => {
  const detail = sessionDetail;

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <p className="text-xs text-sf-text-secondary mb-1">Session Details</p>
      <h3 className="text-lg font-bold text-sf-text mb-1">{detail.title}</h3>
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs text-sf-text-secondary">
          Session ID: {detail.sessionId}
        </span>
        <span className="w-4 h-4 bg-sf-blue rounded text-white text-[8px] flex items-center justify-center">
          SF
        </span>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-bold text-sf-blue mb-2">Session Flow</h4>
        {detail.sessionFlow.map((flow, idx) => (
          <button
            key={idx}
            onClick={onNavigateToIntent}
            className="flex items-start gap-2 mb-2 w-full text-left hover:bg-sf-row-hover rounded p-1.5 -ml-1.5"
            tabIndex={0}
          >
            <CheckCircle
              size={16}
              className={flow.hasError ? "text-sf-error mt-0.5" : "text-green-500 mt-0.5"}
            />
            <div>
              <span className="text-sm text-sf-blue hover:underline">{flow.name}</span>
              {flow.quality && (
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                    flow.quality === "High"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  Quality: {flow.quality}
                </span>
              )}
            </div>
          </button>
        ))}

        {detail.sessionFlow.some((f) => f.hasError) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
            <div className="flex items-start gap-2">
              <XCircle size={14} className="text-sf-error mt-0.5 shrink-0" />
              <div>
                <span className="text-sm font-medium text-sf-error">Error</span>
                <p className="text-xs text-sf-text-secondary mt-0.5">
                  {detail.sessionFlow.find((f) => f.hasError)?.errorDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {detail.swapItems && detail.swapItems.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-green-600 font-medium mb-1">🔄 Swap Items</p>
            {detail.swapItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded p-2 text-xs"
              >
                <AlertTriangle size={12} className="text-sf-warning" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {detail.outcome && (
          <div className="mt-3 text-xs">
            <span className="text-sf-text-secondary">🔃 Outcome: </span>
            <span className="text-sf-error">{detail.outcome}</span>
            {detail.outcomeChannel && (
              <span className="text-sf-text-secondary ml-2">
                {detail.outcomeChannel}{" "}
                <ExternalLink size={10} className="inline" />
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Session Duration</p>
          <p className="text-sm text-sf-text">{detail.sessionDuration}</p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Session - Custom Evals</p>
          {detail.customEvals.map((eval_, idx) => (
            <div key={idx} className="flex items-center gap-1.5 mb-1">
              <Flag size={12} className="text-sf-error" />
              <span className="text-xs text-sf-error">{eval_.name}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Number of Interactions</p>
          <p className="text-sm text-sf-text">{detail.numberOfInteractions}</p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Average Agent Latency</p>
          <p className="text-sm text-sf-text">{detail.averageAgentLatency}</p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Audio Quality Score</p>
          <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
            {detail.audioQualityScore}
          </span>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Number of Interruptions</p>
          <p className="text-sm text-sf-text">
            ✋ {detail.numberOfInterruptions} interruptions
          </p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-1">Agent Talk / Listen Ratio</p>
          <p className="text-sm text-sf-text">{detail.agentTalkListenRatio}</p>
        </div>
      </div>
    </div>
  );
};
