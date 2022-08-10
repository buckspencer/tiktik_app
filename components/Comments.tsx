import React, { Dispatch, SetStateAction, useState } from "react";

import CommentModal from "./CommentModal";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";
import Image from "next/image";
import Link from "next/link";
import NoResults from "./NoResults";
import useAuthStore from "../store/authStore";

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
  showModal,
  setShowModal,
}: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <>
      <div className=" lg:pb-0 pt-2 pb-[100px]">
        {userProfile && (
          <div className="float-left pl-5">
            <CommentModal
              addComment={addComment}
              comment={comment}
              isPostingComment={isPostingComment}
              setComment={setComment}
              showModal={showModal}
              setShowModal={setShowModal}
              comments={[]}
            />
          </div>
        )}

        <div className="overflow-scroll mt-8">
          {comments?.length > 0 ? (
            comments?.map((item: IComment, idx: number) => (
              <>
                {allUsers?.map(
                  (user: IUser) =>
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className="p-2 items-center" key={idx}>
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8">
                              <Image
                                src={user.image}
                                width={34}
                                height={34}
                                className="rounded-full"
                                alt="user profile"
                                layout="responsive"
                              />
                            </div>
                            <div className="xl:block">
                              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                {user.userName.replaceAll(" ", "")}
                                <GoVerified className="text-blue-400" />
                              </p>
                              <p className="capitalize text-gray-400 text-xs">
                                {user.userName}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="mt-3">
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            ))
          ) : (
            <NoResults text="No comments yet!" />
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
