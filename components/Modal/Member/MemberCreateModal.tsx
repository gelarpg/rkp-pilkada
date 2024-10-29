"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import MainInput from "@/components/Input/MainInput";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const roles = [
  {
    id: 1,
    name: "Koordinator Kecamatan",
  },
  {
    id: 2,
    name: "Koordinator Desa",
  },
];
const MemberCreateModal = () => {
  const [selectedProvince, setSelectedProvince] = useState(roles[0]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.rw);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      // await dispatch(createRw({ formData: formData }));
      setName("");
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
        Tambah Anggota
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
                    <HiArrowLeft size={20} />
                  </button>
                  <div className="">
                    {loading ? (
                      <ProcessingButton name="menambah.." />
                    ) : (
                      <button
                        type="submit"
                        className={`py-2 px-3 w-full capitalize gap-x-2 text-sm font-semibold rounded-full border border-transparent  text-white disabled:pointer-events-none ${
                          name
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "bg-slate-400 cursor-not-allowed"
                        }`}
                        disabled={!name}
                      >
                        Tambah
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <div className="p-4 overflow-y-auto space-y-3">
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Nama Lengkap
                  </label>
                  <MainInput
                    name="name"
                    type="text"
                    placeholder="Masukan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                   Username
                  </label>
                  <MainInput
                    name="name"
                    type="text"
                    placeholder="Masukan username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                   Password
                  </label>
                  <MainInput
                    name="name"
                    type="password"
                    placeholder="Masukan password"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                   Konfirmasi Password
                  </label>
                  <MainInput
                    name="name"
                    type="password"
                    placeholder="Masukan konfirmasi password"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="">
                  <Listbox
                    value={selectedProvince}
                    onChange={setSelectedProvince}
                  >
                    <Label className="block text-sm/6 font-medium text-gray-900">
                      Pilih Peran
                    </Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selectedProvince.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <RiArrowDropDownLine
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {roles.map((person) => (
                          <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <span className="ml-3 block truncate font-normal group-data-[selectedProvince]:font-semibold">
                                {person.name}
                              </span>
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCreateModal;
