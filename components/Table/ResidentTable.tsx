"use client";
import React, { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";
import { Resident } from "@/lib/types/residentType";
import ResidentDropdown from "../Dropdown/ResidentDropdown";

interface Props {
  residents?: any[];
  residentSearch: Resident[];
}
const ResidentTable = ({ residents, residentSearch }: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="overflow-scroll">
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
            NIK
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
            Jenis Kelamin
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
          >
            TPS
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
        {residentSearch.length > 0 ? (
          <>
            {residentSearch.map((data, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.nik}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {data.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {data.tps_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <ResidentDropdown resident={data} />
                </td>
              </tr>
            ))}
            {loading && <ListPulseLoader />}
          </>
        ) : (
          <>
            {residents?.map((data, index) => (
              <tr className="odd:bg-white even:bg-gray-100" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.nik}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {data.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                  {data.tps_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                  <ResidentDropdown resident={data} />
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default ResidentTable;
