import type { Metadata } from "next";
import { IntegrationsList } from "@/components/dashboard/integrations-list";
import { mockProviders } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your AI provider accounts</p>
      </div>
      <IntegrationsList providers={mockProviders} />
    </div>
  );
}
