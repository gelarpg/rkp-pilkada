"use client";
import ProcessingButton from "@/components/Button/ProcessingButton";
import MainInput from "@/components/Input/MainInput";
import { getDistrictApi } from "@/lib/api/districtApi";
import { getProvinceApi } from "@/lib/api/provinceApi";
import { getSubDistrictsApi } from "@/lib/api/subdistrictApi";
import { getVillageApi } from "@/lib/api/villageApi";
import {
  District,
  Province,
  SubDistrict,
  Village,
} from "@/lib/types/addressType";
import { createTps } from "@/redux/features/tps/tpsSlice";
import { AppDispatch } from "@/redux/store";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const TpsCreateModal = () => {
  const [tpsData, setTpsData] = useState({
    name: "",
    provinces: [] as any[],
    districts: [] as any[],
    subdistricts: [] as any[],
    villages: [] as any[],
    selectedProvince: undefined as number | undefined,
    selectedDistrict: undefined as number | undefined,
    selectedSubDistrict: undefined as number | undefined,
    selectedVillage: undefined as number | undefined,
    validation: undefined as any | undefined,
    loading: false,
    validationName: [] as string[],
    validationProvince: [] as string[],
    validationDistrict: [] as string[],
    validationSubDistrict: [] as string[],
    validationVillage: [] as string[],
  });
  const [modal, setModal] = useState(false);
  const [enable, setEnable] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const setTpsField = (field: keyof typeof tpsData, value: any) => {
    setTpsData((prevState) => ({ ...prevState, [field]: value }));
  };
  const handleProvinces = async (e: any) => {
    let province_code = parseInt(e.target.value);
    setTpsData((prevState) => ({
      ...prevState,
      selectedProvince: province_code,
    }));
    if (province_code !== 0) {
      const dataDistricts = await getDistrictApi(province_code);
      if (dataDistricts) {
        setTpsData((prevState) => ({
          ...prevState,
          districts: dataDistricts.data,
        }));
        setEnable(false);
      }
    } else {
      setEnable(true);
    }
  };

  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    let district_code = parseInt(e.target.value);
    setTpsData((prevState) => ({
      ...prevState,
      selectedDistrict: district_code,
    }));
    if (district_code !== 0) {
      const dataSubDistricts = await getSubDistrictsApi(district_code);
      if (dataSubDistricts) {
        setTpsData((prevState) => ({
          ...prevState,
          subdistricts: dataSubDistricts.data,
        }));
        setEnable(false);
      }
    } else {
      setEnable(true);
    }
  };

  const handleSubDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    let subdistrict_code = parseInt(e.target.value);
    setTpsData((prevState) => ({
      ...prevState,
      selectedSubDistrict: subdistrict_code,
    }));
    if (subdistrict_code !== 0) {
      const dataVillages = await getVillageApi(subdistrict_code);
      if (dataVillages) {
        setTpsData((prevState) => ({
          ...prevState,
          villages: dataVillages.data,
        }));
        setEnable(false);
      }
    } else {
      setEnable(true);
    }
  };
  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", tpsData.name);
      formData.append(
        "province_code",
        tpsData.selectedProvince?.toString() || ""
      );
      formData.append(
        "district_code",
        tpsData.selectedDistrict?.toString() || ""
      );
      formData.append(
        "subdistrict_code",
        tpsData.selectedSubDistrict?.toString() || ""
      );
      formData.append(
        "village_code",
        tpsData.selectedVillage?.toString() || ""
      );
      await dispatch(createTps({ formData: formData }));
      setTpsData({
        name: "",
        provinces: [] as any[],
        districts: [] as any[],
        subdistricts: [] as any[],
        villages: [] as any[],
        selectedProvince: undefined as number | undefined,
        selectedDistrict: undefined as number | undefined,
        selectedSubDistrict: undefined as number | undefined,
        selectedVillage: undefined as number | undefined,
        validation: undefined as any | undefined,
        loading: false,
        validationName: [] as string[],
        validationProvince: [] as string[],
        validationDistrict: [] as string[],
        validationSubDistrict: [] as string[],
        validationVillage: [] as string[],
      })
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setModal(!modal);
  };

  useEffect(() => {
    (async () => {
      const dataProvinces = await getProvinceApi();
      setTpsField("provinces", dataProvinces.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-2">
      <button
        type="button"
        onClick={handleChange}
        className="py-1 px-2 bg-indigo-600 text-white rounded-xl border-none"
      >
        Tambah Data TPS
      </button>

      {modal && (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-80 p-3">
          <div className=" opacity-100 duration-500 mt-0 ease-out transition-all sm:max-w-lg  sm:w-full sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto h-1/2">
              <form onSubmit={handleCreate}>
                <div className="flex justify-between items-center py-3 px-4 border-b">
                  <button
                    type="button"
                    onClick={handleChange}
                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
                  >
                    <span className="sr-only">Close</span>
                    <HiArrowLeft size={20} />
                  </button>
                  <div className="">
                    {loading ? (
                      <ProcessingButton name="menambah.." />
                    ) : (
                      <button
                        type="submit"
                        className={`py-2 px-3 w-full capitalize gap-x-2 text-sm font-semibold rounded-full border border-transparent  text-white disabled:pointer-events-none ${
                          tpsData.name
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : "bg-slate-400 cursor-not-allowed"
                        }`}
                        disabled={!tpsData.name}
                      >
                        Tambah
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <div className="p-4 overflow-y-auto space-y-3">
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Nama TPS
                  </label>
                  <MainInput
                    name="name"
                    type="text"
                    placeholder="Masukan nama TPS"
                    value={tpsData.name}
                    onChange={(e) =>
                      setTpsData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="">
                  <select
                    className="border p-3 bg-white rounded-lg  text-black capitalize w-full "
                    name="province_code"
                    value={tpsData.selectedProvince}
                    onChange={handleProvinces}
                  >
                    <option value="">Pilih Provinsi</option>
                    {tpsData.provinces.map((data: Province) => (
                      <option key={data.code} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <select
                    className="border p-3 bg-white rounded-lg  text-black capitalize w-full "
                    name="province_code"
                    value={tpsData.selectedDistrict}
                    onChange={handleDistrict}
                  >
                    <option value="">Pilih Kabupaten</option>
                    {tpsData.districts.map((data: District) => (
                      <option key={data.code} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <select
                    className="border p-3 bg-white rounded-lg  text-black capitalize w-full "
                    name="province_code"
                    value={tpsData.selectedSubDistrict}
                    onChange={handleSubDistrict}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {tpsData.subdistricts.map((data: SubDistrict) => (
                      <option key={data.code} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <select
                    className="border p-3  bg-white rounded-lg  text-black capitalize w-full "
                    name="village_code"
                    value={tpsData.selectedVillage}
                    onChange={(e) =>
                      setTpsData((prevData) => ({
                        ...prevData,
                        selectedVillage: parseInt(e.target.value),
                      }))
                    }
                  >
                    <option value="">Pilih Desa</option>
                    {tpsData.villages.map((data: Village) => (
                      <option key={data.code} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TpsCreateModal;
