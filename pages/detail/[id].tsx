import { GithubCounter, GithubSelector } from "react-reactions";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import React, { useEffect, useRef, useState } from "react";
import _, { findKey } from "lodash";

import { BASE_URL } from "../../utils";
import { BsFillPlayFill } from "react-icons/bs";
import Comments from "../../components/Comments";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import LikeButton from "../../components/LikeButton";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { Video } from "../../types";
import axios from "axios";
import { reactionEmojis } from "../../utils/constants";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";

const Detail = ({ postDetails }: IProps) => {
  const [mappedReactions, setMappedReactions] = useState({});
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [style, setStyle] = useState({ display: "none" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile, allUsers }: any = useAuthStore();
  const [comment, setComment] = useState(" ");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
    updateUserReactions(post);
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      console.log(data);
      setPost({ ...post, likes: data.likes });
    }
  };

  // When emoji in selector is clicked - Adds Emojis
  const handleEmoji = async (emoji: any) => {
    const reactionKey = findKey(reactionEmojis, (value) => value === emoji);

    if (userProfile && !post.reactions[reactionKey].includes(userProfile._id)) {
      const { data } = await axios.put(
        `${BASE_URL}/api/postReaction/${post._id}`,
        {
          userId: userProfile._id,
          reactionKey: reactionKey,
          insert: true,
        }
      );
      window.location.reload();
    }
  };

  // When emoji in counter is clicked - if user has already made reaction then remove reaction
  const handleReaction = async (emoji: string) => {
    const reactionKey = findKey(reactionEmojis, (value) => value === emoji);

    if (userProfile) {
      await axios.put(`${BASE_URL}/api/postReaction/${post._id}`, {
        userId: userProfile._id,
        reactionKey: reactionKey,
        insert: false,
      });
      window.location.reload();
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  const updateUserReactions = (_post: any) => {
    const counterObjects = Object.keys(reactionEmojis).flatMap((reaction) =>
      _post.reactions[reaction]?.map((id) => ({
        emoji: reactionEmojis[reaction],
        by: allUsers.find(({ _id }) => _id == id)?.userName,
        insert: false,
      }))
    );

    setMappedReactions(counterObjects.filter((e) => e));
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-5 mt-2">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName} {` `}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-10 text-lg text-gray-600 mt-3">{post.caption}</p>

          <div className="px-10 pb-2">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <div>
            <GithubSelector onSelect={handleEmoji} />
          </div>
          <div>
            <GithubCounter
              counters={mappedReactions}
              onSelect={handleReaction}
            />
          </div>
          <hr />
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  postDetails: Video;
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: res.data,
    },
  };
};

export default Detail;
