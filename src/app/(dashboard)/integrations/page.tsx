import type { Metadata } from "next";
import { IntegrationsList } from "@/components/dashboard/integrations-list";
import { IntegrationsHero } from "@/components/dashboard/integrations-hero";
import { mockProviders } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <IntegrationsHero />
      <IntegrationsList providers={mockProviders} />
    </div>
  );
}
