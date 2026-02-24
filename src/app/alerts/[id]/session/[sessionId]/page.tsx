import { incidents } from "@/data/mockData";
import { SessionTraceClient } from "./SessionTraceClient";

const SESSION_IDS = ["session-1", "session-2", "session-3", "session-4", "session-5"];

export function generateStaticParams() {
  const params: { id: string; sessionId: string }[] = [];
  for (const incident of incidents) {
    for (const sessionId of SESSION_IDS) {
      params.push({ id: incident.id, sessionId });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ id: string; sessionId: string }>;
}

export default function SessionTracePage({ params }: PageProps) {
  return <SessionTraceClient params={params} />;
}
