'use client'

import { useState } from 'react'
import { PanelLeft, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { SidebarContent } from '@/components/dashboard/SidebarContent'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
        {/* Sidebar toggle — desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-7 w-7 text-muted-foreground md:flex"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        {/* Sidebar toggle — mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="flex h-7 w-7 text-muted-foreground md:hidden"
          onClick={() => setMobileSheetOpen(true)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm font-semibold tracking-tight">DevStash</span>

        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="h-8 border-border bg-muted/40 pl-8 pr-10 text-sm"
            readOnly
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden h-8 text-xs sm:flex">
            New Collection
          </Button>
          <Button size="sm" className="h-8 gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            'hidden shrink-0 flex-col border-r border-border bg-background transition-all duration-200 md:flex',
            sidebarOpen ? 'w-56' : 'w-12',
          )}
        >
          <SidebarContent collapsed={!sidebarOpen} />
        </aside>

        {/* Mobile sheet */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent side="left" className="w-56 p-0">
            <SidebarContent onNavigate={() => setMobileSheetOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
