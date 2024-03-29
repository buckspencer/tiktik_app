import { AiFillHome, AiOutlineMenu, AiOutlineRobot } from "react-icons/ai";
import React, { useState } from "react";

import Discover from "./Discover";
import Footer from "./Footer";
import GoogleLogin from "react-google-login";
import { ImCancelCircle } from "react-icons/im";
import Link from "next/link";
import { NextPage } from "next";
import SuggestedAccounts from "./SuggestedAccounts";
import { useRouter } from "next/router";

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const userProfile = false;

	const normalLink =
		"flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#1079AC] rounded";

	return (
		<div>
			<div
				className="block xl:hidden m-2 ml-4 mt-3 text-xl"
				onClick={() => setShowSidebar((prev) => !prev)}
			>
				{showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</div>
			{showSidebar && (
				<div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
					<div className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<div className={normalLink}>
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="text-xl hidden xl:block">Your feed</span>
							</div>
						</Link>
						<Link href="/users">
							<div className={normalLink}>
								<p className="text-2xl">
									<AiOutlineRobot />
								</p>
								<span className="text-xl hidden xl:block">Users</span>
							</div>
						</Link>
					</div>
					<Discover />
					<SuggestedAccounts />
					<Footer />
				</div>
			)}
		</div>
	);
};

export default Sidebar;
