import Image from "next/image";
import React from "react";

const LeftArrow = ({ max, num, setNum }) => {
  return (
    <div
      onClick={() => {
        if (num > 0) {
          setNum(num - 1);
        } else {
          setNum(max);
        }
      }}
      className="flex flex-col bg-white rounded-full w-[30px] h-[30px] p-2 justify-center items-center cursor-pointer shadow-[0_5px_5px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_8px_rgba(0,0,0,0.25)] hover:-translate-y-[1px] hover:scale-105 transition-all duration-200"
    >
      <Image
        src={"/arrow.png"}
        width={20}
        height={20}
        className=" rotate-180"
        alt="arrow icon"
      />
    </div>
  );
};

export default LeftArrow;
