"use client";
import SaveButton from "@/components/Button/SaveButton";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { BsArrowLeft } from "react-icons/bs";
import InputWithIcon from "@/components/Input/InputWithIcon";
import ProcessingButton from "@/components/Button/ProcessingButton";
import { User } from "@/lib/types/userType";
import { updateEmail } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { ListPulseLoader } from "@/components/Loader/MainLoader";
import { IoMailOpenOutline } from "react-icons/io5";

interface Props {
  user?: User;
}
const EmailEditModal = ({ user }: Props) => {
  const [email, setEmail] = useState<string | any>(user?.email);
  const [validationEmail, setValidationEmail] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { message, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const data = await dispatch(updateEmail({ formData }));
      if (data.payload.code === 422) {
        setValidationEmail(message.email);
        setModal(true);
      }
      if (data.payload.code === 200) {
        setModal(false);
        router.push(`/profile/${user?.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="w-96 relative p-2 shadow-none rounded-xl border-[1.5px] border-stroke">
        <button
          type="button"
          onClick={handleChange}
          className="w-full  bg-white peer py-2 ps-6 block font-normal text-start text-md outline-none transition text-gray-700 focus:border-primary-600 active:border-primary-600  active:bg-white disabled:cursor-default disabled:bg-white"
        >
          {user?.email ? (
            <>{user?.email}</>
          ) : (
            <div className="w-full py-2 px-6">
              <ListPulseLoader />
            </div>
          )}
        </button>
        <div className="absolute top-5">
          <IoMailOpenOutline size={20}/>
        </div>
      </div>
      {modal && (
        <div
          id="post-create"
          className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900/15 bg-opacity-10 "
        >
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
                    <div className="w-44">
                      <ProcessingButton name="memperbaharui" />
                    </div>
                  ) : (
                    <div className="w-24">
                      <SaveButton name="perbaharui" />
                    </div>
                  )}
                </div>
              </form>
              <div className="p-4 overflow-y-auto">
                <div className="relative">
                  <InputWithIcon
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disable={false}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <IoMailOpenOutline size={20}/>
                  </div>
                </div>
                {validationEmail && (
                  <span className="text-sm text-red-500">
                    {validationEmail}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailEditModal;
