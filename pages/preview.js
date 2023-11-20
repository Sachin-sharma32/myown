import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "../sites/cms/utils/CloseIcon";
const Preview = ({
  active,
  setActive,
  title,
  tags,
  selectedCategory,
  image,
  content,
}) => {
  const [showLinks, setShowLinks] = useState(false);
  const postCentent = content
    ?.replaceAll("<h1>", '<h1 class="text-2xl font-poppins font-bold mb-0">')
    .replaceAll("<h2>", '<h2 class="text-xl font-poppins font-bold mb-0">')
    .replaceAll("<h3>", '<h3 class="text-3xl font-poppins font-bold mb-0">')
    .replaceAll("<h4>", '<h4 class="text-2xl font-poppins font-bold mb-0">')
    .replaceAll("<h5>", '<h5 class="text-xl font-poppins font-bold mb-0">')
    .replaceAll("<h6>", '<h6 class="text-lg font-poppins font-bold mb-0">')
    .replaceAll("<ul>", '<ul class="list-disc font-poppins font-normal">')
    .replaceAll("<ol>", '<ol class="list-decimal font-poppins font-normal">')
    .replaceAll("<ul>", "<ul font-poppins>")
    .replaceAll("<li>", '<li class="mb-0 font-poppins">')
    .replaceAll(
      "<pre",
      '<pre class="bg-gray-100 p-4 rounded-md text-black overflow-scroll max-w-[500px] max-h-[300;x] mb-0 m-auto font-poppins'
    )
    .replaceAll("<img", "<img class='h-[300px] m-auto w-[500px] mb-0'")
    .replaceAll(
      "<blockquote font-poppins>",
      '<blockquote class="p-4 pl-2 h-fit border-l-4 border-orange-500 bg-orange-100 text-gray-500 rounded-lg font-bold mb-0 text-center quote font-poppins">'
    )
    .replaceAll(
      "<a",
      '<a class="text-blue-500 hover:border-b pb-1 font-poppins"'
    )
    .replaceAll("<p>", '<p class="mb-0 font-normal font-poppins">');

  return (
    <div
      className={`pb-20 absolute min-h-full max-h-fit top-0 bg-black left-0 bg-opacity-95 w-full ${
        active
          ? "opacity-100"
          : "opacity-0 pointer-events-none max-h-0 overflow-hidden"
      } transition-all duration-300`}
    >
      <div className="flex justify-center w-[60%] mx-auto mt-32 bg-white">
        <CloseIcon setActive={setActive} />
        <div className=" font-apercuLight  py-20 flex flex-col items-center relative justify-center gap-14 text-black w-[70%]">
          <p>{Date.now().toString()}</p>
          <div className="relative">
            <p className=" text-7xl font-apercuBold uppercase ">{title}</p>
            <p className=" absolute -top-4 -right-[100px] font-bold text-[#fb8500]">
              {selectedCategory.name}
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <Image
              className="w-full h-[500px] rounded-xl"
              src={image}
              width={1000}
              height={1000}
            />
            {/* <ul className="flex gap-4 uppercase w-fit items-center self-end">
              {tags.map((tag) => (
                <p className="">{tag}</p>
              ))}
            </ul> */}
          </div>
          <div
            className="leading-[1.9] p-4 sm:p-0 text-xl"
            dangerouslySetInnerHTML={{
              __html: postCentent,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
