import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { AUTH } from "@/server/auth";
import { SessionProvider } from "@/contexts/SessionProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await AUTH.getServerSession();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background pb-4 font-sans antialiased",
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
  );
}
