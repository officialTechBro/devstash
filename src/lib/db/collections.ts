import { prisma } from '@/lib/prisma'

export interface CollectionWithStats {
  id: string
  name: string
  description: string | null
  isFavorite: boolean
  itemCount: number
  types: { icon: string | null; color: string | null; name: string }[]
  primaryColor: string | null
}

export async function getCollections(): Promise<CollectionWithStats[]> {
  const collections = await prisma.collection.findMany({
    include: {
      items: {
        include: {
          type: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  return collections.map((col) => {
    const itemCount = col.items.length

    // Count items per type to determine most-used
    const typeCounts = new Map<string, { count: number; type: (typeof col.items)[0]['type'] }>()
    for (const item of col.items) {
      const existing = typeCounts.get(item.typeId)
      if (existing) {
        existing.count++
      } else {
        typeCounts.set(item.typeId, { count: 1, type: item.type })
      }
    }

    const sortedTypes = [...typeCounts.values()].sort((a, b) => b.count - a.count)
    const primaryColor = sortedTypes[0]?.type.color ?? null
    const types = sortedTypes.map(({ type }) => ({
      icon: type.icon,
      color: type.color,
      name: type.name,
    }))

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount,
      types,
      primaryColor,
    }
  })
}
