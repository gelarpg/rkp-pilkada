"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import SaveButton from "@/components/Button/SaveButton";
import MainInput from "@/components/Input/MainInput";
import { Profession } from "@/lib/types/professionType";
import { updateProfession } from "@/redux/features/profession/professionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  profession?: Profession;
  onClose: () => void;
}
const ProfessionUpdateModal = ({ profession, onClose }: Props) => {
  const [name, setName] = useState<string>(profession?.name || "");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.profession);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profession) {
        dispatch(updateProfession({ id: profession.id, formData: formData }));
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
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <HiArrowLeft size={20} />
            </button>
            <div className="">
              {loading ? (
                <ProcessingButton name="memperbaharui" />
              ) : (
                <SaveButton name="perbaharui" />
              )}
            </div>
          </div>
        </form>
        <div className="p-4 overflow-y-auto space-y-3">
          <label htmlFor="">Nama pekerjaan</label>
          <MainInput
            name="name"
            type="text"
            placeholder="Masukan nama pekerjaan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionUpdateModal;
