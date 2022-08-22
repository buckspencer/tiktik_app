import { MdAddComment, MdOutlineCancel } from "react-icons/md";
import React, { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  isProcessingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: Comment[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: Boolean;
}

export default function CommentModal({
  addComment,
  comment,
  isProcessingComment,
  setComment,
  showModal,
  setShowModal,
}: IProps) {
  return (
    <>
      <button
        className="bg-zinc-600/50 text-white active:bg-zinc-600 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
        name="Add comment"
      >
        Comment
      </button>
      {showModal || isProcessingComment ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form className="w-full max-w-xl bg-white/95 border-double border-4 border-blue-400  rounded-lg px-4 pt-2">
              <p className="cursor-pointer" onClick={() => setShowModal(false)}>
                <MdOutlineCancel className="text-black text-[35px]" />
              </p>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    type="text"
                  />
                </div>
                <div className="w-full md:w-full px-3">
                  <button
                    className="float-right bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    type="button"
                    onClick={addComment}
                  >
                    {isProcessingComment ? "Commenting..." : "Comment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}
