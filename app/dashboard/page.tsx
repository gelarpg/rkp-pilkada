"use client"
import TpsCard from "@/components/Card/TpsCard";
import TpsCreateModal from "@/components/Modal/Tps/TpsCreateModal";
import MainLayout from "@/layout/MainLayout";
import { getUser } from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user} =
    useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MainLayout>
      <div className="flex lg:flex-row flex-col lg:justify-between  lg:items-center items-start">
        <div className="my-3">
          <h2 className="text-4xl font-semibold tracking-tight text-indigo-500">
            Selamat Datang Di SIRADA
          </h2>
          <p className="mt-1 text-lg text-gray-700">
            Sistem Rekap Data Pilkada
          </p>
        </div>
        {user?.role === 2 && <TpsCreateModal />}
        {user?.role === 4 && <TpsCreateModal />}
      </div>
      <TpsCard />
    </MainLayout>
  );
};

export default Page;
