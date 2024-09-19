import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import MicrosoftClarity from '@/contexts/clarity'
import { SessionProvider } from '@/contexts/SessionProvider'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Calibrador Auditivo',
  description:
    'Sistema especialista feito pela Universidade Federal de Minas Gerais para melhorar o ensino de Avaliação Perceptivo da Voz e Calibração Auditiva.',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background pb-4 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex-grow">{children}</div>
            <Footer />
            <Toaster richColors />
          </ThemeProvider>
        </SessionProvider>
        <MicrosoftClarity />
      </body>
    </html>
  )
}
