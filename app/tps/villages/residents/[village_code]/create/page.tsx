"use client";
import ResidentForm from "@/components/Form/ResidentForm";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    village_code: number;
  }>;
}

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
      <h1 className="text-xl font-semibold my-4">Tambah Data Pemilih Desa</h1>
      <ResidentForm />
    </MainLayout>
  );
};

export default Page;
