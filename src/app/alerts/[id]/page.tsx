"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { TabBar } from "@/components/layout/TabBar";
import { DonutChart } from "@/components/incident/DonutChart";
import { TrendLineChart } from "@/components/incident/TrendLineChart";
import { SessionsTable } from "@/components/incident/SessionsTable";
import { incidents, topicsData, actionsData, dailyErrorData } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

interface IncidentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function IncidentDetailPage({ params }: IncidentDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const incident = incidents.find((i) => i.id === id) || incidents[0];

  const tabs = [
    { id: "alerts", label: "Alerts", href: "/alerts", isActive: false },
    {
      id: "incident",
      label: incident.alertName,
      href: `/alerts/${id}`,
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
        onClose={() => router.push("/alerts")}
      />

      <main className="flex-1 overflow-auto bg-sf-bg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertTriangle size={18} className="text-sf-error" />
              </div>
              <div>
                <p className="text-xs text-sf-text-secondary">Alerts</p>
                <h1 className="text-xl font-bold text-sf-text">{incident.alertName}</h1>
                <p className="text-sm text-sf-text-secondary">{incident.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-sf-text-secondary">
                Status: <span className="font-medium text-sf-text">{incident.status}</span>
              </span>
              <button
                className="px-3 py-1.5 rounded-md border-2 border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors"
                tabIndex={0}
              >
                Update Status
              </button>
              <button
                className="px-3 py-1.5 rounded-md border-2 border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors"
                tabIndex={0}
              >
                Edit
              </button>
              <button
                className="px-3 py-1.5 rounded-md border-2 border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors"
                tabIndex={0}
              >
                Deactivate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="col-span-2">
              <h3 className="text-base font-bold text-sf-text mb-3">Alert Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <DonutChart
                  data={topicsData}
                  centerLabel="3"
                  title="Topics"
                />
                <DonutChart
                  data={actionsData}
                  centerLabel="7"
                  title="Actions"
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-sf-text mb-3">
                Errors over the last 7 days
              </h3>
              <TrendLineChart data={dailyErrorData} title="Average" />
            </div>
          </div>

          <SessionsTable incidentId={id} />
        </div>
      </main>
    </div>
  );
}
