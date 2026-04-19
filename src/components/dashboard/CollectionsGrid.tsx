import { Star, MoreHorizontal, Code2, Sparkles, Terminal, StickyNote, File, Image as ImageIcon, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CollectionWithStats } from '@/lib/db/collections'

const ICON_MAP: Record<string, React.ReactNode> = {
  'Code': <Code2 className="h-3.5 w-3.5" />,
  'Sparkles': <Sparkles className="h-3.5 w-3.5" />,
  'Terminal': <Terminal className="h-3.5 w-3.5" />,
  'StickyNote': <StickyNote className="h-3.5 w-3.5" />,
  'File': <File className="h-3.5 w-3.5" />,
  'Image': <ImageIcon className="h-3.5 w-3.5" />,
  'Link': <Link className="h-3.5 w-3.5" />,
}

interface CollectionsGridProps {
  collections: CollectionWithStats[]
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Collections</h2>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <div
            key={col.id}
            className="group relative rounded-lg border bg-card p-4 hover:bg-card/80 cursor-pointer transition-colors"
            style={{ borderColor: col.primaryColor ?? 'hsl(var(--border))' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="truncate text-sm font-medium">{col.name}</span>
                {col.isFavorite && (
                  <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Item count */}
            <p className="mt-0.5 text-xs text-muted-foreground">{col.itemCount} items</p>

            {/* Description */}
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{col.description}</p>

            {/* Type icons */}
            <div className="mt-3 flex items-center gap-1.5">
              {col.types.map((type) => (
                <span
                  key={type.name}
                  style={{ color: type.color ?? undefined }}
                  title={type.name}
                >
                  {type.icon ? (ICON_MAP[type.icon] ?? null) : null}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
