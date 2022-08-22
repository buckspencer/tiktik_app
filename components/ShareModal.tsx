import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  GabIcon,
  GabShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import React, { Dispatch, SetStateAction } from "react";

import { MdOutlineCancel } from "react-icons/md";

interface IProps {
  userName: string;
  isProcessingShare: boolean;
  showShareModal: boolean;
  setShowShareModal: Dispatch<SetStateAction<boolean>>;
}

export default function ShareModal({
  showShareModal,
  isProcessingShare,
  setShowShareModal,
  userName,
}: IProps) {
  const ICON_SIZE = 35;
  const POST_SHARE_URL = "window.location.href";
  const shareBody = `Enjoy this amazing content posted on qowturn by your friend, ${userName}`;

  return (
    <>
      <button
        className="bg-zinc-600/50 text-white active:bg-zinc-600 font-bold text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowShareModal(true)}
        name="Share post"
      >
        Share
      </button>
      {showShareModal || isProcessingShare ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form className="max-w-xl bg-white/95 border-double border-4 border-blue-400  rounded-lg px-4 pt-2">
              <p
                className="cursor-pointer"
                onClick={() => setShowShareModal(false)}
              >
                <MdOutlineCancel className="text-black text-[35px]" />
              </p>
              <div className="grid grid-rows-2 grid-flow-col gap-5 py-6 justify-center">
                <EmailShareButton
                  body={shareBody}
                  subject={"Greetings from qowturn!"}
                  url={POST_SHARE_URL}
                >
                  <EmailIcon size={ICON_SIZE} round />
                </EmailShareButton>
                <GabShareButton url={POST_SHARE_URL} title={shareBody}>
                  <GabIcon size={ICON_SIZE} round />
                </GabShareButton>
                <FacebookShareButton
                  url={POST_SHARE_URL}
                  quote={shareBody}
                  hashtag={"#ReturnToqowturn"}
                >
                  <FacebookIcon size={ICON_SIZE} round />
                </FacebookShareButton>
                <LinkedinShareButton url={POST_SHARE_URL}>
                  <LinkedinIcon size={ICON_SIZE} round />
                </LinkedinShareButton>
                <PinterestShareButton url={POST_SHARE_URL} media={"shareBody"}>
                  <PinterestIcon size={ICON_SIZE} round />
                </PinterestShareButton>
                <RedditShareButton url={POST_SHARE_URL} title={shareBody}>
                  <RedditIcon size={ICON_SIZE} round />
                </RedditShareButton>
                <TelegramShareButton url={POST_SHARE_URL} title={shareBody}>
                  <TelegramIcon size={ICON_SIZE} round />
                </TelegramShareButton>
                <TumblrShareButton url={POST_SHARE_URL} title={shareBody}>
                  <TumblrIcon size={ICON_SIZE} round />
                </TumblrShareButton>
                <TwitterShareButton url={POST_SHARE_URL} title={shareBody}>
                  <TwitterIcon size={ICON_SIZE} round />
                </TwitterShareButton>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}
