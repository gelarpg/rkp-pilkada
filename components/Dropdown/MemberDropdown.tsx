"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import MemberUpdateModal from "../Modal/Member/MemberUpdateModal";
import MemberDeleteModal from "../Modal/Member/MemberDeleteModal";

interface Props {
  memberData?: any;
}
const MemberDropdown = ({ memberData }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const toggleModalDelete = () => {
    setOpenDelete(!openDelete);
  };
  const toggleModalUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md ">
          <HiDotsVertical
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className=" px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex justify-start items-center gap-2 w-full"
              onClick={toggleModalUpdate}
            >
              <BiEdit size={20} />
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className=" px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex justify-start items-center gap-2 w-full"
              onClick={toggleModalDelete}
            >
              <BiTrash size={20} />
              Hapus
            </button>
          </MenuItem>
        </div>
      </MenuItems>
      {openUpdate && (
        <MemberUpdateModal
          memberData={memberData}
          onClose={toggleModalUpdate}
        />
      )}
      {openDelete && (
        <MemberDeleteModal
          memberData={memberData}
          onClose={toggleModalDelete}
        />
      )}
    </Menu>
  );
};

export default MemberDropdown;
