import { GeistSans } from "geist/font/sans";

import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Head from "@/components/head";
import SessionProvider from "@/context/session";
import QueryClientProvider from "@/context/query";
import { Toaster } from "@/components/ui/toaster";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body className={GeistSans.className}>
        <SessionProvider>
          <QueryClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
