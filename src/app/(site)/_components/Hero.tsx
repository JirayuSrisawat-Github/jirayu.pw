import Image from "next/image";
import React from "react";

export default () => (
  <React.Fragment>
    <div className="bg-hero bg-cover bg-no-repeat bg-top flex flex-col justify-center items-center w-full min-h-[75vh]">
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
        className="text-4xl sm:text-6xl md:text-8xl py-0 sm:py-4 font-bold text-transparent bg-clip-text w-fit bg-top bg-hero bg-cover drop-shadow-md"
        data-aos="fade-down"
        data-aos-delay="50"
      >
        Jirayu Srisawat
      </h1>
      <p
        className="mt-2 text-xl cursor-text !text-white"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        จิรายุ ศรีสวัสดิ์
      </p>
    </div>
  </React.Fragment>
);
