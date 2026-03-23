import { Star, Pin, Code2, Sparkles, Terminal, FileText, File, Image, Link } from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  'code-2': <Code2 className="h-3.5 w-3.5" />,
  'sparkles': <Sparkles className="h-3.5 w-3.5" />,
  'terminal': <Terminal className="h-3.5 w-3.5" />,
  'file-text': <FileText className="h-3.5 w-3.5" />,
  'file': <File className="h-3.5 w-3.5" />,
  'image': <Image className="h-3.5 w-3.5" />,
  'link': <Link className="h-3.5 w-3.5" />,
}

const TYPE_ICON_MAP: Record<string, { icon: string; color: string }> = {
  type_snippet: { icon: 'code-2', color: '#3b82f6' },
  type_prompt: { icon: 'sparkles', color: '#a855f7' },
  type_command: { icon: 'terminal', color: '#f59e0b' },
  type_note: { icon: 'file-text', color: '#22c55e' },
  type_file: { icon: 'file', color: '#64748b' },
  type_image: { icon: 'image', color: '#ec4899' },
  type_url: { icon: 'link', color: '#06b6d4' },
}

interface Item {
  id: string
  title: string
  description: string
  typeId: string
  tags: string[]
  isFavorite: boolean
  isPinned: boolean
  createdAt: string
}

interface ItemRowProps {
  item: Item
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ItemRow({ item }: ItemRowProps) {
  const typeInfo = TYPE_ICON_MAP[item.typeId]

  return (
    <div className="group flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-card/80 cursor-pointer transition-colors">
      {/* Type icon */}
      <div
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: typeInfo ? `${typeInfo.color}20` : '#64748b20', color: typeInfo?.color ?? '#64748b' }}
      >
        {typeInfo ? ICON_MAP[typeInfo.icon] : <File className="h-3.5 w-3.5" />}
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
  )
}
