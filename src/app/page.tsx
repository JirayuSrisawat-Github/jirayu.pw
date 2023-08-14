"use client";

import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Image from "next/image";
import React from "react";

export default () => (
  <React.Fragment>
    <Hero />
    <AboutMe />
      <Image
        src="/cloudflare.svg"
        alt="Cloudflare"
        className="transition mb-6 flex justify-center mx-auto hover:opacity-75"
        width={128}
        height={128}
      />
  </React.Fragment>
);
