import { mockItems, mockItemTypes } from '@/lib/mock-data'
import { getCollections } from '@/lib/db/collections'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { CollectionsGrid } from '@/components/dashboard/CollectionsGrid'
import { ItemRow } from '@/components/dashboard/ItemRow'

const totalItems = mockItemTypes.reduce((sum, t) => sum + t.count, 0)
const favoriteItems = mockItems.filter((i) => i.isFavorite).length

const pinnedItems = mockItems.filter((i) => i.isPinned)
const recentItems = [...mockItems]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 10)

export default async function DashboardPage() {
  const collections = await getCollections()

  const totalCollections = collections.length
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
        totalItems={totalItems}
        totalCollections={totalCollections}
        favoriteItems={favoriteItems}
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
