import { AUTH } from '@/server/auth'
import { STRAPI } from '@/server/strapi'
import { redirect } from 'next/navigation'
import { SidebarNav } from './components/sidebar-nav'

interface SettingsLayoutProps {
  children: React.ReactNode
}

const defaultNavItems = [
  {
    title: 'Criar nova turma',
    href: '/manage/add',
  },
]

async function getGroups(userId: number, jwt: string) {
  const groups = await STRAPI.getTeachersGroups({ userId, jwt })
  return [
    ...defaultNavItems,
    ...groups.map((group) => ({
      title: group.name,
      href: `/manage/${group.id}`,
    })),
  ]
}

export default async function ManageLayout({ children }: SettingsLayoutProps) {
  const userInfo = await AUTH.getCurrentUser()
  if (!userInfo) {
    redirect('/login')
  }

  const sidebarNavItems = await getGroups(userInfo.id, userInfo.jwt)

  return (
    <div className="space-y-6 p-3 md:p-6 lg:p-8">
      <div className="flex max-h-[calc(100vh-64px)] flex-col space-y-8 lg:flex-row lg:gap-4 lg:space-y-0">
        <aside className="flex-shrink-0 lg:h-[calc(100vh-150px)] overflow-y-auto lg:mb-0 lg:w-48 xl:w-64">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
