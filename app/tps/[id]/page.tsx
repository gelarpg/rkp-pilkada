"use client";
import { TableLoader } from "@/components/Loader/MainLoader";
import ResidentTable from "@/components/Table/ResidentTable";
import useDebounce from "@/hook/useDebounce";
import MainLayout from "@/layout/MainLayout";
import {
  getResidentByTps,
  resetResident,
  searchResident,
} from "@/redux/features/resident/residentSlice";
import { getTpsId } from "@/redux/features/tps/tpsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiRefresh } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

const Page = ({ params }: Props) => {
  const [tpsId, setTpsId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { residents, searchResult, code, page, limit, hasMore } = useSelector(
    (state: RootState) => state.resident
  );
  const { tps } = useSelector((state: RootState) => state.tps);
  const router = useRouter();

  const loadMore = useDebounce(() => {
    if (!loading && hasMore) {
      dispatch(
        getResidentByTps({ tpsId: tpsId as number, page: 1, limit: 10 })
      );
    }
  }, 300);

  const loadMoreSearchResults = useDebounce(() => {
    if (!loading && hasMore) {
      dispatch(
        getResidentByTps({ tpsId: tpsId as number, page: 1, limit: 10 })
      );
    }
  }, 300);

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore, page]
  );

  const lastElementRefSearch = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreSearchResults();
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore, page, query]
  );

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(resetResident());
      dispatch(
        searchResident({
          tpsId: tpsId as number,
          fullname: query,
          page: 1,
          limit: 10,
        })
      );
    }
  };

  const handleRefresh = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetResident());
    router.refresh();
    setQuery("");
  };

  useEffect(() => {
    // Unwrapping the Promise for params
    const unwrapParams = async () => {
      const { id } = await params;
      setTpsId(id);
      dispatch(resetResident());
      setLoading(true);
      dispatch(getResidentByTps({ tpsId: id as number, page: 1, limit: 10 }));
      dispatch(getTpsId({ id: id as number }));
      setLoading(false);
    };
    unwrapParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center mb-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Daftar Pemilih di {tps?.name}
        </h1>
        <p>{residents.length} Warga</p>
        <Link
          href={`/tps/${tps?.id}/resident/${tps?.village_code.code}/create`}
          className="bg-indigo-600 text-white px-2 py-1 rounded-lg"
        >
          Tambah Data Pemilih
        </Link>
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
          placeholder="Cari nama warga disini"
          className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-2 ps-4 block font-normal text-md outline-none transition text-gray-900 focus:border-indigo-600 active:border-indigo-600  active:bg-white disabled:cursor-default disabled:bg-white"
        />
        <button
          onClick={handleSearch}
          className="px-2 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-600 text-white absolute top-1 right-1 flex justify-center items-center"
        >
          Cari
        </button>
      </div>
      {loading && residents.length === 0 ? (
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
                <HiRefresh size={20} />
              </button>
              <h1 className="font-semibold text-base text-gray-900">
                Hasil pencarian
              </h1>
            </div>
          )}

          {code === 404 ? (
            <div className="flex justify-center items-center flex-col-reverse my-1">
              <button
                onClick={handleRefresh}
                className="px-2 py-1 text-sm rounded-full bg-indigo-600 hover:bg-indigo-600 text-white flex justify-center items-center gap-3"
              >
                Segarkan
                <HiRefresh size={20} />
              </button>
              <p className="text-center my-3">Pencarian tidak ditemukan</p>
            </div>
          ) : (
            <div className="">
              <ResidentTable
                residents={residents}
                lastElementRef={lastElementRef}
                lastElementRefSearch={lastElementRefSearch}
                searchResult={searchResult}
              />
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Page;
