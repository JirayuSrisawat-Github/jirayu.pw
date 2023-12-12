"use client";

import AOS from "./AOS";
import NextThemesProvider from "./NextThemesProvider";
import NextUIProvider from "./NextUIProvider";

export default ({ children }: Props) => (
  <AOS>
    <NextUIProvider>
      <NextThemesProvider>{children}</NextThemesProvider>
    </NextUIProvider>
  </AOS>
);

interface Props {
  children: React.ReactNode;
}
