"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Zap, Plug, Settings, LogOut, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Overview",     icon: BarChart3 },
  { href: "/audits",    label: "Audit Results", icon: Zap },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/settings",  label: "Settings",     icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r border-white/[0.06] flex flex-col bg-background shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <TrendingDown className="w-3.5 h-3.5 text-background" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight">Credex</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href}>
              <span
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/[0.06] flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">Jane Doe</p>
          <p className="text-[11px] text-muted-foreground truncate">jane@acme.com</p>
        </div>
        <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors">
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
