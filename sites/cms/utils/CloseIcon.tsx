import React from "react";

const CloseIcon = ({ setActive }) => {
  return (
    <div
      onClick={() => {
        setActive && setActive(false);
      }}
      className="flex flex-col absolute top-28 right-14 bg-white rounded-full w-[30px] h-[30px] p-2 justify-center items-center cursor-pointer shadow-[0_2px_2px_rgba(0,0,0,0.25)] hover:shadow-[0_5px_5px_rgba(0,0,0,0.25)] hover:-translate-y-[1px] hover:scale-105 transition-all duration-200"
    >
      <div className=" bg-black w-[14px] h-[1px] text-black rotate-45 rounded-full"></div>
      <div className=" bg-black w-[14px] h-[1px] text-black -rotate-45 -translate-y-[1px] rounded-full"></div>
    </div>
  );
};

export default CloseIcon;
