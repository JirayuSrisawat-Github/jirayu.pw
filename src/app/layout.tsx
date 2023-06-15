import "@/styles/tailwind.css";

import { Mitr } from "next/font/google";

const mitr = Mitr({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jirayu.pw",
  description: "Jirayu.pw | Introduce myself",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="th">
      <head>
        <link rel="shortcut icon" type="image/png" href="/profile.png" />
      </head>
      <body
        className={
          "bg-gradient-to-tr from-zinc-950 to-zinc-900 text-white w-full h-full box-border select-none scroll-smooth m-0 p-0 " +
          mitr.className
        }
      >
        {children}
      </body>
    </html>
  );
}

interface RootLayoutProps {
  children: React.ReactNode;
}
