"use client";

import { intentDetail } from "@/data/mockData";
import { Hash, Zap } from "lucide-react";
import { CheckCircle } from "lucide-react";

interface IntentDetailsProps {
  onNavigateToInteraction: () => void;
  onBack: () => void;
}

export const IntentDetails = ({ onNavigateToInteraction, onBack }: IntentDetailsProps) => {
  const detail = intentDetail;

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-center gap-1 text-xs text-sf-text-secondary mb-2">
        <button onClick={onBack} className="text-sf-blue hover:underline" tabIndex={0}>
          Session Overview
        </button>
        <span>&gt;</span>
        <span className="font-medium text-sf-text">Intent Details</span>
      </div>

      <h3 className="text-lg font-bold text-sf-text mb-1">{detail.title}</h3>
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs text-sf-text-secondary">
          Intent (Moment) ID: {detail.intentId}
        </span>
        <span className="w-4 h-4 bg-sf-blue rounded text-white text-[8px] flex items-center justify-center">
          SF
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-2">Quality Score</p>
          <span
            className={`text-xs px-2 py-1 rounded ${
              detail.qualityScore === "Low"
                ? "bg-yellow-100 text-yellow-700"
                : detail.qualityScore === "High"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {detail.qualityScore}
          </span>
          <p className="text-xs text-sf-text-secondary mt-2">{detail.description}</p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-2">Intent Duration</p>
          <p className="text-sm text-sf-text">{detail.intentDuration}</p>
          <p className="text-xs text-sf-text-secondary font-bold mt-3 mb-1">
            Number of Interactions
          </p>
          <p className="text-sm text-sf-text">{detail.numberOfInteractions}</p>
        </div>
        <div>
          <p className="text-xs text-sf-text-secondary font-bold mb-2">Intent Tag</p>
          <div className="flex items-center gap-1">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-xs text-sf-text">{detail.intentTag}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-sf-text-secondary font-bold mb-2">Topics Triggered</p>
        <div className="space-y-1.5">
          {detail.topicsTriggered.map((topic, idx) => (
            <button
              key={idx}
              onClick={onNavigateToInteraction}
              className="flex items-center gap-2 text-left w-full hover:bg-sf-row-hover rounded p-1 -ml-1"
              tabIndex={0}
            >
              <Hash size={14} className="text-sf-blue" />
              <span className="text-sm text-sf-text">{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-sf-text-secondary font-bold mb-2">Actions Triggered</p>
        <div className="space-y-1.5">
          {detail.actionsTriggered.map((action, idx) => (
            <button
              key={idx}
              onClick={onNavigateToInteraction}
              className="flex items-center gap-2 text-left w-full hover:bg-sf-row-hover rounded p-1 -ml-1"
              tabIndex={0}
            >
              <Zap size={14} className="text-sf-error" />
              <span className="text-sm text-sf-text">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-sf-border pt-4">
        <div className="flex gap-4">
          <button className="text-sm font-medium text-sf-text border-b-2 border-sf-blue pb-1" tabIndex={0}>
            Trace
          </button>
          <button className="text-sm text-sf-text-secondary pb-1" tabIndex={0}>
            Variables
          </button>
          <button className="text-sm text-sf-text-secondary pb-1" tabIndex={0}>
            Metrics
          </button>
        </div>
      </div>
    </div>
  );
};
