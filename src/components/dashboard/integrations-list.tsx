import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plug, Trash2 } from "lucide-react";
import { PROVIDER_LABELS } from "@/lib/utils";
import type { AIProvider } from "@/types";

export function IntegrationsList({ providers }: { providers: AIProvider[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-2">
          <Plug className="w-4 h-4" /> Connect provider
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {providers.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{p.name}</span>
                  <Badge variant={p.isActive ? "default" : "secondary"} className="text-xs">
                    {p.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {PROVIDER_LABELS[p.provider]} · {p.apiKeyMasked}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
