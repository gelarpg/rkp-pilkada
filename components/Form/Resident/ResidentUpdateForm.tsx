"use client";

import { getRwApi, getRtApi, dataCitizen, dataReligion, dataMaritalStatus, dataGender } from "@/lib/api/masterDataApi";
import { getProfessionListApi } from "@/lib/api/professionApi";
import { getTpsIdApi, getTpsListApi } from "@/lib/api/tpsApi";
import { getVillageByIdApi } from "@/lib/api/villageApi";
import { Resident } from "@/lib/types/residentType";
import { updateResident } from "@/redux/features/resident/residentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


interface Props{
    resident?:Resident
}
const ResidentUpdateForm = ({resident}:Props) => {
  const [loading, setLoading] = useState(false);
  const [tps, setTps] = useState([]);
  const [nik, setNik] = useState<any>(resident?.nik);
  const [fullname, setFullname] = useState<any>(resident?.fullname);
  const [bornPlace, setBornPlace] = useState<any>(resident?.born_place);
  const [birthdate, setBirthdate] = useState<any>(resident?.birthdate);
  const [gender, setGender] = useState<any>([]);
  const [religion, setReligion] = useState<any>([]);
  const [bloodType, setBloodType] = useState<any>(resident?.blood_type);
  const [rw, setRw] = useState([]);
  const [rt, setRt] = useState([]);
  const [selectedTps, setSelectedTps] = useState<any>(resident?.tps_id.id);
  const [selectedGender, setSelectedGender] = useState<any>(resident?.gender);

  const [selectedRw, setSelectedRw] = useState(resident?.rw_id);
  const [selectedRt, setSelectedRt] = useState(resident?.rt_id);


  const handleTps = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let tpsId = e.target.value;
    setSelectedTps(tpsId);
  };
  const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let genderName = e.target.value;
    setSelectedGender(genderName);
  };
  const handleUpdate = (e: SyntheticEvent) => {
    
  }

  useEffect(()=>{
    (async () => {
      const dataTps = await getTpsListApi();
      setTps(dataTps.data);
      
      setGender(dataGender);
    })();
  }, [])


 return (
    <form onSubmit={handleUpdate}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Informasi Warga
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Harap masukan data dengan teliti dan benar
          </p>

          <div className="sm:w-fit">
            <label
              htmlFor="tps_id"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Pilih TPS
            </label>
            <div className="mt-2">
              <select
                id="tps_id"
                name="tps_id"
                className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                value={selectedTps || resident?.tps_id.id}
                onChange={handleTps}
              >
                <option value="">Pilih TPS</option>
                {tps.map((data:any) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="nik"
                className="block text-sm/6 font-medium text-gray-900"
              >
                NIK
              </label>
              <div className="mt-2">
                <input
                  id="nik"
                  name="nik"
                  type="text"
                  placeholder="Masukan nomor induk kependudukan"
                  className="block w-full rounded-md py-1.5 px-2 text-gray-900 shadow-sm border placeholder:text-gray-400  sm:text-sm/6"
                  value={nik || resident?.nik}
                  onChange={(e) => setNik(e.target.value)}
                />
                {/* {validateNik && (
                  <span className="text-sm text-red-500">{validateNik}</span>
                )} */}
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="fullname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nama
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Masukan nama lengkap"
                  className="block w-full rounded-md py-1.5 px-2 text-gray-900 shadow-sm border lg:w-1/2 placeholder:text-gray-400  sm:text-sm/6"
                  value={fullname || resident?.fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="born_palce"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tempat Lahir
              </label>
              <div className="mt-2">
                <input
                  id="born_palce"
                  name="born_palce"
                  type="text"
                  placeholder="Masukan tempat lahir"
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm/6"
                  value={bornPlace || resident?.born_place}
                  onChange={(e) => setBornPlace(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="birtdate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tanggal Lahir
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="birtdate"
                  id="birtdate"
                  className="px-2 py-1.5 rounded-md border"
                  value={birthdate || resident?.birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3 flex flex-col lg:flex-row gap-4">
              <div className="sm:w-fit">
                <label
                  htmlFor="gender"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Jenis Kelamin
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6 uppercase"
                    value={selectedGender}
                    onChange={handleGender}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    {gender.map((data:any) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:w-fit">
                <label
                  htmlFor="blood_type"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Gol.Darah
                </label>
                <div className="mt-2">
                  <input
                    id="blood_type"
                    name="blood_type"
                    type="text"
                    placeholder="Masukan golongan darah"
                    className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm/6"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Alamat
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Masukan alamat"
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm/6"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div> */}

            {/* <div className="sm:col-span-4  flex flex-col lg:flex-row justify-between gap-4 w-full">
              <div className="w-1/4">
                <label
                  htmlFor="rt_id"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  RT
                </label>
                <div className="mt-2">
                  <select
                    id="rt_id"
                    name="rt_id"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm/6"
                    value={selectedRt}
                    onChange={(e) => setSelectedRt(e.target.value)}
                  >
                    <option value="">Pilih RT</option>
                    {rt.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-1/4">
                <label
                  htmlFor="rw_id"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  RW
                </label>
                <div className="mt-2">
                  <select
                    id="rw_id"
                    name="rw_id"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm/6"
                    value={selectedRw}
                    onChange={(e) => setSelectedRw(e.target.value)}
                  >
                    <option value="">Pilih RW</option>
                    {rw.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="village"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Kel/Desa
                </label>
                <div className="mt-2">
                  <select
                    id="village"
                    name="village"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  sm:text-sm/6 uppercase"
                    value={selectedVillage?.code}
                    disabled={true}
                  >
                    <option value={selectedVillage?.code}>
                      {selectedVillage?.name}
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="subdistrict"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Kecamatan
                </label>
                <div className="mt-2">
                  <select
                    id="subdistrict"
                    name="subdistrict"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  sm:text-sm/6 uppercase"
                    value={selectedVillage?.subdistrict?.code.toString()}
                    disabled={true}
                  >
                    <option
                      value={selectedVillage.subdistrict?.code.toString()}
                    >
                      {selectedVillage.subdistrict?.name}
                    </option>
                  </select>
                </div>
              </div>
            </div> */}

            {/* <div className="sm:col-span-3 flex flex-col lg:flex-row gap-4">
              <div className="sm:w-fit">
                <label
                  htmlFor="religion"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Agama
                </label>
                <div className="mt-2">
                  <select
                    id="religion"
                    name="religion"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                    value={selectedReligion}
                    onChange={handleReligion}
                  >
                    <option value="">Pilih Agama</option>
                    {religion.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:w-fit">
                <label
                  htmlFor="status"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Status Perkawinan
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    autoComplete="status"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                    value={selectedmaritalStatus}
                    onChange={handleMaritalStatus}
                  >
                    <option value="">Pilih Status Perkawinan</option>
                    {maritalStatus.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:w-fit">
                <label
                  htmlFor="work"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Pekerjaan
                </label>
                <div className="mt-2">
                  <select
                    id="work"
                    name="work"
                    autoComplete="work"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                    value={selectedProfession}
                    onChange={handleProfession}
                  >
                    <option value="">Pilih Pekerjaan</option>
                    {profession.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="sm:col-span-3 mt-6 flex flex-col lg:flex-row gap-4">
            <div className="sm:w-fit">
              <label
                htmlFor="status"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Kewarganegaraan
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                  value={selectedCitizen}
                  onChange={handleCitizen}
                >
                  <option value="">Pilih Kewarganegaraan</option>
                  {citizen.map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:w-fit">
              <label
                htmlFor="valid_until"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Berlaku hingga
              </label>
              <div className="mt-2">
                <input
                  id="valid_until"
                  name="valid_until"
                  type="text"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  disabled={true}
                  className="block w-full rounded-md py-1.5 px-2 text-gray-900 shadow-sm border placeholder:text-gray-400  sm:text-sm/6"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 w-full lg:w-fit text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? "Menyimpan..." : "Perbarui"}
        </button>
      </div>
    </form>
  );
};

export default ResidentUpdateForm;
