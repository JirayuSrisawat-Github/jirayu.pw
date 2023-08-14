"use client";

import Image from "next/image";
import React from "react";

export default () => (
  <React.Fragment>
    <div className="bg-gradient-to-br flex flex-col justify-center items-center w-full h-[45vh] from-[#ff35d5] to-[#a435ff]">
      <div data-aos="fade-down" data-aos-delay="0">
        <Image
          src="/profile.png"
          alt="Jirayu.pw Logo"
          className="rounded-full transition cursor-pointer scale-[0.9] hover:scale-[1]"
          width={128}
          height={128}
        />
      </div>
      <h1
        className="my-2 text-2xl cursor-text"
        data-aos="fade-down"
        data-aos-delay="50"
      >
        Jirayu Srisawat
      </h1>
      <p
        className="mt-2 text-xl cursor-text"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        จิรายุ ศรีสวัสดิ์
      </p>
    </div>
  </React.Fragment>
);
