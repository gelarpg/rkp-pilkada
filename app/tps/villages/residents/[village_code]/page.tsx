"use client";
import ResidentTable from "@/components/Table/ResidentTable";
import MainLayout from "@/layout/MainLayout";
import { getResidentList, resetResident } from "@/redux/features/resident/residentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: Promise<{
    village_code: number;
  }>;
}

const Page = ({ params }: Props) => {
  const [vilageCode, setVilageCode] = useState<number | null>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const { residents, loading, code, page, limit, hasMore } =
    useSelector((state: RootState) => state.resident);
  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { village_code } = await params;
      setVilageCode(village_code);
      dispatch(resetResident());
      dispatch(getResidentList({ villageCode: village_code as number, page, limit }));
    };
    unwrapParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Daftar Pemilih Desa</h1>
        <Link
          href={`/residents/${vilageCode}/create`}
          className="bg-indigo-500 text-white p-2 rounded-lg"
        >
          Tambah Data Pemilih
        </Link>
      </div>
      {/* <ResidentTable residents={residents} residentSearch={[]}/> */}
    </MainLayout>
  );
};

export default Page;
