"use client";

import React from "react";
import AOS from "aos";

export default ({ children }: Props) => {
  React.useEffect(() => {
    AOS.init({
      once: false,
    });
  }, [AOS]);

  return <React.Fragment>{children}</React.Fragment>;
};

interface Props {
  children: React.ReactNode;
}
