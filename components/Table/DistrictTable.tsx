"use client";
import { District } from "@/lib/types/addressType";
import Link from "next/link";
import { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";

interface Props {
  districts: District[];
  searchResult: District[];
}
const DistrictTable = ({ districts, searchResult }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Kode Kabupaten
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Nama Kabupaten
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Kecamatan
          </th>
        </tr>
      </thead>
      <tbody>
        {searchResult.length > 0 ? (
          <>
            {searchResult.map((district, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {district.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {district.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/subdistricts/${district.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Daftar Kecamatan
                  </Link>
                </td>
                
              </tr>
            ))}
            {loading && <ListPulseLoader />}
          </>
        ) : (
          <>
            {districts?.map((district, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {district.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {district.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/subdistricts/${district.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Daftar Kecamatan
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

export default DistrictTable;
