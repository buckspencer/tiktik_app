import React, { useCallback, useState } from "react";
import {
  ReactionBarSelector,
  ReactionCounter,
} from "@charkour/react-reactions";
import { reactionEmojis, selectorEmojis } from "../../utils/constants";

import { BASE_URL } from "../../utils";
import Comments from "../../components/Comments";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";

import { Video } from "../../types";
import axios from "axios";
import findKey from "lodash.findkey";
import useAuthStore from "../../store/authStore";
import without from "lodash.without";
import VideoDetail from "../../components/VideoDetail";
import NftDetail from "../../components/NftDetail";

type ReactionsObject = {
  reactionThumbsUp: string;
  reactionThumbsDown: string;
  reactionParty: string;
  reactionSmile: string;
  reactionHeart: string;
  reactionFrown: string;
};

const Detail = ({ postDetails }: IProps) => {
  const [mappedReactions, setMappedReactions] = useState([]);
  const [post, setPost] = useState(postDetails);
  const [usedReactions, setUsedReactions] = useState(Array<string>);

  const { userProfile, allUsers }: any = useAuthStore();

  useCallback(() => {
    const counterObjects = Object.keys(reactionEmojis).flatMap((reaction) => {
      return post.reactions[reaction]?.map((id: string) => ({
        node: (
          <div className="mx-1">
            {reactionEmojis[reaction as keyof ReactionsObject]}
          </div>
        ),
        label: reaction,
        by: allUsers.find(({ _id }) => _id == id)?.userName,
      }));
    });

    setMappedReactions(counterObjects.filter((e) => e) as []);
  }, [allUsers, post.reactions]);

  const reactionCounterStyle: CSS.Properties = {
    marginLeft: "5px",
    marginBottom: "2px",
  };

  const inUsedReactions = (_key: string): boolean => {
    return !usedReactions.includes(_key);
  };

  const reactionInReactions = (_key: string): boolean => {
    return !post.reactions[_key]?.includes(userProfile._id);
  };

  const addReactionToReactions = (_reaction: string): string[] => {
    return usedReactions.concat([_reaction]);
  };

  const handleAddReaction = async (reactionKey: string) => {
    if (
      userProfile &&
      reactionInReactions(reactionKey) &&
      inUsedReactions(reactionKey)
    ) {
      const { data } = await axios.put(
        `${BASE_URL}/api/postReaction/${post._id}`,
        {
          userId: userProfile._id,
          reactionKey: reactionKey,
          insert: true,
        }
      );
      setUsedReactions(addReactionToReactions(reactionKey));
      reactionsFromResponse(data);
    }
  };

  const handleRemoveReaction = async (e: Event) => {
    const reactionKey = findKey(
      reactionEmojis,
      (value) => value === (e.target as HTMLElement).innerText
    );

    if (userProfile) {
      const filtered = without(usedReactions, reactionKey);
      const { data } = await axios.put(
        `${BASE_URL}/api/postReaction/${post._id}`,
        {
          userId: userProfile._id,
          reactionKey: reactionKey,
          insert: false,
        }
      );

      setUsedReactions(filtered as []);
      reactionsFromResponse(data);
    }
  };

  const reactionsFromResponse = (response: any) => {
    const counterObjects = Object.keys(reactionEmojis).flatMap(
      (reactionEmoji: string) => {
        return response[reactionEmoji]?.map((reaction: ReactionsObject) => ({
          node: (
            <div className="mx-1">
              {reactionEmojis[reactionEmoji as keyof ReactionsObject]}
            </div>
          ),
          label: "smile",
          by: allUsers.find(({ _id }) => _id == reaction._ref)?.userName,
        }));
      }
    );
    setMappedReactions(counterObjects.filter((e) => e) as []);
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      {post.type === "video" ? (
        <VideoDetail url={post.video.asset.url} />
      ) : (
        <NftDetail url={post.video.asset.url} />
      )}

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

          <p className="px-10 text-lg text-gray-600 mt-3 mb-5">
            {post.caption}
          </p>
          <div className="group justify-start">
            <div className="ml-2 mb-1 hidden group-hover:block">
              <ReactionBarSelector
                reactions={selectorEmojis}
                onSelect={handleAddReaction}
              />
            </div>
            <ReactionCounter
              reactions={mappedReactions}
              onClick={handleRemoveReaction}
              user={userProfile.userName}
              style={reactionCounterStyle}
            />
          </div>
          <Comments parentComments={post.comments} postId={post._id} />
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
function key(key: any) {
  throw new Error("Function not implemented.");
}
