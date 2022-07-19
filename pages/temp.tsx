import React from "react";
import Image from "next/image";
import temp_page from "../assets/temp_page.svg";

const Temp = () => {
  return (
    <div className="grid grid-cols-1 items-center justify-between text-gray-700 xs:pl-0 lg:pl-24">
      <div className="w-full">
        <div className="w-full pl-1">
          <Image
            src={temp_page}
            alt="Page not found"
            width="300px"
            height="300px"
          />
        </div>
        <p className="text-2xl font-light">
          Sorry were still working on the <br />
          information for this page.
        </p>

        <button
          href="/"
          type="button"
          className="ml-16 mt-7 px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#F51997] active:bg-red-600 hover:bg-red-700"
        >
          back to homepage
        </button>
      </div>
    </div>
  );
};

export default Temp;
