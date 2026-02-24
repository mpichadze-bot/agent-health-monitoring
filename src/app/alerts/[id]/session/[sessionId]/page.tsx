"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { TabBar } from "@/components/layout/TabBar";
import { SessionList } from "@/components/session/SessionList";
import { SessionLog } from "@/components/session/SessionLog";
import { SessionDetails } from "@/components/session/SessionDetails";
import { IntentDetails } from "@/components/session/IntentDetails";
import { InteractionDetails } from "@/components/session/InteractionDetails";
import { incidents } from "@/data/mockData";
import { DetailLevel } from "@/lib/types";
import { ChevronLeft, ChevronRight, AlertTriangle, Send, ChevronDown, Pencil } from "lucide-react";

interface SessionTracePageProps {
  params: Promise<{ id: string; sessionId: string }>;
}

export default function SessionTracePage({ params }: SessionTracePageProps) {
  const { id, sessionId } = use(params);
  const router = useRouter();
  const incident = incidents.find((i) => i.id === id) || incidents[0];
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("session");
  const [activeSessionId, setActiveSessionId] = useState(sessionId);

  const tabs = [
    { id: "alerts", label: "Alerts", href: "/alerts", isActive: false },
    {
      id: "incident",
      label: incident.alertName,
      href: `/alerts/${id}`,
      isActive: false,
      closable: true,
      icon: "alert" as const,
    },
    {
      id: "session",
      label: "Classify Topic",
      href: `/alerts/${id}/session/${sessionId}`,
      isActive: true,
      closable: true,
      icon: "alert" as const,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <GlobalHeader />
      <TabBar
        tabs={tabs}
        onClose={(tabId) => {
          if (tabId === "session") router.push(`/alerts/${id}`);
          if (tabId === "incident") router.push("/alerts");
        }}
      />

      <div className="bg-sf-white border-b border-sf-border px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-sf-text-secondary">
            <span>Incident (1 of 13)</span>
            <button className="p-0.5 rounded hover:bg-sf-bg flex items-center gap-0.5 text-sf-text-secondary" tabIndex={0} aria-label="Previous session">
              <ChevronLeft size={12} />
              <span>Previous Session</span>
            </button>
            <button className="p-0.5 rounded hover:bg-sf-bg flex items-center gap-0.5 text-sf-text-secondary" tabIndex={0} aria-label="Next session">
              <span>Next Session</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-sf-white border-b border-sf-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <AlertTriangle size={16} className="text-sf-error" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sf-text">Classify Topic</h1>
            <p className="text-xs text-sf-text-secondary">
              Agent: <strong>Agent 3</strong> · Agent type: <strong>Service Agent</strong> · Session ID: 28395298n2v9729b
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md border border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors flex items-center gap-1.5" tabIndex={0}>
            <Send size={14} />
            Send To
            <ChevronDown size={12} />
          </button>
          <button className="px-3 py-1.5 rounded-md border border-sf-border text-sf-text text-sm font-medium hover:bg-sf-row-hover transition-colors flex items-center gap-1.5" tabIndex={0}>
            <Pencil size={14} />
            Edit in Agent Builder
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <SessionList
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          incidentTitle={incident.alertName}
        />

        <SessionLog />

        <div className="flex-1 bg-sf-white flex flex-col min-w-0 overflow-hidden">
          {detailLevel === "session" && (
            <SessionDetails onNavigateToIntent={() => setDetailLevel("intent")} />
          )}
          {detailLevel === "intent" && (
            <IntentDetails
              onNavigateToInteraction={() => setDetailLevel("interaction")}
              onBack={() => setDetailLevel("session")}
            />
          )}
          {detailLevel === "interaction" && (
            <InteractionDetails
              onBack={() => setDetailLevel("intent")}
              onBackToSession={() => setDetailLevel("session")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
