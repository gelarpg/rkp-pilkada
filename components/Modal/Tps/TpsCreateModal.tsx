"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import InputWithIcon from "@/components/Input/InputWithIcon";
import MainInput from "@/components/Input/MainInput";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const TpsCreateModal = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.rw);
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      // await dispatch(createRw({ formData: formData }));
      setName("");
      setAddress("");
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div className="my-2">
      <button
        type="button"
        onClick={handleChange}
        className="py-1 px-2 bg-indigo-600 text-white rounded-xl border-none"
      >
        Tambah Data TPS
      </button>

      {modal && (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-80 ">
          <div className=" opacity-100 duration-500 mt-0 ease-out transition-all sm:max-w-lg  sm:w-full sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto h-1/2">
              <form onSubmit={handleCreate}>
                <div className="flex justify-between items-center py-3 px-4 border-b">
                  <button
                    type="button"
                    onClick={handleChange}
                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
                  >
                    <span className="sr-only">Close</span>
                    <HiArrowLeft size={20}/>
                  </button>
                  <div className="">
                    {loading ? (
                      <ProcessingButton name="menambah.." />
                    ) : (
                      <button
                        type="submit"
                        className={`py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-xl text-white ${
                          name && address
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "bg-slate-400 cursor-not-allowed"
                        }`}
                        disabled={!name && !address}
                      >
                        Tambah
                      </button>
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
        </div>
      )}
    </div>
  );
};

export default TpsCreateModal;
