"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default ({ children }: Props) => (
  <NextThemesProvider attribute="class" defaultTheme="system">
    {children}
  </NextThemesProvider>
);

interface Props {
  children: React.ReactNode;
}
