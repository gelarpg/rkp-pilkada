"use client";
import { Village } from "@/lib/types/addressType";
import Link from "next/link";
import { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";

interface Props {
  villages: Village[];
  villageSearch: Village[];
}
const VillageTable = ({ villages, villageSearch }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Kode desa
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Nama desa
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            Data TPS
          </th>
        </tr>
      </thead>
      <tbody>
        {villageSearch.length > 0 ? (
          <>
            {villageSearch.map((village, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {village.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {village.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/villages/residents/${village.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Data TPS
                  </Link>
                </td>
              </tr>
            ))}
            {loading && <ListPulseLoader />}
          </>
        ) : (
          <>
            {villages?.map((village, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {village.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {village.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <Link
                    href={`/tps/villages/residents/${village.code}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Lihat Data TPS
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

export default VillageTable;
