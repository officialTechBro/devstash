import { prisma } from '@/lib/prisma'

export interface ItemWithType {
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

export interface ItemStats {
  totalItems: number
  favoriteItems: number
}

function mapItem(item: {
  id: string
  title: string
  description: string | null
  content: string | null
  language: string | null
  typeId: string
  isFavorite: boolean
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
  type: { name: string; icon: string | null; color: string | null }
  collection: { name: string } | null
  tags: { tag: { name: string } }[]
}): ItemWithType {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    language: item.language,
    typeId: item.typeId,
    typeName: item.type.name,
    typeIcon: item.type.icon,
    typeColor: item.type.color,
    collectionName: item.collection?.name ?? null,
    tags: item.tags.map((t) => t.tag.name),
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }
}

const ITEM_INCLUDE = {
  type: true,
  collection: { select: { name: true } },
  tags: { include: { tag: true } },
} as const

export async function getPinnedItems(): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { isPinned: true },
    include: ITEM_INCLUDE,
    orderBy: { updatedAt: 'desc' },
  })
  return items.map(mapItem)
}

export async function getRecentItems(limit = 10): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    include: ITEM_INCLUDE,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
  return items.map(mapItem)
}

export async function getItemStats(): Promise<ItemStats> {
  const [totalItems, favoriteItems] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { isFavorite: true } }),
  ])
  return { totalItems, favoriteItems }
}

export interface SidebarItemType {
  id: string
  name: string
  icon: string | null
  color: string | null
  count: number
}

const ITEM_TYPE_ORDER = ['Snippet', 'Prompt', 'Command', 'Note', 'File', 'Image', 'URL']

export async function getItemTypes(): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: { _count: { select: { items: true } } },
  })
  return types
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      color: t.color,
      count: t._count.items,
    }))
    .sort((a, b) => {
      const ai = ITEM_TYPE_ORDER.indexOf(a.name)
      const bi = ITEM_TYPE_ORDER.indexOf(b.name)
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    })
}
