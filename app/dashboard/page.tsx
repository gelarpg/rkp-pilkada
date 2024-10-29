import TpsCard from "@/components/Card/TpsCard";
import TpsCreateModal from "@/components/Modal/Tps/TpsCreateModal";
import MainLayout from "@/layout/MainLayout";
import React from "react";

const Page = () => {
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
      <TpsCreateModal />
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        <TpsCard />
      </div>
    </MainLayout>
  );
};

export default Page;
