import "@/styles/tailwind.css";
import "aos/dist/aos.css";
import AOS from "@/components/AOS";
import React from "react";
import { Anuphan } from "next/font/google";

const anuphan = Anuphan({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jirayu.pw",
  description: "Jirayu.pw | Introduce myself",
};

export default ({ children }: Props) => (
  <React.Fragment>
    <html lang="th">
      <head>
        <link rel="shortcut icon" type="image/png" href="/profile.png" />
      </head>
      <body
        className="bg-gradient-to-tr from-zinc-950 to-zinc-900 text-white w-full h-full box-border select-none scroll-smooth m-0 p-0 "
        style={anuphan.style}
      >
        <AOS>{children}</AOS>
      </body>
    </html>
  </React.Fragment>
);

interface Props {
  children: React.ReactNode;
}
