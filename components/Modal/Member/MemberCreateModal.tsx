"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import MainInput from "@/components/Input/MainInput";
import { dataRole } from "@/lib/api/masterDataApi";
import { createUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  teamId: number;
}
const MemberCreateModal = ({ teamId }: Props) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState("");

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let roleId = e.target.value;
    setSelectedRole(roleId);
  };
  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      formData.append("role", selectedRole);
      formData.append("team_id", teamId.toString());
      await dispatch(createUser({ formData: formData }));
      setFullname("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  useEffect(() => {
    (async () => {
      setRole(dataRole);
    })();
  }, []);

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
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-80 p-3">
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
                          fullname
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "bg-slate-400 cursor-not-allowed"
                        }`}
                        disabled={!fullname}
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
                    name="name"
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
                    name="name"
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
                      value={selectedRole}
                      onChange={handleRole}
                    >
                      <option value="">Pilih Level</option>
                      {user?.role === 3 ?(
                        <>
                        {role.map(
                          (data, index) =>
                            index > 1 && (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            )
                        )}
                        </>
                      ):(
                        <>
                      {role.map(
                        (data, index) =>
                          index > 0 && (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          )
                      )}
                        </>
                      )}
                    </select>
                  </dd>
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
