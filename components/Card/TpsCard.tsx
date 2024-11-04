"use client";
import React, { useEffect } from "react";
import TpsDropdown from "../Dropdown/TpsDropdown";
import Link from "next/link";
import { getTpsList } from "@/redux/features/tps/tpsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const TpsCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tps_list, code } = useSelector((state: RootState) => state.tps);

  useEffect(() => {
    dispatch(getTpsList());
  }, [dispatch]);
  return (
    <>
    {code === 404 ? (
      <h1 className="text-2xl font-bold text-gray-900">Belum Ada TPS</h1>
    ) : (

    <div className="grid lg:grid-cols-4 gap-4">
      {tps_list.map((data) => (
        <div
          key={data.id}
          className="w-full rounded-xl border-[1.5px] border-stroke bg-white p-4"
        >
          <div className="flex justify-between items-center">
            <Link href={`/tps/${data.id}`}>
              <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-500">
                {data.name}
              </h3>
            </Link>
            <TpsDropdown tpsData={data} />
          </div>
          <p className="text-gray-500 my-3 capitalize"> {data.district_code.name}, Kecamatan {" "}
            {data.subdistrict_code.name}, {data.village_code.name}
          </p>
          {/* <p className="text-gray-500">
            <span className="font-semibold">Pemilih :</span> {data.voter_total}{" "}
            Orang
          </p> */}
        </div>
      ))}
    </div>
    )}
    </>
  );
};

export default TpsCard;
