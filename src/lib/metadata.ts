import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://jirayu.pw"),
  title: "Jirayu Srisawat | จิรายุ ศรีสวัสดิ์",
  description: "เว็บไซต์แนะนำตัวเองของจิรายุ ศรีสวัสดิ์",
  icons: [
    {
      url: "/profile.png",
      href: "/profile.png",
    },
  ],
  openGraph: {
    title: "Jirayu Srisawat",
    description: "โปรแกรมเมอร์ที่มีอายุน้อย แต่มีความรู้เยอะกว่าพ่อมึงแน่นอน",
    url: "https://jirayu.pw",
    siteName: "Jirayu.pw",
    locale: "en_US",
    type: "website",
    images: ["/background.png"],
  },
};
