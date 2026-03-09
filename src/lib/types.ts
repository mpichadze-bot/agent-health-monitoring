export type IncidentStatus = "New" | "Acknowledged" | "Closed";
export type Severity = "P0" | "P1" | "P2" | "P3";

export interface Incident {
  id: string;
  alertName: string;
  status: IncidentStatus;
  severity: Severity;
  metric: string;
  lastOccurrence: string;
  agent: string;
  agentType: string;
  trigger: string;
  reason: string;
  subtitle: string;
}

export type AlertOn = "All Agents" | "An Agent Type" | "An Individual Agent";

export interface Rule {
  id: string;
  alertName: string;
  metric: string;
  parameters: string;
  agent: string;
  agentType: string;
  severity: Severity;
  incidents24hrs: number;
  created: string;
  lastModified: string;
  active: boolean;
  description?: string;
  alertOn?: AlertOn;
  aboveBelow?: string;
  threshold?: string;
  channel?: string;
  recipients?: string;
  messaging?: string;
}

export interface TopicData {
  name: string;
  value: number;
  color: string;
}

export interface ActionData {
  name: string;
  value: number;
  color: string;
}

export interface DailyErrorData {
  day: string;
  sessions: number;
}

export interface IncidentSession {
  id: string;
  sessionId: string;
  agentName: string;
  alertSummary: string;
  topic: string;
  action: string;
  channel: string;
  timestamp: string;
  intentSummary?: string;
  responseSummary?: string;
  sessionDuration?: string;
  agentApiName?: string;
  userMessages?: string;
  subagent?: string;
  agentTool?: string;
}

export interface SessionListItem {
  id: string;
  sessionId: string;
  timestamp: string;
  agentName: string;
}

export type MessageSender = "user" | "agent" | "system";
export type QualityLevel = "High" | "Low" | "Medium";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  duration?: string;
  quality?: QualityLevel;
  processingTime?: string;
  hasError?: boolean;
  errorLabel?: string;
  sectionLabel?: string;
  hasInterruption?: boolean;
}

export interface SessionFlowItem {
  name: string;
  quality?: QualityLevel;
  hasError?: boolean;
  errorDescription?: string;
}

export interface SessionDetail {
  sessionId: string;
  title: string;
  sessionFlow: SessionFlowItem[];
  sessionDuration: string;
  numberOfInteractions: number;
  averageAgentLatency: string;
  audioQualityScore: QualityLevel;
  numberOfInterruptions: number;
  agentTalkListenRatio: string;
  customEvals: { name: string; icon: string }[];
  swapItems?: { label: string; duration: string }[];
  outcome?: string;
  outcomeChannel?: string;
}

export interface IntentDetail {
  intentId: string;
  title: string;
  qualityScore: QualityLevel;
  description: string;
  intentDuration: string;
  numberOfInteractions: number;
  intentTag: string;
  topicsTriggered: { name: string; icon: string }[];
  actionsTriggered: { name: string; icon: string }[];
}

export interface InteractionSummary {
  topic: { name: string; icon: string };
  action: { name: string; icon: string };
  agent: { name: string; icon: string };
  variables: { count: number; icon: string };
  retrieval: { count: number; icon: string };
  actionDetail: { name: string; icon: string };
  response: { name: string; icon: string };
}

export interface TraceSpan {
  id: string;
  name: string;
  duration: number;
  durationLabel: string;
  icon?: string;
  iconColor?: string;
  hasWarning?: boolean;
  warningLabel?: string;
  hasError?: boolean;
  children?: TraceSpan[];
  barColor?: string;
  barWidth?: number;
}

export interface SpanDetailData {
  title: string;
  errorTitle?: string;
  errorMessage?: string;
  errorStack?: string;
}

export type DetailLevel = "session" | "intent" | "interaction";
