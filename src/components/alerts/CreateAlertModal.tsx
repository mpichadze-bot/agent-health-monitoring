"use client";

import { useState } from "react";
import { X, ChevronDown, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { errorRateChartData } from "@/data/mockData";
import { Rule } from "@/lib/types";

interface CreateAlertModalProps {
  onClose: () => void;
  rule?: Rule;
}

export const CreateAlertModal = ({ onClose, rule }: CreateAlertModalProps) => {
  const isEditMode = !!rule;

  const [name, setName] = useState(rule?.alertName ?? "Single Agent Error Rate Threshold 3%");
  const [description, setDescription] = useState(rule?.description ?? "");
  const [severity, setSeverity] = useState<string>(rule?.severity ?? "P0");
  const [metric, setMetric] = useState(rule?.metric ?? "Error Rate");
  const [agentType, setAgentType] = useState(rule?.agentType ?? "Service");
  const [agent, setAgent] = useState(rule?.agent ?? "Agent 3");
  const [showChart, setShowChart] = useState(true);
  const [aboveBelow, setAboveBelow] = useState(rule?.aboveBelow ?? "Above");
  const [threshold, setThreshold] = useState(rule?.threshold ?? "2");
  const [channel, setChannel] = useState(rule?.channel ?? "");
  const [recipients, setRecipients] = useState(rule?.recipients ?? "");
  const [messaging, setMessaging] = useState(rule?.messaging ?? "");
  const [isActive, setIsActive] = useState(rule?.active ?? true);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(isEditMode ? null : "47 alerts over the last 7 days");

  const handleTestParameters = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult("47 alerts over the last 7 days");
    }, 1500);
  };

  const thresholdValue = parseFloat(threshold) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-sf-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sf-border">
          <h2 className="text-xl font-bold text-sf-blue">
            {isEditMode ? "Edit Metric Alert" : "Create New Metric Alert"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-sf-bg"
            aria-label="Close modal"
            tabIndex={0}
          >
            <X size={20} className="text-sf-blue" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <section>
            <h3 className="text-base font-bold text-sf-text mb-1">Attributes</h3>
            <p className="text-sm text-sf-text-secondary mb-4">Define the alerts metadata.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Something meaningful to differentiate this alert..."
                  className="w-full h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more information about this alert."
                  className="w-full h-[80px] px-3 py-2 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Severity
                </label>
                <div className="relative w-[200px]">
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm appearance-none focus:outline-none focus:border-sf-blue"
                  >
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-sf-text mb-1">Parameters</h3>
            <p className="text-sm text-sf-text-secondary mb-4">
              Define the conditions in which to send the alert
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Metric
                </label>
                <div className="relative">
                  <select
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm appearance-none focus:outline-none focus:border-sf-blue"
                  >
                    <option value="">Choose</option>
                    <option value="Error Rate">Error Rate</option>
                    <option value="Escalation">Escalation</option>
                    <option value="Latency">Latency</option>
                    <option value="CSAT">CSAT</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">Agent type</label>
                <div className="relative">
                  <select
                    value={agentType}
                    onChange={(e) => setAgentType(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm appearance-none focus:outline-none focus:border-sf-blue"
                  >
                    <option value="">Choose</option>
                    <option value="Service">Service</option>
                    <option value="Sales">Sales</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">Agent</label>
                <input
                  type="text"
                  value={agent}
                  onChange={(e) => setAgent(e.target.value)}
                  placeholder="Choose"
                  className="w-full h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
                />
              </div>
            </div>

            <button
              onClick={() => setShowChart(!showChart)}
              className="text-sm text-sf-blue hover:underline mb-4 flex items-center gap-1"
              tabIndex={0}
            >
              ⊙ {showChart ? "Hide" : "Show"} last 7 days data
            </button>

            {showChart && (
              <div className="border border-sf-border rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-sf-text">{metric || "Error Rate"}</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sf-blue" />
                    <span className="text-xs text-sf-text-secondary">Agent 29</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={errorRateChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#706E6B" />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#706E6B"
                      label={{ value: "Percent", angle: -90, position: "insideLeft", style: { fontSize: 11 } }}
                    />
                    <Tooltip />
                    {thresholdValue > 0 && (
                      <>
                        <ReferenceLine
                          y={thresholdValue}
                          stroke="#EA001E"
                          strokeDasharray="5 5"
                          strokeWidth={1.5}
                        />
                        <ReferenceArea
                          y1={thresholdValue}
                          y2={4.5}
                          fill="#EA001E"
                          fillOpacity={0.08}
                        />
                      </>
                    )}
                    <Line
                      type="monotone"
                      dataKey="percent"
                      stroke="#0176D3"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#0176D3" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Above/Below
                </label>
                <div className="relative">
                  <select
                    value={aboveBelow}
                    onChange={(e) => setAboveBelow(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm appearance-none focus:outline-none focus:border-sf-blue"
                  >
                    <option value="">Choose</option>
                    <option value="Above">Above</option>
                    <option value="Below">Below</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Threshold
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    placeholder="Enter"
                    className="flex-1 h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
                  />
                  <span className="text-sm text-sf-text-secondary">%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTestParameters}
                className="px-4 py-1.5 rounded-md border-2 border-sf-blue text-sf-blue text-sm font-medium hover:bg-sf-blue hover:text-white transition-colors"
                disabled={isTesting}
                tabIndex={0}
              >
                Test Parameters
              </button>
              {isTesting && <Loader2 size={16} className="animate-spin text-sf-blue" />}
              {testResult && (
                <span className="text-sm font-bold text-sf-blue">{testResult}</span>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-sf-text mb-1">Messaging</h3>
            <p className="text-sm text-sf-text-secondary mb-4">
              Who gets alerted when the threshold is breached?
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Channel
                </label>
                <div className="relative">
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm appearance-none focus:outline-none focus:border-sf-blue"
                  >
                    <option value="">Choose</option>
                    <option value="email">Email</option>
                    <option value="slack">Slack</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sf-text mb-1">
                  <span className="text-sf-error">*</span> Recipients
                </label>
                <input
                  type="email"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  placeholder="Enter email"
                  className="w-full h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sf-text mb-1">
                <span className="text-sf-error">*</span> Messaging
              </label>
              <textarea
                value={messaging}
                onChange={(e) => setMessaging(e.target.value)}
                placeholder="Describe actions for recipients to take."
                className="w-full h-[80px] px-3 py-2 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue resize-y"
              />
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-sf-text mb-2">Status</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-sf-text">Activate Alert</span>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  isActive ? "bg-sf-blue" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={isActive}
                aria-label="Activate alert toggle"
                tabIndex={0}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                    isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs text-sf-text-secondary">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-sf-border">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-sf-text text-sm font-medium hover:bg-sf-bg"
            tabIndex={0}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-sf-blue text-white text-sm font-medium hover:bg-sf-blue-dark"
            tabIndex={0}
          >
            {isEditMode ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};
