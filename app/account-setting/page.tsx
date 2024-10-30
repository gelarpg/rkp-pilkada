"use client";
import ChangePassModal from "@/components/Modal/Auth/ChangePassModal";
import EmailEditModal from "@/components/Modal/Auth/EmailEditModal";
import UsernameEditModal from "@/components/Modal/Auth/UsernameEditModal";
import MainLayout from "@/layout/MainLayout";
import { getUser, resetUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(resetUser());
    dispatch(getUser()).unwrap();
  }, [dispatch]);
  return (
      <MainLayout>

      <div className="mt-16 lg:mx-96 lg:my-28 flex justify-center">
        <div className=" border p-2 rounded-lg space-y-2">
          <h6 className="font-semibold">Pengaturan Akun</h6>
          <div className="">
            <label htmlFor="">Username</label>
            <UsernameEditModal user={user || undefined} />
          </div>
          <div className="">
            <label htmlFor="">Email</label>
            <EmailEditModal user={user || undefined} />
          </div>
          <div className="">
            <label htmlFor="">Password</label>
            <ChangePassModal user={user || undefined} />
          </div>
        </div>
      </div>
      </MainLayout>
  );
};

export default Page;
