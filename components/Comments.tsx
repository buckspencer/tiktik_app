import React, { Dispatch, SetStateAction } from "react";

import { GoVerified } from "react-icons/go";
import { IUser } from "../types";
import Image from "next/image";
import Link from "next/link";
import NoResults from "./NoResults";
import useAuthStore from "../store/authStore";

interface IProps {
	isPostingComment: Boolean;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
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
}: IProps) => {
	const { userProfile, allUsers }: any = useAuthStore();

	return (
		<div className="px-10 lg:pb-0 pt-3 pb-[100px]">
			<div className="overflow-scroll">
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

			{userProfile && (
				<div className="absolute bottom-0 left-7 pb-6">
					<form onSubmit={addComment} className="flex gap-4">
						<input
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Add a comment..."
							className="bg-primary py-2 text-md font-medium border-2 w-[350px] md:w-[400px] lg:w-[400px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
						/>
						<button className="text-md text-gray-400" onClick={addComment}>
							{isPostingComment ? "Commenting..." : "Comment"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Comments;
