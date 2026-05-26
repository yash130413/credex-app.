import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>
      <div className="border rounded-xl p-6 text-sm text-muted-foreground">
        Settings panels coming soon.
      </div>
    </div>
  );
}
