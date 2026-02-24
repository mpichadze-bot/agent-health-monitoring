"use client";

import { useState } from "react";
import {
  Search,
  Settings,
  HelpCircle,
  Save,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
  MoreVertical,
  FileText,
  MessageCircle,
  Hash,
  Zap,
  Bot,
  Mic,
  ArrowLeft,
  Check,
  Eye,
} from "lucide-react";

const explorerTree = [
  {
    id: "agent-summary",
    label: "Agent Summary",
    icon: "file",
    active: true,
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "agent-instructions", label: "Agent-Level Instructions" },
      { id: "system-messages", label: "System Messages" },
      { id: "language-settings", label: "Language Settings" },
    ],
  },
  {
    id: "topics",
    label: "Topics",
    children: [
      { id: "intent-classifier", label: "Intent Classifier" },
      {
        id: "ask-killer",
        label: "Ask Killer Questions",
        children: [
          {
            id: "actions",
            label: "Actions",
            children: [
              { id: "get-killer", label: "Get Killer Questions" },
              { id: "start-interview", label: "Start Interview" },
              { id: "end-interview", label: "End Interview" },
            ],
          },
        ],
      },
      { id: "ask-screening", label: "Ask Screening Questions" },
      { id: "finalize", label: "Finalize Interview" },
      { id: "post-interview", label: "Post Interview Conclusion" },
      { id: "general-faq", label: "General FAQ Job Offer" },
      { id: "candidate-inquiry", label: "Candidate Job Inquiry" },
      { id: "off-topic", label: "Off Topic" },
    ],
  },
  {
    id: "connections",
    label: "Connections",
    children: [
      {
        id: "messaging",
        label: "Messaging",
        children: [
          { id: "conn-settings", label: "Connection Settings" },
          { id: "instructions", label: "Instructions" },
          {
            id: "response-formats",
            label: "Response Formats",
            children: [
              { id: "rich-link", label: "Rich Link Response" },
              { id: "time-picker", label: "Time Picker" },
            ],
          },
        ],
      },
      { id: "slack", label: "Slack" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    children: [
      { id: "data-libraries", label: "Data Libraries" },
      { id: "mcp-resources", label: "MCP Resources" },
    ],
  },
  {
    id: "connected-agents",
    label: "Connected Agents",
    children: [
      {
        id: "agent-1",
        label: "Agent 1",
        children: [
          { id: "config-1", label: "Configuration" },
          { id: "instr-1", label: "Instructions" },
        ],
      },
      { id: "agent-2", label: "Agent 2" },
    ],
  },
  { id: "variables", label: "Variables" },
  { id: "tests", label: "Tests" },
  { id: "scorers", label: "Scorers" },
  { id: "session-history", label: "Session History" },
];

const topicsTableData = [
  { name: "Ask Killer Questions", description: "Critical screening questions to assess candidate suitability", color: "#4BCA81" },
  { name: "Ask Screening Questions", description: "Detailed screening questions to evaluate experience and qualifications", color: "#0176D3" },
  { name: "Finalize Interview", description: "Completes the interview process and sets technical/qualification stat...", color: "#B968E3" },
  { name: "Post Interview Conclusion", description: "Provides interview conclusion and feedback form", color: "#4BCA81" },
  { name: "General FAQ Job Offer", description: "Handles GDPR and company information questions", color: "#E8A819" },
  { name: "Candidate Job Inquiry", description: "Answers job-specific candidate questions", color: "#EA001E" },
  { name: "Off Topic", description: "Redirects off-topic conversations back to the interview process", color: "#0176D3" },
];

const variablesData = [
  { name: "Authenticati...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Custom", sourceColor: "#E8A819" },
  { name: "Channel ID", type: "Number", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Slack", sourceColor: "#B968E3" },
  { name: "Channel Na...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Slack", sourceColor: "#B968E3" },
  { name: "Channel Pur...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Slack", sourceColor: "#B968E3" },
  { name: "Channel Topic", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Slack", sourceColor: "#B968E3" },
  { name: "Customer ID", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Custom", sourceColor: "#E8A819" },
  { name: "Customer Ty...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Custom", sourceColor: "#E8A819" },
  { name: "Direct Mess...", type: "Number", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Slack", sourceColor: "#B968E3" },
  { name: "Email Subject", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Email for Sal...", sourceColor: "#0176D3" },
  { name: "From Address", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Email for Sal...", sourceColor: "#0176D3" },
  { name: "Is Verified", type: "Boolean", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Custom", sourceColor: "#E8A819" },
  { name: "Messaging S...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Messaging S...", sourceColor: "#4BCA81" },
  { name: "Messaging U...", type: "Number", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Messaging S...", sourceColor: "#4BCA81" },
  { name: "Messaging U...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Messaging S...", sourceColor: "#4BCA81" },
  { name: "Reply to Add...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Email for Sal...", sourceColor: "#0176D3" },
  { name: "Signature Bl...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Email for Sal...", sourceColor: "#0176D3" },
  { name: "To Recipients", type: "String, Array", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Email for Sal...", sourceColor: "#0176D3" },
  { name: "Verified Cust...", type: "String", defaultVal: "[Value]", description: "Lorem ipsum dol...", source: "Custom", sourceColor: "#E8A819" },
];

interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  children?: TreeNode[];
}

const TreeItem = ({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) => {
  const [expanded, setExpanded] = useState(
    node.id === "topics" || node.id === "ask-killer" || node.id === "connections" || node.id === "messaging" || node.id === "connected-agents" || node.id === "agent-1"
  );
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`w-full flex items-center gap-1 px-2 py-1 text-xs hover:bg-[#E8F4FD] rounded ${
          node.active ? "bg-[#E8F4FD] text-[#0176D3] font-medium" : "text-[#3E3E3C]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        tabIndex={0}
        aria-label={node.label}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown size={12} className="text-[#706E6B] shrink-0" />
          ) : (
            <ChevronRight size={12} className="text-[#706E6B] shrink-0" />
          )
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <span className="truncate">{node.label}</span>
      </button>
      {expanded &&
        hasChildren &&
        node.children!.map((child) => (
          <TreeItem key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
};

export default function BuilderPage() {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Builder Header */}
      <header className="h-[40px] bg-[#032D60] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Bot size={18} className="text-white" />
          <span className="text-white text-sm font-medium">Agentforce Builder</span>
          <span className="text-[#B0D0EF] text-sm mx-2">|</span>
          <span className="text-[#B0D0EF] text-sm">Adecco Agentforce Assistant - Version 1</span>
          <ChevronDown size={14} className="text-[#B0D0EF]" />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-white text-xs px-2 py-1 hover:bg-white/10 rounded flex items-center gap-1" tabIndex={0}>
            <Settings size={14} />
            Settings
          </button>
          <button className="text-white text-xs px-3 py-1 border border-white/30 rounded hover:bg-white/10" tabIndex={0}>
            Save
          </button>
          <button className="text-white text-xs px-3 py-1 bg-[#0176D3] rounded hover:bg-[#0B5CAB]" tabIndex={0}>
            Commit Version
          </button>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="h-[36px] bg-white border-b border-[#DDDBDA] flex items-end px-2 shrink-0">
        <div className="flex items-center gap-1.5 px-3 h-[32px] text-xs text-[#706E6B] hover:bg-[#F3F3F3] rounded-t cursor-pointer">
          <span className="bg-[#0176D3] text-white text-[10px] px-1.5 py-0.5 rounded">Canvas</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 h-[32px] text-xs text-[#706E6B] hover:bg-[#F3F3F3] rounded-t cursor-pointer border-b-2 border-transparent">
          <Eye size={12} />
          Preview
        </div>
        <div className="flex items-center gap-1.5 px-3 h-[32px] text-xs text-[#0176D3] font-medium rounded-t border-b-2 border-[#0176D3] bg-white">
          Adeco A...
          <X size={12} className="text-[#706E6B] hover:text-[#3E3E3C] cursor-pointer" />
        </div>
        <div className="ml-auto flex items-center px-2">
          <MoreVertical size={14} className="text-[#706E6B]" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Explorer Sidebar */}
        <aside className="w-[220px] border-r border-[#DDDBDA] bg-white flex flex-col shrink-0 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#DDDBDA]">
            <span className="text-xs font-bold text-[#3E3E3C]">Explorer</span>
            <div className="flex items-center gap-1">
              <button className="p-0.5 rounded hover:bg-[#F3F3F3]" aria-label="Add" tabIndex={0}>
                <Plus size={14} className="text-[#706E6B]" />
              </button>
              <button className="p-0.5 rounded hover:bg-[#F3F3F3]" aria-label="Close" tabIndex={0}>
                <X size={14} className="text-[#706E6B]" />
              </button>
            </div>
          </div>
          <div className="px-2 py-2">
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#706E6B]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-[26px] pl-7 pr-2 text-xs rounded border border-[#DDDBDA] focus:outline-none focus:border-[#0176D3]"
                aria-label="Search explorer"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-1 pb-4">
            {explorerTree.map((node) => (
              <TreeItem key={node.id} node={node} />
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F3F3F3]">
          <div className="max-w-[900px] mx-auto p-6">
            {/* Page Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-[#E8F4FD] flex items-center justify-center">
                <FileText size={16} className="text-[#0176D3]" />
              </div>
              <h1 className="text-xl font-bold text-[#181818]">Agent Summary</h1>
            </div>

            {/* Basic Information */}
            <section className="bg-white rounded-lg border border-[#DDDBDA] p-5 mb-6">
              <h2 className="text-base font-bold text-[#181818] mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs text-[#706E6B] mb-0.5">Agent Name</p>
                  <p className="text-sm text-[#181818]">Adecco Agentforce Assistant</p>
                </div>
                <div>
                  <p className="text-xs text-[#706E6B] mb-0.5">API Name</p>
                  <p className="text-sm text-[#181818]">Adecco_Agentforce_Assistant</p>
                </div>
                <div>
                  <p className="text-xs text-[#706E6B] mb-0.5">Agent User&apos;s Record</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#0176D3] flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">N</span>
                    </div>
                    <p className="text-sm text-[#0176D3]">New Agent User</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#706E6B] mb-0.5">AgentID</p>
                  <p className="text-sm text-[#181818]">123456789</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#706E6B] mb-0.5">Description</p>
                <p className="text-sm text-[#181818] leading-relaxed">
                  Deliver personalized customer interactions with an autonomous AI agent. Agentforce Service Agent intelligently
                  supports your customers with common inquiries and escalates complex issues.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Check size={14} className="text-[#4BCA81]" />
                <p className="text-xs text-[#706E6B]">
                  Enable agent telemetry and session log data to view detailed execution information for this agent
                </p>
              </div>
            </section>

            {/* Topics */}
            <section className="bg-white rounded-lg border border-[#DDDBDA] p-5 mb-6">
              <h2 className="text-base font-bold text-[#181818] mb-1">Topics</h2>
              <p className="text-xs text-[#706E6B] mb-4">
                Topics represent the jobs your agent can perform. Each includes actions, instructions, and metadata that guide how the agent responds.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DDDBDA]">
                    <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                      Topic <ChevronDown size={10} className="inline ml-0.5" />
                    </th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                      Description <ChevronDown size={10} className="inline ml-0.5" />
                    </th>
                    <th className="w-[32px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {topicsTableData.map((topic) => (
                    <tr key={topic.name} className="border-b border-[#DDDBDA] last:border-b-0 hover:bg-[#F3F3F3]">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: topic.color }} />
                          <span className="text-sm text-[#0176D3] hover:underline cursor-pointer">{topic.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-sm text-[#3E3E3C]">{topic.description}</td>
                      <td className="px-2 py-2.5">
                        <button className="p-0.5 rounded hover:bg-[#E8F4FD]" aria-label={`${topic.name} options`} tabIndex={0}>
                          <ChevronRight size={14} className="text-[#706E6B]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Variables */}
            <section className="bg-white rounded-lg border border-[#DDDBDA] p-5">
              <h2 className="text-base font-bold text-[#181818] mb-1">Variables</h2>
              <p className="text-xs text-[#706E6B] mb-4">
                Variables help control how your agent uses topics and actions as well as provide more information about a conversation or session.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#DDDBDA]">
                      <th className="w-[32px] px-2 py-2">
                        <input type="checkbox" className="rounded border-[#DDDBDA]" aria-label="Select all" />
                      </th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                        Name <ChevronDown size={10} className="inline ml-0.5" />
                      </th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                        Data Type <ChevronDown size={10} className="inline ml-0.5" />
                      </th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                        Default Val... <ChevronDown size={10} className="inline ml-0.5" />
                      </th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                        Description <ChevronDown size={10} className="inline ml-0.5" />
                      </th>
                      <th className="text-left px-3 py-2 text-xs font-medium text-[#706E6B]">
                        Source <ChevronDown size={10} className="inline ml-0.5" />
                      </th>
                      <th className="w-[32px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {variablesData.map((v, i) => (
                      <tr key={`${v.name}-${i}`} className="border-b border-[#DDDBDA] last:border-b-0 hover:bg-[#F3F3F3]">
                        <td className="px-2 py-2.5">
                          <input type="checkbox" className="rounded border-[#DDDBDA]" aria-label={`Select ${v.name}`} />
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-sm text-[#0176D3] hover:underline cursor-pointer">{v.name}</span>
                        </td>
                        <td className="px-3 py-2.5 text-sm text-[#3E3E3C]">{v.type}</td>
                        <td className="px-3 py-2.5 text-sm text-[#706E6B]">{v.defaultVal}</td>
                        <td className="px-3 py-2.5 text-sm text-[#706E6B]">{v.description}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: v.sourceColor }} />
                            <span className="text-sm text-[#3E3E3C]">{v.source}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5">
                          <button className="p-0.5 rounded hover:bg-[#E8F4FD]" aria-label={`${v.name} options`} tabIndex={0}>
                            <ChevronRight size={14} className="text-[#706E6B]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>

        {/* Agentforce Chat Panel */}
        <aside className="w-[280px] border-l border-[#DDDBDA] bg-white flex flex-col shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDDBDA]">
            <span className="text-sm font-bold text-[#181818]">Agentforce</span>
            <div className="flex items-center gap-1">
              <MoreVertical size={14} className="text-[#706E6B]" />
              <X size={14} className="text-[#706E6B] cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end p-4">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#032D60] flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-white" />
              </div>
              <p className="text-sm text-[#181818]">Welcome back, Geeta. How can I assist you today?</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Add your question or response..."
                className="w-full h-[40px] pl-8 pr-10 text-sm rounded-lg border border-[#DDDBDA] focus:outline-none focus:border-[#0176D3]"
                aria-label="Chat with Agentforce"
              />
              <Plus size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#706E6B]" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Mic size={14} className="text-[#706E6B]" />
                <ArrowLeft size={14} className="text-[#706E6B] rotate-180" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
