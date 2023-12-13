import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

import NextLink from "next/link";
import NextImage from "next/image";

const certificates = [
  {
    title: {
      label: "ศิลปหัตถกรรมนักเรียนครั้งที่ 71 ระดับเขต",
      href: "https://art71.vichakan.net",
    },
    from: "22 Nov 2023",
    to: "24 Nov 2023",
    image: "/certificates/sm-aya2_71.png",
  },
  {
    title: {
      label: "ศิลปหัตถกรรมนักเรียนครั้งที่ 70 ระดับชาติ",
      href: "https://central70.sillapa.net",
    },
    from: "25 Jan 2023",
    to: "27 Jan 2023",
    image: "/certificates/sm-central_70.png",
  },
  {
    title: {
      label: "ศิลปหัตถกรรมนักเรียนครั้งที่ 70 ระดับเขต",
      href: "https://central70.sillapa.net",
    },
    from: "5 Sep 2022",
    to: "9 Sep 2022",
    image: "/certificates/sm-aya2_70.png",
  },
];

export default () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {certificates.map((item, index) => (
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
          <p className="text-slate-500">
            {item.from} - {item.to}
          </p>
          <div className="flex justify-center">
          <Image
            alt="Certificate"
            className="object-cover rounded-xl"
            src={item.image}
            width={512}
            height={256}
            isBlurred
          />
        </div>
        </div>
      ))}
    </div>
  </>
);
