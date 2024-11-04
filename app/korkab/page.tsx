"use client";
import { TableLoader } from "@/components/Loader/MainLoader";
import MemberTable from "@/components/Table/MemberTable";
import useDebounce from "@/hook/useDebounce";
import MainLayout from "@/layout/MainLayout";
import {
  getUsers,
  resetUser,
  searchUser,
} from "@/redux/features/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
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

const Page = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { users, searchResult, loading, page, limit, hasMore, code } =
    useSelector((state: RootState) => state.user);

  const role = 2;
  const router = useRouter();

  const loadMore = useDebounce(() => {
    if (!loading && hasMore) {
      dispatch(getUsers({ role: role, page, limit }));
    }
  }, 300);

  const loadMoreSearchResults = useDebounce(() => {
    if (!loading && hasMore) {
      dispatch(getUsers({ role: role, page, limit }));
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
      dispatch(resetUser());
      // dispatch(searchUser({ username: query, team_id: team_id, page: 1, limit }));
    }
  };

  const handleRefresh = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetUser());
    dispatch(getUsers({ role: role, page: 1, limit }));
    router.refresh();
    setQuery("");
  };
  useEffect(() => {
    dispatch(resetUser());
    dispatch(getUsers({ role: role, page: 1, limit }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <MainLayout>
      <div className="flex justify-between items-center gap-2 mb-3">
        <h1 className="text-xl font-semibold">Daftar Pengguna Koordinator Kabupaten</h1>
        {/* <MemberCreateModal /> */}
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
          placeholder="Cari pengguna disini"
          className="w-full rounded-xl border-[1.5px] border-stroke bg-white peer py-2 ps-4 block font-normal text-md outline-none transition text-gray-900 focus:border-indigo-600 active:border-indigo-600  active:bg-white disabled:cursor-default disabled:bg-white"
        />
        <button
          onClick={handleSearch}
          className="px-2 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-600 text-white absolute top-1 right-1 flex justify-center items-center"
        >
          Cari
        </button>
      </div>
      {loading && users.length === 0 ? (
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
            <div className="overflow-x-scroll lg:overflow-hidden">
              <MemberTable
                users={users}
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
