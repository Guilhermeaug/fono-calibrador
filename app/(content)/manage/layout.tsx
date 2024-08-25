import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { TypographyH2, TypographyP } from '@/components/typography'

interface SettingsLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: 'Criar nova turma',
    href: '/manage/add',
  },
  {
    title: 'Piloto',
    href: '/manage/1',
  },
]

export default function ManageLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-8 md:block">
        <div className="space-y-0.5">
          <TypographyH2>Gerenciamento de turmas</TypographyH2>
          <TypographyP>
            Crie novas turmas e veja dados de turmas existentes.
          </TypographyP>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 2xl:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
