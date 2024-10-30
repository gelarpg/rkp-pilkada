"use client";
import { AppDispatch, RootState } from "@/redux/store";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  resident?: any;
  onClose: () => void;
}

const ResidentDeleteModal = ({ resident, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.category);

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (resident) {
        // dispatch(updateCategory({ id: resident.id, formData: formData }));
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-80 overflow-x-auto overflow-y-auto p-3">
      <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-md">
        <form onSubmit={handleDelete}>
          <div className="p-3">
            <h1 className="font-semibold text-xl">Hapus data pemilih ?</h1>
            <p className=" text-base">Anda akan menghapus secara permanen</p>
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

export default ResidentDeleteModal;
