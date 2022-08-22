import React, { useState } from "react";

import { BASE_URL } from "../utils";
import CommentModal from "./CommentModal";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import NoResults from "./NoResults";
import ShareModal from "./ShareModal";
import { VIDEO_SIZE } from "../utils/constants";
import axios from "axios";
import useAuthStore from "../store/authStore";

interface IProps {
  postId: string;
  parentComments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({ parentComments, postId }: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isProcessingComment, setIsProcessingComment] = useState(false);
  const [isProcessingShare, setIsProcessingShare] = useState(false);
  const [comments, setComments] = useState(parentComments);
  const [comment, setComment] = useState(" ");

  const addComment = async (e: any) => {
    e.preventDefault();
    setIsProcessingComment(true);
    const stopComment = comment.length < 1;

    if (stopComment) {
      setIsProcessingComment(false);
      setShowModal(false);
      return;
    }

    if (userProfile && comment) {
      const { data } = await axios.put(`${BASE_URL}/api/post/${postId}`, {
        userId: userProfile._id,
        comment,
        insert: true,
      });

      setComments(data.comments);
      setComment("");
      setShowModal(false);
      setIsProcessingComment(false);
    }
  };

  const deleteComment = async (comment: any) => {
    const { data } = await axios.put(`${BASE_URL}/api/post/${postId}`, {
      userId: userProfile._id,
      comment,
      insert: false,
    });

    setComments(data.comments);
  };

  return (
    <>
      <div className=" lg:pb-0 pt-2 pb-[100px]">
        {userProfile && (
          <div className="float-left pl-2">
            <CommentModal
              setShowModal={setShowModal}
              showModal={showModal}
              addComment={addComment}
              comment={comment}
              setComment={setComment}
              comments={[]}
              isProcessingComment={isProcessingComment}
            />
            <ShareModal
              userName={userProfile.userName}
              showShareModal={showShareModal}
              setShowShareModal={setShowShareModal}
              isProcessingShare={isProcessingShare}
            />
          </div>
        )}
      </div>
      <div className="lg:pb-0 pt-2 pb-[100px]">
        <div className="overflow-scroll mt-8">
          {comments?.length > 0 ? (
            comments?.map((item: IComment, idx: number) => (
              <>
                {allUsers?.map(
                  (user: IUser) =>
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className="p-2 items-center" key={idx}>
                        {userProfile._id ===
                          (item.postedBy._id || item.postedBy._ref) && (
                          <button
                            className="float-right cursor-pointer"
                            onClick={() => deleteComment(item)}
                          >
                            <MdOutlineCancel className="text-black" />
                          </button>
                        )}
                        <Link href={`/profile/${user._id}`}>
                          <div className="flex items-start pl-5 gap-3">
                            <div className="w-8 h-8">
                              <Image
                                src={user.image}
                                width={VIDEO_SIZE}
                                height={VIDEO_SIZE}
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
                        <div className="mt-3 pl-5">
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
