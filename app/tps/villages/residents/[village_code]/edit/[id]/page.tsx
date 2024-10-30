"use client";
import BackButton from "@/components/Button/BackButton";
import ResidentUpdateForm from "@/components/Form/Resident/ResidentUpdateForm";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: number;
  }>;
}
const Page = ({ params }: Props) => {
  const [residentId, setResidentId] = useState<number | null>(null);

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { id } = await params;
      setResidentId(id);
    };
    unwrapParams();
  }, [params]);
  return (
    <MainLayout>
      <BackButton name="Kembali" />
      <h1 className="text-xl font-semibold my-4">Edit Data Pemilih Desa</h1>
      <ResidentUpdateForm resident={{}} />
    </MainLayout>
  );
};

export default Page;
