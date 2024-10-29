"use client";
import Breadcrumb from "@/components/Breadcrum";
import { TableLoader } from "@/components/Loader/MainLoader";
import DistrictTable from "@/components/Table/DistrictTable";
import MainLayout from "@/layout/MainLayout";
import {
  getDistricts,
  getSearchDistrict,
  resetDistrict,
} from "@/redux/features/address/districtSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: Promise<{
    prov_code: number;
  }>;
}
const Page = ({ params }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResult, districts, code, loading } = useSelector(
    (state: RootState) => state.district
  );
  const [query, setQuery] = useState("");
  const [provCode, setProvCode] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { prov_code } = await params;
      setProvCode(prov_code);
      dispatch(resetDistrict());
      dispatch(getDistricts({ provCode: prov_code }));
    };
    unwrapParams();
  }, [dispatch, params]);

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (query.trim() && provCode) {
      dispatch(resetDistrict());
      dispatch(getSearchDistrict({ provCode, name: query }));
    }
  };

  const handleRefresh = (e: SyntheticEvent) => {
    e.preventDefault();
    if (provCode) {
      dispatch(resetDistrict());
      dispatch(getDistricts({ provCode }));
      router.refresh();
      setQuery("");
    }
  };

  return (
    <MainLayout>
      <Breadcrumb href="tps" mainPage="Provinsi" pageName="Kabupaten/Kota" />
      <div className="relative mt-2">
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Cari kabupaten disini"
          className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-2 ps-4 block font-normal text-md outline-none transition text-gray-900 focus:border-indigo-600 active:border-indigo-600  active:bg-white disabled:cursor-default disabled:bg-white"
        />
        <button
          onClick={handleSearch}
          className="px-2 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-600 text-white absolute top-1 right-1 flex justify-center items-center"
        >
          Cari
        </button>
      </div>
      <div className="overflow-x-scroll">
        {loading && districts.length === 0 ? (
          <div className="mt-4">
            <TableLoader />
          </div>
        ) : (
          <>
            {searchResult.length > 0 && (
              <div className="flex items-center justify-start gap-2 my-2">
                <button
                  onClick={handleRefresh}
                  className="px-2 py-1 text-sm rounded-full bg-indigo-600 hover:bg-indigo-600 text-white flex justify-center items-center gap-3"
                >
                  Segarkan
                  <TbRefresh size={20}/>
                </button>
                <h1 className="font-semibold text-base text-gray-900">
                  Hasil pencarian
                </h1>
              </div>
            )}
            {code === 404 ? (
              <p className="text-center my-3">pencarian tidak ditemukan</p>
            ) : (
              <DistrictTable
                districts={districts}
                searchResult={searchResult}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Page;