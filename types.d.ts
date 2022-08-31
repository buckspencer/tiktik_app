export interface Video {
  _id: string;
  userId: string;
  caption: string;
  type: string;
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  reactions: {
    reactionThumbsUp: array;
    reactionThumbsDown: array;
    reactionSmile: array;
    reactionParty: array;
    reactionFrown: array;
    reactionHeart: array;
  }[];
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}
