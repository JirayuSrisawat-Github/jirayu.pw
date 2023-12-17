"use client";

import { NextUIProvider } from "@nextui-org/react";

export default ({ children }: Props) => (
  <NextUIProvider>{children}</NextUIProvider>
);

interface Props {
  children: React.ReactNode;
}
