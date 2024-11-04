"use client";
import Breadcrumb from "@/components/Breadcrum";
import ChangePassModal from "@/components/Modal/Auth/ChangePassModal";
import EmailEditModal from "@/components/Modal/Auth/EmailEditModal";
import ChangeUsernameModal from "@/components/Modal/Auth/ChangeUsernameModal";
import MainLayout from "@/layout/MainLayout";
import { getUserById, resetUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeFullnameModal from "@/components/Modal/Auth/ChangeFullnameModal";
import { resetAuth } from "@/redux/features/auth/authSlice";

interface Props{
    params:Promise<{
        id:number
        user_id:number
    }>
}
const Page = ({params}:Props) => {
  const [teamId, setTeamId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { user_id } = await params;
      setUserId(user_id);
      dispatch(resetUser());
      dispatch(resetAuth());
      dispatch(getUserById({id:user_id}));
    };
    unwrapParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params]);


  return (
    <MainLayout>
      <Breadcrumb href="users" mainPage="Daftar Pengguna" pageName="Akun Pengguna"/>
      <div className=" lg:mx-96 lg:my-16 flex justify-center">
        <div className=" border p-2 rounded-lg space-y-2">
          <h6 className="font-semibold">Pengaturan Akun</h6>
          <div className="">
            <label htmlFor="">Nama Lengkap</label>
            <ChangeFullnameModal user={user || undefined} userId={userId || undefined} />
          </div>
          <div className="">
            <label htmlFor="">Username</label>
            <ChangeUsernameModal user={user || undefined} />
          </div>
          {/* <div className="">
            <label htmlFor="">Email</label>
            <EmailEditModal user={user || undefined} />
          </div> */}
          <div className="">
            <label htmlFor="">Password</label>
            <ChangePassModal user={user || undefined} />
          </div>
          {/* <div className="">
            <label htmlFor="">Level</label>
            <ChangeLevelUpdate user={user || undefined} />
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
