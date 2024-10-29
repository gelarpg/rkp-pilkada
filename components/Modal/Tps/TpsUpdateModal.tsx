"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import SaveButton from "@/components/Button/SaveButton";
import MainInput from "@/components/Input/MainInput";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  tpsData?: any;
  onClose: () => void;
}
const TpsUpdateModal = ({ tpsData, onClose }: Props) => {
  const [name, setName] = useState<string>(tpsData?.name || "");
  const [address, setAddress] = useState<string>(tpsData?.address || "");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.category);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      if (tpsData) {
        // dispatch(updateCategory({ id: tpsData.id, formData: formData }));
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
              onClick={onClose}
              className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
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
          <div className="">
            <label htmlFor="">Nama TPS</label>
            <MainInput
              name="name"
              type="text"
              placeholder="Masukan nama TPS"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="">Alamat TPS</label>
            <MainInput
              name="address"
              type="text"
              placeholder="Masukan alamat TPS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpsUpdateModal;
