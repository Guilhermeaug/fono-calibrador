import { TypographyH2, TypographyP } from '@/components/typography'
import { Separator } from '@/components/ui/separator'
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
    <div className="container mx-auto space-y-6 p-8">
      <div className="space-y-0.5">
        <TypographyH2>Gerenciamento de turmas</TypographyH2>
        <TypographyP>Crie novas turmas e veja dados de turmas existentes.</TypographyP>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 overflow-x-auto lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
