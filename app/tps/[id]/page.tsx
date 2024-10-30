"use client";
import ResidentTable from "@/components/Table/ResidentTable";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

const residents = [
  {
    id: 1,
    nik: 326912716271,
    fullname: "Gelar Panca",
    gender: "laki-laki",
    village_code:320912373,
    tps_id: 2
  },
  {
    id: 2,
    nik: 326912700221,
    fullname: "Santi Syusanti",
    gender: "perempuan",
    village_code:320912373,
    tps_id: 2
  },
];
const Page = ({ params }: Props) => {
  const [tpsId, setTpsId] = useState<number | null>(null);
  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { id } = await params;
      setTpsId(id);
    };
    unwrapParams();
  }, [params]);
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold text-gray-800">Daftar Pemilih di TPS {tpsId}</h1>
      <ResidentTable residents={residents} residentSearch={[]}/>
    </MainLayout>
  );
};

export default Page;
