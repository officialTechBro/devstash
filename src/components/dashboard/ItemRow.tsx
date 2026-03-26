"use client"

import { useState } from 'react'
import { Star, Pin, Code2, Sparkles, Terminal, StickyNote, File, Image, Link } from 'lucide-react'
import { ItemDetailDrawer, type DrawerItem } from '@/components/dashboard/ItemDetailDrawer'

const ROW_ICON_MAP: Record<string, React.ReactNode> = {
  'code-2': <Code2 className="h-3.5 w-3.5" />,
  'sparkles': <Sparkles className="h-3.5 w-3.5" />,
  'terminal': <Terminal className="h-3.5 w-3.5" />,
  'sticky-note': <StickyNote className="h-3.5 w-3.5" />,
  'file': <File className="h-3.5 w-3.5" />,
  'image': <Image className="h-3.5 w-3.5" />,
  'link': <Link className="h-3.5 w-3.5" />,
}

// Maps DB icon names (Lucide kebab-case) to the drawer's ICON_MAP keys
const DRAWER_ICON_KEY: Record<string, string> = {
  'code-2': 'Code',
  'sparkles': 'Sparkles',
  'terminal': 'Terminal',
  'sticky-note': 'StickyNote',
  'file': 'File',
  'image': 'Image',
  'link': 'Link',
}

export interface Item {
  id: string
  title: string
  description: string | null
  content: string | null
  language: string | null
  typeId: string
  typeName: string
  typeIcon: string | null
  typeColor: string | null
  collectionName: string | null
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

interface ItemRowProps {
  item: Item
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ItemRow({ item }: ItemRowProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const icon = item.typeIcon ?? 'file'
  const color = item.typeColor ?? '#64748b'

  const drawerItem: DrawerItem = {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    language: item.language,
    typeId: item.typeId,
    typeName: item.typeName,
    typeIcon: DRAWER_ICON_KEY[icon] ?? 'File',
    typeColor: color,
    collectionName: item.collectionName,
    tags: item.tags,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }

  return (
    <>
      <div
        className="group flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-card/80 cursor-pointer transition-colors"
        onClick={() => setDrawerOpen(true)}
      >
        {/* Type icon */}
        <div
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {ROW_ICON_MAP[icon] ?? <File className="h-3.5 w-3.5" />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-medium">{item.title}</span>
            {item.isPinned && <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />}
            {item.isFavorite && <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />}
          </div>
          {item.description && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.description}</p>
          )}
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span
              className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {item.typeName}
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Date */}
        <span className="shrink-0 text-[11px] text-muted-foreground">{formatDate(item.createdAt)}</span>
      </div>

      <ItemDetailDrawer item={drawerItem} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
