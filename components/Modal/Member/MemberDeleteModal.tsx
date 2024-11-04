"use client";
import { deleteUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  memberData?: any;
  onClose: () => void;
}

const MemberDeleteModal = ({ memberData, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleDelete = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (memberData) {
        dispatch(deleteUser({ user_id: memberData.id }));
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
            <h1 className="font-semibold text-xl">Hapus anggota ?</h1>
            <p className="text-base">
              Anda akan menghapus anggota secara permanen
            </p>
          </div>
          <div className="flex justify-end items-center gap-3 py-3 px-4 ">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-200 w-fit text-gray-800 text-sm"
            >
              Batal
            </button>
            {loading ? (
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-400 w-fit text-gray-800 text-sm"
                disabled
              >
                <span className="loading"></span>Menghapus...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-200 w-fit text-gray-800 text-sm"
              >
                Hapus
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberDeleteModal;
