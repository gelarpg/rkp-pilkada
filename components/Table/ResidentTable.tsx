"use client";
import React, { useState } from "react";
import { ListPulseLoader } from "../Loader/MainLoader";
import { Resident } from "@/lib/types/residentType";
import ResidentDropdown from "../Dropdown/ResidentDropdown";

interface Props {
  residents?: Resident[];
  searchResult: Resident[];
  lastElementRefSearch: (node: any) => void;
  lastElementRef: (node: any) => void;
}
const ResidentTable = ({
  residents,
  searchResult,
  lastElementRefSearch,
  lastElementRef,
}: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="overflow-x-scroll lg:overflow-hidden pb-14">
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
                    {data.nik}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data.tps_id.name}
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
                    {data?.nik}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {data?.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data?.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                    {data?.tps_id?.name}
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
