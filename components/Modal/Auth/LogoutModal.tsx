"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutModal = () => {
  const [modal, setModal] = useState(false);
  const route = useRouter();  
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/logout`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const response = await res.json();
      if (response.code === 200) {
        localStorage.removeItem("access_token");
        window.location.href = '/'
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={handleChange}
        className=" px-4 py-2 w-full text-sm text-gray-700 data-[focus]:bg-gray-100 flex justify-start items-center gap-2 hover:bg-gray-200"
      >
        <IoLogOutOutline size={20} />
        Keluar
      </button>

      {modal && (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-80 p-3">
          <div className=" opacity-100 duration-500 mt-0 ease-out transition-all sm:max-w-lg  sm:w-full sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto h-1/2">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3 className="font-bold text-gray-800">Keluar aplikasi</h3>
              </div>
              <form onSubmit={handleLogout}>
                <div className="p-4 overflow-y-auto">
                  <h5>Anda yakin keluar dari aplikasi ?</h5>
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4">
                  <button
                    type="button"
                    onClick={handleChange}
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
                      <span className="loading"></span>Keluar...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex flex-shrink-0 justify-center items-center p-2 rounded-lg bg-gray-200 w-fit text-gray-800 text-sm"
                    >
                      Keluar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;
