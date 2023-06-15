import config from "@/config/aboutme";

export default function AboutMe() {
  return (
    <>
      <div className="container mx-auto pb-16">
        <div className="bg-[url(/banner.png)] bg-center bg-cover rounded object-fit my-2 mx-auto w-[95%]">
          <div className="backdrop-blur-sm w-full h-full p-6">
            <h1 className="text-4xl font-bold mx-4 mt-4 mb-1 cursor-text text-[#ffa42d]">
              About me
            </h1>
            <p className="mx-8 mb-4 text-xl cursor-text">เกี่ยวกับฉัน</p>
          </div>
        </div>
        {config.map((data, i) => (
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
