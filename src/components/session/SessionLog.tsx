"use client";

import { chatMessages } from "@/data/mockData";
import { AudioPlayer } from "./AudioPlayer";
import { Download, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";

export const SessionLog = () => {
  return (
    <div className="flex-1 bg-sf-white border-r border-sf-border flex flex-col h-full min-w-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sf-border shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-sf-text">Session Log</h3>
          <span className="text-xs text-sf-text-secondary">(3 min, 24 sec)</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Download" tabIndex={0}>
            <Download size={14} className="text-sf-text-secondary" />
          </button>
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Scroll up" tabIndex={0}>
            <ArrowUp size={14} className="text-sf-text-secondary" />
          </button>
          <button className="p-1 rounded hover:bg-sf-bg" aria-label="Scroll down" tabIndex={0}>
            <ArrowDown size={14} className="text-sf-text-secondary" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div className="text-center text-xs text-sf-text-secondary mb-2">
          📞 Call initiated by User · 9:01:14 AM
        </div>

        {chatMessages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="flex items-center gap-2 py-1">
                <div className="flex-1 border-t border-dashed border-sf-border" />
                <span className="text-xs text-sf-text-secondary whitespace-nowrap">
                  {msg.sectionLabel}
                </span>
                {msg.quality && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      msg.quality === "High"
                        ? "bg-green-100 text-green-700"
                        : msg.quality === "Low"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Quality: {msg.quality}
                  </span>
                )}
                <div className="flex-1 border-t border-dashed border-sf-border" />
              </div>
            );
          }

          if (msg.sender === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%]">
                  <div className="bg-sf-blue text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-sf-text-secondary mt-1 text-right">
                    {msg.duration} · {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[80%]">
                {msg.processingTime && (
                  <p className="text-[10px] text-sf-text-secondary mb-1 flex items-center gap-1">
                    ✨ {msg.processingTime}
                    <span className="flex gap-0.5 ml-1">
                      {["🔴", "#", "🟡", "🔵", "🟢", "❌", "🔲"].map((icon, i) => (
                        <span key={i} className="w-3.5 h-3.5 rounded bg-gray-100 text-[8px] flex items-center justify-center">
                          {icon}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
                <div
                  className={`rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm ${
                    msg.hasError
                      ? "bg-red-50 border border-red-200"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sf-text">{msg.text}</p>
                  {msg.hasError && (
                    <div className="flex items-center gap-1 mt-2">
                      <AlertCircle size={12} className="text-sf-error" />
                      <span className="text-xs text-sf-error font-medium">
                        {msg.errorLabel}
                      </span>
                    </div>
                  )}
                </div>
                {msg.hasInterruption && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-sf-error bg-red-50 px-1.5 py-0.5 rounded">
                      ⚡ User Interruption
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-sf-text-secondary mt-1">
                  {msg.duration} · {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-sf-border shrink-0">
        <AudioPlayer />
      </div>
    </div>
  );
};
