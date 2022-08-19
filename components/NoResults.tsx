import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";
import React from "react";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full mt-9">
      <p className="text-5xl">
        {text === "No comments yet!" ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
