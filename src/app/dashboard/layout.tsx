import { getCollections } from '@/lib/db/collections'
import { getItemTypes } from '@/lib/db/items'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [itemTypes, collections] = await Promise.all([
    getItemTypes(),
    getCollections(),
  ])

  return (
    <DashboardShell itemTypes={itemTypes} collections={collections}>
      {children}
    </DashboardShell>
  )
}
