"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import SaveButton from "@/components/Button/SaveButton";
import MainInput from "@/components/Input/MainInput";
import { AppDispatch, RootState } from "@/redux/store";
import { Listbox, Label, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  memberData?: any;
  onClose: () => void;
}
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
const MemberUpdateModal = ({ memberData, onClose }: Props) => {
  
  const [selectedProvince, setSelectedProvince] = useState(roles[0]);
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
  );
};

export default MemberUpdateModal;
