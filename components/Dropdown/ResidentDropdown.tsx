"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import ResidentDeleteModal from "../Modal/Resident/ResidentDeleteModal";

interface Props {
  resident: any;
}
const ResidentDropdown = ({ resident }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);

  const toggleModalDelete = () => {
    setOpenDelete(!openDelete);
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
            <Link
              href={`/tps/villages/residents/${resident.village_code}/edit/${resident.id}`}
              className=" px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex justify-start items-center gap-2 w-full"
            >
              <BiEdit size={20} />
              Edit
            </Link>
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
      {openDelete && (
      <ResidentDeleteModal
        resident={resident}
        onClose={toggleModalDelete}
      />
    )}
    </Menu>
  );
};

export default ResidentDropdown;
