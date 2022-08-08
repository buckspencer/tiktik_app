import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { FaGamepad, FaMedal, FaPaw } from "react-icons/fa";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";

import { Reaction } from "@charkour/react-reactions";

export const reactionEmojis = {
  reactionThumbsUp: "👍",
  reactionThumbsDown: "👎",
  reactionParty: "🎉",
  reactionSmile: "😄",
  reactionHeart: "❤️",
  reactionFrown: "😕",
};

export const selectorEmojis: Reaction[] = [
  { label: "yup", node: <div>👍</div>, key: "reactionThumbsUp" },
  { label: "nope", node: <div>👎</div>, key: "reactionThumbsDown" },
  { label: "party", node: <div>🎉</div>, key: "reactionParty" },
  { label: "smile", node: <div>😄</div>, key: "reactionSmile" },
  { label: "heart", node: <div>❤️</div>, key: "reactionHeart" },
  { label: "hmm", node: <div>😕</div>, key: "reactionFrown" },
];

export const topics = [
  {
    name: "development",
    icon: <BsCode />,
  },
  {
    name: "comedy",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "gaming",
    icon: <FaGamepad />,
  },
  {
    name: "food",
    icon: <GiCakeSlice />,
  },
  {
    name: "dance",
    icon: <GiGalaxy />,
  },
  {
    name: "beauty",
    icon: <GiLipstick />,
  },
  {
    name: "animals",
    icon: <FaPaw />,
  },
  {
    name: "sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Careers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "qowturn for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "qowturn Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
