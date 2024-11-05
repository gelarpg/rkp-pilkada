"use client";
import ChangePassModal from "@/components/Modal/Auth/ChangePassModal";
import UsernameEditModal from "@/components/Modal/Auth/ChangeUsernameModal";
import MainLayout from "@/layout/MainLayout";
import { getUser, resetUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeFullnameModal from "@/components/Modal/Auth/ChangeFullnameModal";
import { ListPulseLoader } from "@/components/Loader/MainLoader";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(resetUser());
    dispatch(getUser());
  }, [dispatch]);
  return (
    <MainLayout>
      <div className="mt-16 lg:mx-96 lg:my-28 flex justify-center">
        <div className=" border p-2 rounded-lg space-y-2">
          <h6 className="font-semibold">Pengaturan Akun</h6>
          {loading ? (
            <div className="space-y-20 py-3 w-96">
              <ListPulseLoader/>
              <ListPulseLoader/>
              <ListPulseLoader/>
            </div>
          ):(
            <>
            {user && (
              <div className="space-y-2">
                <label htmlFor="">Nama</label>
                <ChangeFullnameModal user={user} />
                <label htmlFor="">Username</label>
                <UsernameEditModal user={user} />
                <label htmlFor="">Password</label>
                <ChangePassModal user={user} />
              </div>
            )}
            
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
