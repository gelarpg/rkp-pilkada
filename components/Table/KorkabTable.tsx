"use client";
import { User } from "@/lib/types/userType";
import React, { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";
import MemberDropdown from "../Dropdown/MemberDropdown";

interface Props {
  korkab?: any[];
  userSearch: User[];
}
const KorkabTable = ({ korkab, userSearch }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <table className="min-w-full divide-y divide-gray-200">
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
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        {userSearch.length > 0 ? (
          <>
            {userSearch.map((data, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
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
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Koordinator Kabupaten
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <MemberDropdown memberData={data}/>
                </td>
              </tr>
            ))}
            {loading && <ListPulseLoader />}
          </>
        ) : (
          <>
            {korkab?.map((data, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
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
                  {data.peran_id === 3 && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Koordinator Kecamatan
                    </span>
                  )}
                  {data.peran_id === 4 && (
                    <span className="bg-green-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      Koordinator Desa
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <MemberDropdown memberData={data}/>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default KorkabTable;
