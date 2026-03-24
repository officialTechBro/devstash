"use client"

import { useState } from 'react'
import { Star, Pin, Code2, Sparkles, Terminal, StickyNote, File, Image, Link } from 'lucide-react'
import { ItemDetailDrawer, type DrawerItem } from '@/components/dashboard/ItemDetailDrawer'

const ICON_MAP: Record<string, React.ReactNode> = {
  'code-2': <Code2 className="h-3.5 w-3.5" />,
  'sparkles': <Sparkles className="h-3.5 w-3.5" />,
  'terminal': <Terminal className="h-3.5 w-3.5" />,
  'sticky-note': <StickyNote className="h-3.5 w-3.5" />,
  'file': <File className="h-3.5 w-3.5" />,
  'image': <Image className="h-3.5 w-3.5" />,
  'link': <Link className="h-3.5 w-3.5" />,
}

const TYPE_ICON_MAP: Record<string, { icon: string; color: string; typeName: string; typeIcon: string }> = {
  type_snippet: { icon: 'code-2', color: '#3b82f6', typeName: 'Snippet', typeIcon: 'Code' },
  type_prompt:  { icon: 'sparkles', color: '#a855f7', typeName: 'Prompt', typeIcon: 'Sparkles' },
  type_command: { icon: 'terminal', color: '#f59e0b', typeName: 'Command', typeIcon: 'Terminal' },
  type_note:    { icon: 'sticky-note', color: '#22c55e', typeName: 'Note', typeIcon: 'StickyNote' },
  type_file:    { icon: 'file', color: '#64748b', typeName: 'File', typeIcon: 'File' },
  type_image:   { icon: 'image', color: '#ec4899', typeName: 'Image', typeIcon: 'Image' },
  type_url:     { icon: 'link', color: '#06b6d4', typeName: 'URL', typeIcon: 'Link' },
}

export interface Item {
  id: string
  title: string
  description: string | null
  content: string | null
  language: string | null
  typeId: string
  typeName: string
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
  const typeInfo = TYPE_ICON_MAP[item.typeId]

  const drawerItem: DrawerItem = {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    language: item.language,
    typeId: item.typeId,
    typeName: typeInfo?.typeName ?? item.typeName,
    typeIcon: typeInfo?.typeIcon ?? 'File',
    typeColor: typeInfo?.color ?? '#64748b',
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
          style={{ backgroundColor: typeInfo ? `${typeInfo.color}20` : '#64748b20', color: typeInfo?.color ?? '#64748b' }}
        >
          {typeInfo ? (ICON_MAP[typeInfo.icon] ?? <File className="h-3.5 w-3.5" />) : <File className="h-3.5 w-3.5" />}
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
          {item.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <span className="shrink-0 text-[11px] text-muted-foreground">{formatDate(item.createdAt)}</span>
      </div>

      <ItemDetailDrawer item={drawerItem} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
