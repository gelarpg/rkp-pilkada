"use client";
import { User } from "@/lib/types/userType";
import React, { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";
import MemberDropdown from "../Dropdown/MemberDropdown";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  users?: User[];
  searchResult: User[];
  lastElementRefSearch: (node: any) => void;
  lastElementRef: (node: any) => void;
}
const MemberTable = ({
  users,
  searchResult,
  lastElementRefSearch,
  lastElementRef,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div className="overflow-x-scroll lg:overflow-hidden pb-12">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
            >
              Nama Lengkap
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
            >
              Peran
            </th>
            {user?.role === 2 && (
              <th
                scope="col"
                className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
              >
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {searchResult.length > 0 ? (
            <>
              {searchResult.map((data, index) => (
                <tr
                  className="odd:bg-white even:bg-gray-100"
                  key={index}
                  ref={
                    index === searchResult.length - 1
                      ? lastElementRefSearch
                      : undefined
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data.role === 2 && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        Koordinator Kabupaten
                      </span>
                    )}
                    {data.role === 3 && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                        Koordinator Kecamatan
                      </span>
                    )}
                    {data.role === 4 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        Koordinator Desa
                      </span>
                    )}
                  </td>
                  {user?.role === 2 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <MemberDropdown memberData={data} />
                    </td>
                  )}
                </tr>
              ))}
              {loading && <ListPulseLoader />}
            </>
          ) : (
            <>
              {users?.map((data, index) => (
                <tr
                  className="odd:bg-white even:bg-gray-100"
                  key={index}
                  ref={
                    index === searchResult.length - 1
                      ? lastElementRef
                      : undefined
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data.role === 2 && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                        Koordinator Kabupaten
                      </span>
                    )}
                    {data.role === 3 && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                        Koordinator Kecamatan
                      </span>
                    )}
                    {data.role === 4 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        Koordinator Desa
                      </span>
                    )}
                  </td>
                  {user?.role === 2 && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <MemberDropdown memberData={data} />
                    </td>
                  )}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
