"use client"

import { Star, Pin, Copy, Pencil, Trash2, Code2, Sparkles, Terminal, StickyNote, File, Image, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'

const ICON_MAP: Record<string, React.ReactNode> = {
  'Code': <Code2 className="h-4 w-4" />,
  'Sparkles': <Sparkles className="h-4 w-4" />,
  'Terminal': <Terminal className="h-4 w-4" />,
  'StickyNote': <StickyNote className="h-4 w-4" />,
  'File': <File className="h-4 w-4" />,
  'Image': <Image className="h-4 w-4" />,
  'Link': <Link className="h-4 w-4" />,
}

export interface DrawerItem {
  id: string
  title: string
  description: string | null
  content: string | null
  language: string | null
  typeId: string
  typeName: string
  typeIcon: string
  typeColor: string
  collectionName: string | null
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

interface ItemDetailDrawerProps {
  item: DrawerItem | null
  open: boolean
  onClose: () => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ItemDetailDrawer({ item, open, onClose }: ItemDetailDrawerProps) {
  if (!item) return null

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col gap-0 p-0 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b px-5 pt-5 pb-4 pr-12">
          <SheetTitle className="text-base font-semibold leading-tight">{item.title}</SheetTitle>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${item.typeColor}20`, color: item.typeColor }}
            >
              {ICON_MAP[item.typeIcon]}
              {item.typeName}
            </span>
            {item.language && (
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {item.language}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 border-b px-4 py-2">
          <Button variant="ghost" size="sm" className={`gap-1.5 text-xs ${item.isFavorite ? 'text-yellow-400' : 'text-muted-foreground'}`}>
            <Star className={`h-3.5 w-3.5 ${item.isFavorite ? 'fill-yellow-400' : ''}`} />
            Favorite
          </Button>
          <Button variant="ghost" size="sm" className={`gap-1.5 text-xs ${item.isPinned ? 'text-foreground' : 'text-muted-foreground'}`}>
            <Pin className="h-3.5 w-3.5" />
            Pin
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
            <Copy className="h-3.5 w-3.5" />
            Copy
          </Button>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 px-5 py-5">
          {/* Description */}
          {item.description && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</p>
              <p className="text-sm text-foreground/90">{item.description}</p>
            </div>
          )}

          {/* Content */}
          {item.content && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Content</p>
              <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
                {item.content}
              </pre>
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Collections */}
          {item.collectionName && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Collections</p>
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {item.collectionName}
              </span>
            </div>
          )}

          {/* Details */}
          <div>
            <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Details</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Created</span>
                <span className="text-foreground/80">{formatDate(item.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Updated</span>
                <span className="text-foreground/80">{formatDate(item.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
