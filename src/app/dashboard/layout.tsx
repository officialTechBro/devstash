import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelLeft, Plus, Search } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        {/* Left: logo + sidebar toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">DevStash</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Center: search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="h-8 pl-8 pr-10 text-sm bg-muted/40 border-border"
            readOnly
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            New Collection
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1">
            <Plus className="h-3.5 w-3.5" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar placeholder */}
        <aside className="w-56 shrink-0 border-r border-border p-4">
          <h2 className="text-sm font-medium text-muted-foreground">Sidebar</h2>
        </aside>

        {/* Main area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
