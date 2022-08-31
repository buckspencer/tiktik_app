import React, { useEffect, useState } from "react";

import { GoVerified } from "react-icons/go";
import { IUser } from "../../types";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import useAuthStore from "../../store/authStore";

interface IProps {
  users: IUser[];
}

const Users = () => {
  const [itemsPerPage] = useState(7);
  const { allUsers } = useAuthStore();
  const [currentItems, setCurrentItems] = useState<IUser>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(3);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allUsers.length;
    setItemOffset(newOffset);
  };

  return (
    <div className=" pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        People of qowturn
      </p>
      <div>
        {currentItems?.map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-7 hover:bg-primary p-2 cursor-pointer font-semibold rounded paginationContent">
              <div className="w-12 h-12">
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
        ))}
      </div>
      <div className="flex flex-col items-center mb-8 px-4 mx-auto mt-8">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          containerClassName="font-sans flex justify-end space-x-1 select-none justify-center"
          pageClassName="page-item"
          pageLinkClassName="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:text-[#1079AC] hover:text-white"
          previousClassName="page-item"
          previousLinkClassName="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:text-[#1079AC] hover:text-white"
          nextClassName="page-item"
          nextLinkClassName="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:text-[#1079AC] hover:text-white"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Users;
