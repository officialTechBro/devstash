export const dynamic = 'force-dynamic'

import { getCollections } from '@/lib/db/collections'
import { getPinnedItems, getRecentItems, getItemStats } from '@/lib/db/items'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { CollectionsGrid } from '@/components/dashboard/CollectionsGrid'
import { ItemRow } from '@/components/dashboard/ItemRow'

export default async function DashboardPage() {
  const [collections, pinnedItems, recentItems, itemStats] = await Promise.all([
    getCollections(),
    getPinnedItems(),
    getRecentItems(),
    getItemStats(),
  ])

  const favoriteCollections = collections.filter((c) => c.isFavorite).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Your developer knowledge hub</p>
      </div>

      {/* Stats */}
      <StatsCards
        totalItems={itemStats.totalItems}
        totalCollections={collections.length}
        favoriteItems={itemStats.favoriteItems}
        favoriteCollections={favoriteCollections}
      />

      {/* Collections */}
      <CollectionsGrid collections={collections} />

      {/* Pinned Items */}
      {pinnedItems.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold">Pinned</h2>
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Items */}
      <section>
        <h2 className="mb-3 text-sm font-semibold">Recent Items</h2>
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
