"use client";
import Breadcrumb from "@/components/Breadcrum";
import { TableLoader } from "@/components/Loader/MainLoader";
import VillageTable from "@/components/Table/VillageTable";
import MainLayout from "@/layout/MainLayout";
import {
  getSearchVillages,
  getVillages,
  resetVillage,
} from "@/redux/features/address/villageSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: Promise<{
    subdist_code: number;
  }>;
  
}

const Page = ({ params }: Props) => {
  const [subdistCode, setSubdistCode] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { villageSearch, villages, loading, code } = useSelector(
    (state: RootState) => state.village
  );
  const { subdistricts } = useSelector((state: RootState) => state.subdistrict);

  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { subdist_code } = await params;
      setSubdistCode(subdist_code);
      dispatch(resetVillage());
      dispatch(getVillages({ subdistCode: subdist_code }));
    };
    unwrapParams();
  }, [dispatch, params]);
  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(resetVillage());
      dispatch(
        getSearchVillages({ subdistCode: subdistCode as number, name: query })
      );
    }
  };

  const handleRefresh = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetVillage());
    dispatch(getVillages({ subdistCode: subdistCode as number }));
    router.refresh();
    setQuery("");
  };

  return (
    <MainLayout>
      <Breadcrumb
        href={`tps/subdistricts/${subdistricts[0]?.district_code}`}
        mainPage="Kecamatan"
        pageName="Desa"
      />
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
          placeholder="Cari desa disini"
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
        {loading && villages.length === 0 ? (
          <div className="mt-4">
            <TableLoader />
          </div>
        ) : (
          <>
            {villageSearch.length > 0 && (
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
              <VillageTable villages={villages} villageSearch={villageSearch} />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Page;
