import MemberCreateModal from "@/components/Modal/Member/MemberCreateModal";
import MemberTable from "@/components/Table/MemberTable";
import MainLayout from "@/layout/MainLayout";
import React from "react";

const users = [
  {
    id: 1,
    fullname: "Gelar Panca",
    username: "panca",
    peran_id: 1,
  },
  {
    id: 2,
    fullname: "Ahmad Ahmudin",
    username: "mudin",
    peran_id: 2,
  },
];
const Page = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center gap-2 mb-3">
        <h1 className="text-xl font-semibold">Daftar Anggota</h1>
        <MemberCreateModal />
      </div>
      <div className="overflow-scroll">
        <MemberTable users={users} userSearch={[]} />
      </div>
    </MainLayout>
  );
};

export default Page;
