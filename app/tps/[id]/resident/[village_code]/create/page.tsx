"use client";
import BackButton from "@/components/Button/BackButton";
import ResidentCreateForm from "@/components/Form/Resident/ResidentCreateForm";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: number; 
    village_code: number;
  }>;
}

const Page = ({ params }: Props) => {
  const [tpsId, setTpsId] = useState<number | null>(null);
  const [villageCode, setVillageCode] = useState<number | null>(null);

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { village_code } = await params;
      setVillageCode(village_code);
      const { id } = await params;
      setTpsId(id);
    };
    unwrapParams();
  }, [params]);
  return (
    <MainLayout>
      <BackButton name="kembali" />
      <h1 className="text-xl font-semibold my-4">Tambah Data Pemilih Desa</h1>
      <ResidentCreateForm villageCode={villageCode || undefined} id={tpsId || undefined}/>
    </MainLayout>
  );
};

export default Page;
