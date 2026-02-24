import { incidents } from "@/data/mockData";
import { IncidentDetailClient } from "./IncidentDetailClient";

export function generateStaticParams() {
  return incidents.map((i) => ({ id: i.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IncidentDetailPage({ params }: PageProps) {
  return <IncidentDetailClient params={params} />;
}
