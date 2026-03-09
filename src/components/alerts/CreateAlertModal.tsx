"use client";

import { useState } from "react";
import { X, ChevronDown, Loader2, Info, Check, Search } from "lucide-react";
import { Rule, AlertOn } from "@/lib/types";

interface CreateAlertModalProps {
  onClose: () => void;
  rule?: Rule;
}

type WizardStep = 1 | 2 | 3;

const SEVERITY_OPTIONS = ["P0", "P1", "P2"];
const METRIC_OPTIONS = ["Error Rate", "Escalation", "Latency", "CSAT"];
const ALERT_ON_OPTIONS: AlertOn[] = ["All Agents", "An Agent Type", "An Individual Agent"];
const ABOVE_BELOW_OPTIONS = ["Above", "Below"];
const AGENT_TYPE_SUGGESTIONS = ["Service Agents", "Sales Agents", "Support Agents"];
const AGENT_SUGGESTIONS = ["Agent 1", "Agent 2", "Agent 3", "Agent 4", "Agent 5"];

export const CreateAlertModal = ({ onClose, rule }: CreateAlertModalProps) => {
  const isEditMode = !!rule;

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    isEditMode ? new Set([1, 2]) : new Set()
  );

  const [name, setName] = useState(rule?.alertName ?? "");
  const [severity, setSeverity] = useState<string>(rule?.severity ?? "");
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);

  const [metric, setMetric] = useState(rule?.metric ?? "");
  const [alertOn, setAlertOn] = useState<string>(rule?.alertOn ?? "");
  const [agentTypeChips, setAgentTypeChips] = useState<string[]>(
    rule?.agentType && rule?.alertOn === "An Agent Type" ? [`${rule.agentType} Agents`] : []
  );
  const [agentChips, setAgentChips] = useState<string[]>(
    rule?.agent && rule.agent !== "All" ? [rule.agent] : []
  );
  const [agentSearchText, setAgentSearchText] = useState("");
  const [showAgentSuggestions, setShowAgentSuggestions] = useState(false);
  const [aboveBelow, setAboveBelow] = useState(rule?.aboveBelow ?? "");
  const [threshold, setThreshold] = useState(rule?.threshold ?? "");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const [messagingEnabled, setMessagingEnabled] = useState(true);
  const [recipient, setRecipient] = useState(rule?.recipients ?? "Your Name");
  const [method, setMethod] = useState(rule?.channel ?? "Email");

  const handleNext = () => {
    if (currentStep === 1 && name && severity) {
      setCompletedSteps((prev) => new Set([...prev, 1]));
      setCurrentStep(2);
    } else if (currentStep === 2 && metric && aboveBelow && threshold) {
      setCompletedSteps((prev) => new Set([...prev, 2]));
      setCurrentStep(3);
    }
  };

  const handleStepClick = (step: WizardStep) => {
    if (completedSteps.has(step) || step === currentStep) {
      setCurrentStep(step);
    }
  };

  const handleTestParameters = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult("47 alerts over the last 7 days");
    }, 1500);
  };

  const handleAddAgentChip = (value: string) => {
    if (alertOn === "An Agent Type") {
      if (!agentTypeChips.includes(value)) {
        setAgentTypeChips([...agentTypeChips, value]);
      }
    } else {
      if (!agentChips.includes(value)) {
        setAgentChips([...agentChips, value]);
      }
    }
    setAgentSearchText("");
    setShowAgentSuggestions(false);
  };

  const handleRemoveAgentTypeChip = (chip: string) => {
    setAgentTypeChips(agentTypeChips.filter((c) => c !== chip));
  };

  const handleRemoveAgentChip = (chip: string) => {
    setAgentChips(agentChips.filter((c) => c !== chip));
  };

  const getSuggestions = () => {
    const list = alertOn === "An Agent Type" ? AGENT_TYPE_SUGGESTIONS : AGENT_SUGGESTIONS;
    if (!agentSearchText) return list;
    return list.filter((s) => s.toLowerCase().includes(agentSearchText.toLowerCase()));
  };

  const isStep1Valid = name.trim().length > 0 && severity.length > 0;
  const isStep2Valid = metric.length > 0 && aboveBelow.length > 0 && threshold.length > 0;

  const renderStepIndicator = (step: number, label: string) => {
    const isCompleted = completedSteps.has(step);
    const isActive = currentStep === step;
    const isClickable = isCompleted || isActive;

    return (
      <button
        onClick={() => handleStepClick(step as WizardStep)}
        className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
          isActive ? "bg-[#E8F4FD] border-l-2 border-sf-blue" : "border-l-2 border-transparent"
        } ${isClickable ? "cursor-pointer hover:bg-[#E8F4FD]/50" : "cursor-default opacity-60"}`}
        tabIndex={isClickable ? 0 : -1}
        aria-label={`Step ${step}: ${label}`}
      >
        {isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-[#4BCA81] flex items-center justify-center shrink-0">
            <Check size={14} className="text-white" />
          </div>
        ) : (
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
              isActive
                ? "bg-sf-blue text-white"
                : "border border-sf-border text-sf-text-secondary"
            }`}
          >
            {step}
          </div>
        )}
        <span
          className={`text-sm ${
            isActive ? "font-medium text-sf-text" : "text-sf-text-secondary"
          }`}
        >
          {label}
        </span>
      </button>
    );
  };

  const renderCustomDropdown = (
    value: string,
    options: string[],
    placeholder: string,
    onChange: (val: string) => void,
    showDropdown: boolean,
    setShowDropdown: (v: boolean) => void
  ) => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full h-[36px] px-3 pr-8 rounded-md border border-sf-border text-sm text-left focus:outline-none focus:border-sf-blue bg-white"
        type="button"
        tabIndex={0}
      >
        {value || <span className="text-sf-text-secondary">{placeholder}</span>}
      </button>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sf-text-secondary pointer-events-none"
      />
      {showDropdown && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-sf-border rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setShowDropdown(false);
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-[#E8F4FD] text-sf-text"
              tabIndex={0}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const [showMetricDropdown, setShowMetricDropdown] = useState(false);
  const [showAlertOnDropdown, setShowAlertOnDropdown] = useState(false);
  const [showAboveBelowDropdown, setShowAboveBelowDropdown] = useState(false);

  const renderStep1 = () => (
    <div>
      <h3 className="text-base font-bold text-sf-text mb-1">Attributes</h3>
      <p className="text-sm text-sf-text-secondary mb-6">Define the alerts metadata.</p>

      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-1 text-sm font-medium text-sf-text mb-1.5">
            <span className="text-sf-error">*</span> Name
            <Info size={14} className="text-sf-blue" />
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Something meaningful to differentiate this alert..."
            className="w-full max-w-[400px] h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-sf-text mb-1.5">
            <span className="text-sf-error">*</span> Severity
          </label>
          {renderCustomDropdown(
            severity,
            SEVERITY_OPTIONS,
            "Select a level",
            setSeverity,
            showSeverityDropdown,
            setShowSeverityDropdown
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 className="text-base font-bold text-sf-text mb-1">Parameters</h3>
      <p className="text-sm text-sf-text-secondary mb-6">
        Define the conditions in which to send the alert
      </p>

      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-sf-text mb-1.5">
              <span className="text-sf-error">*</span> Metric
            </label>
            {renderCustomDropdown(
              metric,
              METRIC_OPTIONS,
              "Choose",
              setMetric,
              showMetricDropdown,
              setShowMetricDropdown
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-sf-text mb-1.5">Alert on</label>
            {renderCustomDropdown(
              alertOn,
              ALERT_ON_OPTIONS,
              "Choose",
              (val) => {
                setAlertOn(val);
                setAgentTypeChips([]);
                setAgentChips([]);
              },
              showAlertOnDropdown,
              setShowAlertOnDropdown
            )}
          </div>
          {alertOn && alertOn !== "" && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-sf-text mb-1.5">
                {alertOn === "An Agent Type" ? "Agent Type" : "Agent"}
              </label>
              <div className="relative">
                <div className="flex items-center gap-1 flex-wrap min-h-[36px] px-2 rounded-md border border-sf-border bg-white">
                  {(alertOn === "An Agent Type" ? agentTypeChips : agentChips).map(
                    (chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#E8F4FD] text-sf-blue text-xs rounded-full"
                      >
                        {chip}
                        <button
                          onClick={() =>
                            alertOn === "An Agent Type"
                              ? handleRemoveAgentTypeChip(chip)
                              : handleRemoveAgentChip(chip)
                          }
                          className="hover:text-sf-error"
                          aria-label={`Remove ${chip}`}
                          tabIndex={0}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )
                  )}
                  <div className="relative flex-1 min-w-[80px]">
                    <input
                      type="text"
                      value={agentSearchText}
                      onChange={(e) => {
                        setAgentSearchText(e.target.value);
                        setShowAgentSuggestions(true);
                      }}
                      onFocus={() => setShowAgentSuggestions(true)}
                      placeholder="Search Agents"
                      className="w-full h-[28px] text-xs focus:outline-none"
                    />
                  </div>
                  <Search size={14} className="text-sf-text-secondary shrink-0" />
                </div>
                {showAgentSuggestions && getSuggestions().length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-sf-border rounded-md shadow-lg z-10 max-h-[150px] overflow-y-auto">
                    {getSuggestions().map((s) => (
                      <button
                        key={s}
                        onClick={() => handleAddAgentChip(s)}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-[#E8F4FD] text-sf-text"
                        tabIndex={0}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-sf-text mb-1.5">
              <span className="text-sf-error">*</span> Above / Below
            </label>
            {renderCustomDropdown(
              aboveBelow,
              ABOVE_BELOW_OPTIONS,
              "Select a level",
              setAboveBelow,
              showAboveBelowDropdown,
              setShowAboveBelowDropdown
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-sf-text mb-1.5">
              <span className="text-sf-error">*</span> Threshold
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="Enter number"
              className="w-full h-[36px] px-3 rounded-md border border-sf-border text-sm focus:outline-none focus:border-sf-blue"
            />
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
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#c23934]">{testResult}</span>
              <span className="text-xs text-sf-text-secondary">(check the 7 days data chart above)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-sf-text mb-2">Attributes</h4>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-sf-text-secondary">Name</span>
              <p className="text-sf-text">{name}</p>
            </div>
            <div>
              <span className="text-sf-text-secondary">Severity</span>
              <p className="text-sf-text">{severity}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-sf-text mb-2">Parameters</h4>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-sf-text-secondary">Metric</span>
              <p className="text-sf-text">{metric}</p>
            </div>
            <div>
              <span className="text-sf-text-secondary">Alert on</span>
              <p className="text-sf-text">{alertOn || "All Agents"}</p>
            </div>
            {(agentChips.length > 0 || agentTypeChips.length > 0) && (
              <div>
                <span className="text-sf-text-secondary">
                  {alertOn === "An Agent Type" ? "Agent Type" : "Agent"}
                </span>
                <p className="text-sf-text">
                  {alertOn === "An Agent Type"
                    ? agentTypeChips.join(", ")
                    : agentChips.join(", ")}
                </p>
              </div>
            )}
            <div>
              <span className="text-sf-text-secondary">Above/Below</span>
              <p className="text-sf-text">{aboveBelow}</p>
            </div>
            <div>
              <span className="text-sf-text-secondary">Threshold</span>
              <p className="text-sf-text">{threshold}%</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-sf-text mb-3">Messaging</h4>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setMessagingEnabled(!messagingEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                messagingEnabled ? "bg-sf-blue" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={messagingEnabled}
              aria-label="Enable messaging"
              tabIndex={0}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                  messagingEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {messagingEnabled && (
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-sf-text-secondary">Recipient</span>
                <p className="text-sf-text">{recipient}</p>
              </div>
              <div>
                <span className="text-sf-text-secondary">Method</span>
                <p className="text-sf-text">{method}</p>
              </div>
              <div>
                <span className="text-sf-text-secondary">Contact Information</span>
                <p className="text-sf-text-secondary text-xs">
                  Notifications will be sent based on the method selected above.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const getFooterButton = () => {
    if (currentStep === 3) {
      return {
        label: isEditMode ? "Save" : "Activate",
        onClick: onClose,
        disabled: false,
      };
    }
    return {
      label: "Next",
      onClick: handleNext,
      disabled: currentStep === 1 ? !isStep1Valid : !isStep2Valid,
    };
  };

  const footerBtn = getFooterButton();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowSeverityDropdown(false);
          setShowMetricDropdown(false);
          setShowAlertOnDropdown(false);
          setShowAboveBelowDropdown(false);
          setShowAgentSuggestions(false);
          onClose();
        }
      }}
    >
      <div
        className="bg-sf-white rounded-xl shadow-2xl w-full max-w-[780px] h-[520px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-sf-border shrink-0">
          <h2 className="text-lg font-bold text-sf-blue">
            {isEditMode ? "Edit The Metric Alert" : "Create New Metric Alert"}
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

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[180px] border-r border-sf-border bg-sf-bg/30 py-4 shrink-0">
            <p className="px-4 text-xs font-bold text-sf-text-secondary uppercase tracking-wide mb-3">
              Steps
            </p>
            {renderStepIndicator(1, "Attributes")}
            {renderStepIndicator(2, "Parameters")}
            {renderStepIndicator(3, "Activate")}
          </div>

          <div className="flex-1 px-8 py-6 overflow-y-auto">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-sf-border shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-sf-border text-sf-text text-sm font-medium hover:bg-sf-bg"
            tabIndex={0}
          >
            Cancel
          </button>
          <button
            onClick={footerBtn.onClick}
            disabled={footerBtn.disabled}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              footerBtn.disabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-sf-blue text-white hover:bg-sf-blue-dark"
            }`}
            tabIndex={0}
          >
            {footerBtn.label}
          </button>
        </div>
      </div>
    </div>
  );
};
