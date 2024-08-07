import { Inter as FontSans } from 'next/font/google'
import './globals.css'

import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from '@/contexts/SessionProvider'
import { cn } from '@/lib/utils'
import { AUTH } from '@/server/auth'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

type RootLayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await AUTH.getServerSession()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background pb-4 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <SessionProvider session={session}>
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
      </body>
    </html>
  )
}
