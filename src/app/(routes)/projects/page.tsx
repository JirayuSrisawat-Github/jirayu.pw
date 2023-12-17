import { Link } from "@nextui-org/link";
import NextLink from "next/link";

const projects = [
  {
    title: {
      label: "จิรายุ ศรีสวัสดิ์",
      href: "https://jirayu.pw",
    },
    from: "12 Dec 2023",
    to: "Present",
    description: "เว็บไซต์สะสมผลงานของ จิรายุ ศรีสวัสดิ์",
  },
  {
    title: {
      label: "Sakura-Client",
      href: "https://sakura.wafflestudio.xyz",
    },
    from: "9 July 2023",
    to: "Present",
    description: "บอทเล่นเพลงคุณภาพสูง จากทีม WaffleStudio",
  },
  {
    title: {
      label: "Deverment",
      href: "https://discord.gg/ctaCUCMEfW",
    },
    from: "6 Dec 2023",
    to: "Present",
    description:
      "เซิร์ฟเวอร์มายคราฟเอาชีวิตรอดพร้อมระบบต่างๆมากมาย จากทีม WaffleStudio",
  },
  {
    title: {
      label: "Maki Service Shop",
      href: "https://maki-service.xyz",
    },
    from: "19 Nov 2023",
    to: "Present",
    description:
      "บริการ hosting cloud vps, dedicated server, docker container ราคาแพง",
  },
];

export default () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((item, index) => (
        <div className="shadow m-2 p-6 rounded-xl bg-white/5" key={index}>
          <Link
            isExternal
            showAnchorIcon
            as={NextLink}
            href={item.title.href}
            className="font-bold"
          >
            {item.title.label}
          </Link>
          <p>
            {item.from} - {item.to}
          </p>
          <p className="mt-2 text-slate-500">{item.description}</p>
        </div>
      ))}
    </div>
  </>
);
