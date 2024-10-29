"use client";
import ResidentTable from "@/components/Table/ResidentTable";
import MainLayout from "@/layout/MainLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    village_code: number;
  }>;
}
const residents = [
  {
    id: 1,
    nik: 326912716271,
    fullname: "Gelar Panca",
    gender: "laki-laki",
  },
  {
    id: 2,
    nik: 326912700892,
    fullname: "Ahmad Ahmudin",
    gender: "laki-laki",
  },
];
const Page = ({ params }: Props) => {
  const [vilageCode, setVilageCode] = useState<number | null>(null);

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { village_code } = await params;
      setVilageCode(village_code);
    };
    unwrapParams();
  }, [params]);
  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Daftar Pemilih Desa</h1>
        <Link
          href={`/tps/villages/residents/${vilageCode}/create`}
          className="bg-indigo-500 text-white p-2 rounded-lg"
        >
          Tambah Data Pemilih
        </Link>
      </div>
      <ResidentTable residents={residents} residentSearch={[]}/>
    </MainLayout>
  );
};

export default Page;
