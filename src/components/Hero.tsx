"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-gradient-to-br flex flex-col justify-center items-center w-full h-[45vh] from-[#ff35d5] to-[#a435ff]">
      <Image
        src="/profile.png"
        alt="Jirayu.pw Logo"
        className="rounded-full transition cursor-pointer scale-[0.9] hover:scale-[1]"
        priority={true}
        width={128}
        height={128}
      />
      <h1 className="my-2 text-2xl cursor-text">Jirayu Srisawat</h1>
      <p className="mt-2 text-xl cursor-text">จิรายุ ศรีสวัสดิ์</p>
    </div>
  );
}
