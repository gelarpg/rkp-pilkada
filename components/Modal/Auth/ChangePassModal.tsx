"use client";
import SaveButton from "@/components/Button/SaveButton";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { BsArrowLeft } from "react-icons/bs";
import ProcessingButton from "@/components/Button/ProcessingButton";
import { User } from "@/lib/types/userType";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ListPulseLoader } from "@/components/Loader/MainLoader";
import { RxLockClosed } from "react-icons/rx";
import { changePassword } from "@/redux/features/user/userSlice";

interface Props {
  user?: User;
}
const ChangePassModal = ({ user }: Props) => {
  const [currentPass, setCurrentPass] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [visibleCurrentPass, setVisibleCurrentPass] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfrm, setVisiblePassConfrm] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, message, code } = useSelector(
    (state: RootState) => state.user
  );

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("current_password", currentPass);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
      const res = (await dispatch(
        changePassword({ formData, id: user?.id as number })
      )) as { payload: any };
      if (code === 422) {
        setModal(true); // Pastikan modal tetap terbuka saat error validasi
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = () => {
    setModal(!modal);
  };
  useEffect(() => {
    if (code === 422) {
      setModal(true); // Pastikan modal tetap terbuka saat error validasi
    }
  }, [code, message, router, user]);

  return (
    <>
      <div className="w-96 relative p-2 shadow-none rounded-xl border-[1.5px] border-stroke">
        <button
          type="button"
          onClick={handleChange}
          className="w-full  bg-white peer py-2 ps-6 block font-normal text-start text-md outline-none transition text-gray-700 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
        >
          {user ? (
            <>**********</>
          ) : (
            <div className="w-full py-2 px-6">
              <ListPulseLoader />
            </div>
          )}
        </button>
        <div className="absolute top-5">
          <RxLockClosed size={20} />
        </div>
      </div>
      {modal && (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900/15 bg-opacity-10 ">
          <div className=" opacity-100 duration-500 mt-0 ease-out transition-all sm:max-w-lg  sm:w-full sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full flex flex-col bg-white border shadow-sm lg:rounded-xl pointer-events-auto h-screen lg:h-1/2">
              <form onSubmit={handleUpdate}>
                <div className="flex justify-between items-center py-3 px-4 border-b">
                  <button
                    type="button"
                    onClick={handleChange}
                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
                  >
                    <span className="sr-only">Close</span>
                    <BsArrowLeft size={20} />
                  </button>
                  {loading ? (
                    <div className="w-fit">
                      <ProcessingButton name="memperbaharui..." />
                    </div>
                  ) : (
                    <div className="w-24">
                      <SaveButton name="perbaharui" />
                    </div>
                  )}
                </div>
                <div className="p-4 overflow-y-auto space-y-3">
                  <div className="relative ">
                    <input
                      type={visibleCurrentPass ? "text" : "password"}
                      placeholder="Kata Sandi Sebelumnya"
                      onChange={(e) => setCurrentPass(e.target.value)}
                      value={currentPass}
                      name="current_password"
                      className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-3 ps-10 block font-normal text-md outline-none transition text-gray-900 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <RxLockClosed size={20} />
                    </div>
                    {visibleCurrentPass ? (
                      <FaEye
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() =>
                          setVisibleCurrentPass(!visibleCurrentPass)
                        }
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() =>
                          setVisibleCurrentPass(!visibleCurrentPass)
                        }
                      />
                    )}
                  </div>
                  <div className="relative ">
                    <input
                      type={visiblePass ? "text" : "password"}
                      placeholder="Kata Sandi Baru"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      name="password"
                      className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-3 ps-10 block font-normal text-md outline-none transition text-gray-900 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <RxLockClosed size={20} />
                    </div>
                    {visiblePass ? (
                      <FaEye
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() => setVisiblePass(!visiblePass)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() => setVisiblePass(!visiblePass)}
                      />
                    )}
                  </div>
                  <div className="relative ">
                    <input
                      type={visiblePassConfrm ? "text" : "password"}
                      placeholder="Konfirmasi Kata sandi"
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      value={passwordConfirmation}
                      name="password_confirmation"
                      className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-3 ps-10 block font-normal text-md outline-none transition text-gray-900 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                      <RxLockClosed size={20} />
                    </div>
                    {visiblePassConfrm ? (
                      <FaEye
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() => setVisiblePassConfrm(!visiblePassConfrm)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() => setVisiblePassConfrm(!visiblePassConfrm)}
                      />
                    )}
                  </div>
                  {message && (
                    <span className="text-sm text-red-500">
                      {message.password}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassModal;
