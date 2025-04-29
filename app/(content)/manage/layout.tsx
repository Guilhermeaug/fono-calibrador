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
    <div className="flex flex-col gap-8 p-4 lg:flex-row lg:gap-4 lg:space-x-6 lg:space-y-0 lg:p-8 max-h-[calc(100vh-64px)]">
      <aside className="flex-shrink-0 overflow-auto lg:mb-0 lg:w-48 lg:overflow-y-auto lg:overflow-x-clip xl:w-64">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
