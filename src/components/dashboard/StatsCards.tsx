import { Package, FolderOpen, Star, Bookmark } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

interface StatsCardsProps {
  totalItems: number
  totalCollections: number
  favoriteItems: number
  favoriteCollections: number
}

export function StatsCards({
  totalItems,
  totalCollections,
  favoriteItems,
  favoriteCollections,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="Total Items" value={totalItems} icon={<Package className="h-4 w-4" />} />
      <StatCard label="Collections" value={totalCollections} icon={<FolderOpen className="h-4 w-4" />} />
      <StatCard label="Favorite Items" value={favoriteItems} icon={<Star className="h-4 w-4" />} />
      <StatCard label="Favorite Collections" value={favoriteCollections} icon={<Bookmark className="h-4 w-4" />} />
    </div>
  )
}
