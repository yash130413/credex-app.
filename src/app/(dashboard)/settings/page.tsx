import type { Metadata } from "next";
import { SettingsHero } from "@/components/dashboard/settings-hero";
import { SettingsCards } from "@/components/dashboard/settings-cards";
import { SecurityTrustSection } from "@/components/dashboard/security-trust-section";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12">
      <SettingsHero />
      <SettingsCards />
      <SecurityTrustSection />
    </div>
  );
}
