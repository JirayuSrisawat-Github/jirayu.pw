import config from "@/config/aboutme";
import React from "react";

export default () => (
  <React.Fragment>
    <div className="container mx-auto pb-16">
      <h1
        className="text-4xl font-bold mx-4 mt-4 mb-1 cursor-text text-[#ffa42d]"
        data-aos="fade-right"
        data-aos-delay="0"
      >
        About me
      </h1>
      <p
        className="mx-8 mb-4 text-xl cursor-text"
        data-aos="fade-right"
        data-aos-delay="50"
      >
        เกี่ยวกับฉัน
      </p>
      {config.map((data, i) => (
        <div data-aos="fade-down" data-aos-delay={`${i * 50}`} key={i}>
          <div className="shadow-lg cursor-pointer transition rounded mx-auto p-4 my-1 w-[95%] bg-[#1f1f1f] scale-[0.98] hover:bg-[#ffa42d] hover:scale-[1]">
            <label htmlFor={data.label}>{data.label}</label>
            <p id={data.label} className="mx-2">
              {data.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </React.Fragment>
);
