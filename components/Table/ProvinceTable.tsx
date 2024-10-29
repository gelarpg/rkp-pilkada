"use client";
import { Province } from "@/lib/types/addressType";
import Link from "next/link";
import { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";

interface Props {
  provinces: Province[];
  searchResult: Province[];
}
const ProvinceTable = ({ provinces, searchResult }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Kode Provinsi
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Nama Provinsi
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Kabupaten/kota
          </th>
        </tr>
      </thead>
      <tbody>
        {searchResult.length > 0 ? (
          <>
            {searchResult.map((province, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {province.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {province.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/districts/${province.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Daftar Kabupaten/Kota
                  </Link>
                </td>
              </tr>
            ))}
            {loading && <ListPulseLoader />}
          </>
        ) : (
          <>
            {provinces?.map((province, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {province.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {province.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/districts/${province.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Daftar Kabupaten/Kota
                  </Link>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default ProvinceTable;
