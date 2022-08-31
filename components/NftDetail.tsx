import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import React from "react";
import router from "next/router";

const VideoDetail = ({ url }: IProps) => {
  return (
    <>
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative pt-40">
          <div className="lg:h-[100vh] h-[60vh]">
            <div className="w-300 h-300 border-spacing-1 bg-white">
              <Image
                width={300}
                height={300}
                className=""
                src={url}
                alt="custom nft"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface IProps {
  url: string;
}

export default VideoDetail;
