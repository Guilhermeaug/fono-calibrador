import { Inter } from 'next/font/google'
import './globals.css'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/nav-bar/nav-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import MicrosoftClarity from '@/contexts/clarity'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { AUTH } from '@/server/auth'

type RootLayoutProps = {
  children: React.ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Calibrador Auditivo',
  description:
    'Sistema especialista feito pela Universidade Federal de Minas Gerais para melhorar o ensino de Avaliação Perceptivo da Voz e Calibração Auditiva.',
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await AUTH.getServerSession()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('base-layout', 'font-sans antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="content">{children}</div>
          <Footer />
          <Toaster richColors />
        </ThemeProvider>
        <MicrosoftClarity userId={session?.user?.id} />
      </body>
    </html>
  )
}
