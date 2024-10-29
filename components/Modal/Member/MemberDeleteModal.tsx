"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import SaveButton from "@/components/Button/SaveButton";
import MainInput from "@/components/Input/MainInput";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  memberData?: any;
  onClose: () => void;
}

const MemberDeleteModal = ({ memberData, onClose }: Props) => {
  const [name, setName] = useState<string>(memberData?.name || "");
  const [address, setAddress] = useState<string>(memberData?.address || "");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.category);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      if (memberData) {
        // dispatch(updateCategory({ id: memberData.id, formData: formData }));
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-80 overflow-x-auto overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-lg">
        <form onSubmit={handleUpdate}>
          <div className="p-4 text-center">
            <h1 className="text-center font-semibold text-xl">Hapus anggota?</h1>
            <p className="lowercase text-base">Anda akan menghapus anggota secara permanen</p>
          </div>
          <div className="flex justify-end items-center gap-3 py-3 px-4 ">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-400 w-fit text-gray-800 text-sm"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-400 w-fit text-gray-800 text-sm"
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberDeleteModal;
