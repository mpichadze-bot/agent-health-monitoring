"use client";

import { useState } from "react";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { IncidentsTable } from "@/components/alerts/IncidentsTable";
import { RulesTable } from "@/components/alerts/RulesTable";
import { CreateAlertModal } from "@/components/alerts/CreateAlertModal";
import { AlertTriangle, Search, Filter } from "lucide-react";
import { Rule } from "@/lib/types";

type AlertTab = "incidents" | "rules";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<AlertTab>("incidents");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingRule(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <GlobalHeader />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="h-[36px] bg-sf-white border-b border-sf-border flex items-end px-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 h-[34px] text-sm border-b-2 border-sf-blue text-sf-blue font-medium">
              <AlertTriangle size={14} />
              <span>Alerts</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-sf-bg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-sf-error" />
                  </div>
                  <div>
                    <p className="text-xs text-sf-text-secondary">Metric</p>
                    <h1 className="text-2xl font-bold text-sf-text">Alerts</h1>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sf-text-secondary" size={14} />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="h-[32px] pl-8 pr-3 w-[200px] rounded-md border border-sf-border bg-sf-white text-sm focus:outline-none focus:border-sf-blue"
                      aria-label="Search alerts"
                    />
                  </div>
                  <button className="p-2 rounded-md border border-sf-border bg-sf-white hover:bg-sf-row-hover" aria-label="Filter" tabIndex={0}>
                    <Filter size={16} className="text-sf-blue" />
                  </button>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-1.5 rounded-md border-2 border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors"
                    tabIndex={0}
                  >
                    Create Alert
                  </button>
                </div>
              </div>

              <div className="flex gap-1 mb-4 border-b border-sf-border">
                <button
                  onClick={() => setActiveTab("incidents")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "incidents"
                      ? "border-sf-blue text-sf-blue"
                      : "border-transparent text-sf-text-secondary hover:text-sf-text"
                  }`}
                  tabIndex={0}
                >
                  Incidents
                </button>
                <button
                  onClick={() => setActiveTab("rules")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "rules"
                      ? "border-sf-blue text-sf-blue"
                      : "border-transparent text-sf-text-secondary hover:text-sf-text"
                  }`}
                  tabIndex={0}
                >
                  Rules
                </button>
              </div>

              {activeTab === "incidents" ? (
                <IncidentsTable />
              ) : (
                <RulesTable onEditRule={handleEditRule} />
              )}
            </div>
          </div>
        </main>
      </div>

      {showCreateModal && (
        <CreateAlertModal onClose={handleCloseModal} />
      )}

      {editingRule && (
        <CreateAlertModal onClose={handleCloseModal} rule={editingRule} />
      )}
    </div>
  );
}
