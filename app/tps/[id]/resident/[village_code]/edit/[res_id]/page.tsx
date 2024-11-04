"use client";
import BackButton from "@/components/Button/BackButton";
import ResidentUpdateForm from "@/components/Form/Resident/ResidentUpdateForm";
import MainLayout from "@/layout/MainLayout";
import {
  getResidentId,
  resetResident,
} from "@/redux/features/resident/residentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: Promise<{
    id: number;
    village_code: number;
    res_id: number;
  }>;
}
const Page = ({ params }: Props) => {
  const [tpsId, setTpsId] = useState<number | null>(null);
  const [villageCode, setVillageCode] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { resident } = useSelector((state: RootState) => state.resident);

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { village_code } = await params;
      setVillageCode(village_code);
      const { id } = await params;
      setTpsId(id);
      const { res_id } = await params;

      dispatch(resetResident());
      dispatch(getResidentId({ id: res_id as number }));
    };
    unwrapParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // useEffect(() => {
  //   dispatch(resetResident());
  //   dispatch(getResidentId({ id: resId as number }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <MainLayout>
      <BackButton name="Kembali" />
      <h1 className="text-xl font-semibold my-4">Edit Data Pemilih Desa</h1>
      {resident && <ResidentUpdateForm resident={resident} />}
    </MainLayout>
  );
};

export default Page;
