"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import SaveButton from "@/components/Button/SaveButton";
import MainInput from "@/components/Input/MainInput";
import { dataRole } from "@/lib/api/masterDataApi";
import { User } from "@/lib/types/userType";
import { updateUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Listbox,
  Label,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  memberData?: any;
  onClose: () => void;
}

const MemberUpdateModal = ({ memberData, onClose }: Props) => {
  const [email, setEmail] = useState<string>(memberData?.email || "");
  const [fullname, setFullname] = useState<string>(memberData?.fullname || "");
  const [username, setUsername] = useState<string>(memberData?.username || "");
  const [password, setPassword] = useState<string>(memberData?.password || "");
  const [confirmPassword, setConfirmPassword] = useState<string>(
    memberData?.password || ""
  );
  const [role, setRole] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>(memberData?.role || "");
  const [teamId, setTeamId] = useState<string>(memberData?.team_id.id || "");

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let roleId = e.target.value;
    setSelectedRole(roleId);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      formData.append("role", selectedRole);
      formData.append("team_id", teamId);
      if (memberData) {
        dispatch(updateUser({ id: memberData.id, formData: formData }));
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setRole(dataRole);
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-80 overflow-x-auto overflow-y-auto p-3">
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
                <button
                type="submit"
                className={`py-2 px-3 w-full capitalize gap-x-2 text-sm font-semibold rounded-full border border-transparent  text-white disabled:pointer-events-none ${
                  fullname
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
                disabled={!fullname}
              >
                Perbarui
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
              name="fullname"
              type="text"
              placeholder="Masukan nama lengkap"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
              name="username"
              type="text"
              placeholder="Masukan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              name="password"
              type="password"
              placeholder="Masukan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className=" flex flex-col items-start my-2 w-full">
            <label htmlFor="">Peran</label>
            <dd className="text-sm my-1 leading-6 text-gray-700 w-full relative">
              <select
                className="border p-4  bg-white rounded-md  text-black capitalize w-full "
                name="level"
                value={selectedRole || memberData?.role_id.id}
                onChange={handleRole}
              >
                <option value="">Pilih Level</option>
                {role.map(
                  (data, index) =>
                    index > 0 && (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    )
                )}
              </select>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberUpdateModal;
