import { footerList1, footerList2, footerList3 } from "../utils/constants";

import Link from "next/link";
import React from "react";

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
	<div className={`flex flex-wrap gap-2 mt-5 ${mt && "mt-5"}`}>
		{items.map((item) => (
			<Link href="/temp" as={item.replace(/\s/g, "")} key={item}>
				<p
					key={item}
					className="text-gray-400 text-sm hover:underline cursor-pointer"
				>
					{item}
				</p>
			</Link>
		))}
	</div>
);

const Footer = () => {
	return (
		<div className="mt-6 hidden xl:block">
			<List items={footerList1} mt={false} />
			<List items={footerList2} mt />
			<List items={footerList3} mt />
			<p className="text-gray-400 text-sm mt-5">2022 qowturn</p>
		</div>
	);
};

export default Footer;
