'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Code2, Sparkles, Terminal, FileText, File, Image, Link2,
  Star, ChevronDown, ChevronRight, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { SidebarItemType } from '@/lib/db/items'
import type { CollectionWithStats } from '@/lib/db/collections'

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  'code-2': Code2,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': FileText,
  'sticky-note': FileText,
  file: File,
  image: Image,
  link: Link2,
}

interface SidebarContentProps {
  collapsed?: boolean
  onNavigate?: () => void
  itemTypes: SidebarItemType[]
  collections: CollectionWithStats[]
}

export function SidebarContent({ collapsed = false, onNavigate, itemTypes, collections }: SidebarContentProps) {
  const [typesOpen, setTypesOpen] = useState(true)
  const [collectionsOpen, setCollectionsOpen] = useState(true)
  const pathname = usePathname()

  const favoriteCollections = collections.filter((c) => c.isFavorite)
  const otherCollections = collections.filter((c) => !c.isFavorite)

  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {/* Types */}
        <div className="mb-1">
          {collapsed ? (
            <div className="mx-2 my-1 h-px bg-border" />
          ) : (
            <button
              onClick={() => setTypesOpen((v) => !v)}
              className="flex w-full items-center gap-1 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <span className="flex-1 text-left">Types</span>
              {typesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}

          {(typesOpen || collapsed) && (
            <ul className="mt-0.5">
              {itemTypes.map((type) => {
                const Icon = TYPE_ICON_MAP[type.icon ?? ''] ?? File
                const href = `/items/${type.name.toLowerCase()}`
                const isActive = pathname === href

                return (
                  <li key={type.id}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Link
                              href={href}
                              onClick={onNavigate}
                              className={cn(
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-sm transition-colors',
                                isActive ? 'bg-accent' : 'hover:bg-muted/50',
                              )}
                            />
                          }
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: type.color ?? undefined }} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {type.name} ({type.count})
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Link
                        href={href}
                        onClick={onNavigate}
                        className={cn(
                          'mx-1 flex items-center gap-2.5 rounded-sm px-3 py-1.5 text-sm transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: type.color ?? undefined }} />
                        <span className="flex-1 truncate">{type.name}</span>
                        {(['file', 'image'].includes(type.name.toLowerCase())) && (
                          <Badge variant="secondary" className="h-4 px-1 text-[9px] font-semibold tracking-wide">PRO</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{type.count}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Collections */}
        <div className="mt-2">
          {collapsed ? (
            <div className="mx-2 my-1 h-px bg-border" />
          ) : (
            <button
              onClick={() => setCollectionsOpen((v) => !v)}
              className="flex w-full items-center gap-1 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <span className="flex-1 text-left">Collections</span>
              {collectionsOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}

          {(collectionsOpen || collapsed) && (
            <>
              {!collapsed && favoriteCollections.length > 0 && (
                <p className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Favorites
                </p>
              )}
              <ul className="mt-0.5">
                {favoriteCollections.map((col) => (
                  <li key={col.id}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Link
                              href={`/collections/${col.id}`}
                              onClick={onNavigate}
                              className="mx-auto flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-muted/50"
                            />
                          }
                        >
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        </TooltipTrigger>
                        <TooltipContent side="right">{col.name}</TooltipContent>
                      </Tooltip>
                    ) : (
                      <Link
                        href={`/collections/${col.id}`}
                        onClick={onNavigate}
                        className="mx-1 flex items-center gap-2.5 rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                      >
                        <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                        <span className="flex-1 truncate">{col.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {!collapsed && (
                <p className="px-3 pb-0.5 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  All Collections
                </p>
              )}
              <ul className="mt-0.5">
                {otherCollections.map((col) => (
                  <li key={col.id}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Link
                              href={`/collections/${col.id}`}
                              onClick={onNavigate}
                              className="mx-auto flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-muted/50"
                            />
                          }
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: col.primaryColor ?? '#64748b' }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {col.name} ({col.itemCount})
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Link
                        href={`/collections/${col.id}`}
                        onClick={onNavigate}
                        className="mx-1 flex items-center gap-2.5 rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: col.primaryColor ?? '#64748b' }}
                        />
                        <span className="flex-1 truncate">{col.name}</span>
                        <span className="text-xs text-muted-foreground">{col.itemCount}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* View all collections link */}
              {!collapsed && (
                <Link
                  href="/collections"
                  onClick={onNavigate}
                  className="mx-1 mt-1 flex items-center rounded-sm px-3 py-1.5 text-xs text-muted-foreground/60 transition-colors hover:bg-muted/50 hover:text-muted-foreground"
                >
                  View all collections
                </Link>
              )}
            </>
          )}
        </div>
      </nav>

      {/* User area */}
      <div className={cn('shrink-0 border-t border-border', collapsed ? 'flex justify-center py-3' : 'p-3')}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-muted text-xs">JD</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">John Doe</TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="bg-muted text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">John Doe</p>
              <p className="truncate text-[10px] text-muted-foreground">demo@devstash.io</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
