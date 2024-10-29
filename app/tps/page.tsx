"use client";
import { TableLoader } from "@/components/Loader/MainLoader";
import ProvinceTable from "@/components/Table/ProvinceTable";
import MainLayout from "@/layout/MainLayout";
import {
  getProvinces,
  getSearchProvince,
  resetProvince,
} from "@/redux/features/address/provinceSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResult, provinces, loading, code } = useSelector(
    (state: RootState) => state.province
  );
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(resetProvince());
      dispatch(getSearchProvince({ name: query }));
    }
  };

  const handleRefresh = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetProvince());
    dispatch(getProvinces());
    router.refresh();
    setQuery("");
  };

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);
  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-3">Daftar Provinsi</h1>
      </div>
      <div className="relative">
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
          placeholder="Cari provinsi disini"
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
        {loading && provinces.length === 0 ? (
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
              <ProvinceTable
                provinces={provinces}
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
