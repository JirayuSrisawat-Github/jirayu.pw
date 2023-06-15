"use client";

import Image from "next/image";
import AboutMe from "@/config/aboutme";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br flex flex-col justify-center items-center w-full h-[45vh] from-[#ff35d5] to-[#a435ff]">
        <Image
          src="https://cdn.jirayu.pw/jirayu_logo.png"
          alt="Jirayu.pw Logo"
          className="rounded-full transition cursor-pointer scale-[0.9] hover:scale-[1]"
          priority={true}
          width={128}
          height={128}
        />
        <h1 className="my-2 text-2xl cursor-text">Jirayu Srisawat</h1>
        <p className="my-2 text-xl cursor-text">จิรายุ ศรีสวัสดิ์</p>
      </div>

      <div className="container mx-auto pb-16">
        <h1 className="text-4xl font-bold mx-4 mt-4 mb-1 cursor-text text-[#ffa42d]">
          About me
        </h1>
        <p className="mx-8 mb-4 text-xl cursor-text">เกี่ยวกับฉัน</p>
        {AboutMe.map((data, i) => (
          <div
            className="shadow-lg cursor-pointer transition rounded mx-auto p-4 my-1 w-[95%] bg-[#1f1f1f] scale-[0.98] hover:bg-[#ffa42d] hover:scale-[1]"
            key={i}
          >
            <label htmlFor={data.label}>{data.label}</label>
            <p id={data.label} className="mx-2">
              {data.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// #ffa42d
