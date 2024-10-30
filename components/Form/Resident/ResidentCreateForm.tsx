import React from "react";

const ResidentCreateForm = () => {
  return (
    <form>
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
                  >
                    <option>TPS 1</option>
                    <option>TPS 2</option>
                    <option>TPS 3</option>
                    <option>TPS 4</option>
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
                />
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
                    autoComplete="gender"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6 uppercase"
                  >
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
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
                    placeholder="A"
                    className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div className="col-span-full">
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
                />
              </div>
            </div>
            <div className="sm:col-span-4  flex flex-col lg:flex-row justify-between gap-4 w-full">
              <div className="w-1/6">
                <label
                  htmlFor="rukun_tetangga"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  RT
                </label>
                <div className="mt-2">
                  <select
                    id="rukun_tetangga"
                    name="rukun_tetangga"
                    autoComplete="rukun_tetangga"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm/6"
                  >
                    <option>001</option>
                    <option>002</option>
                  </select>
                </div>
              </div>
              <div className="w-1/6">
                <label
                  htmlFor="rukun_warga"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  RW
                </label>
                <div className="mt-2">
                  <select
                    id="rukun_warga"
                    name="rukun_warga"
                    autoComplete="rukun_warga"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:text-sm/6"
                  >
                    <option>001</option>
                    <option>002</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="rukun_warga"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Kel/Desa
                </label>
                <div className="mt-2">
                  <select
                    id="rukun_warga"
                    name="rukun_warga"
                    autoComplete="rukun_warga"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  sm:text-sm/6 uppercase"
                  >
                    <option className="uppercase">Sumber Rahayu</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="rukun_warga"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Kecamatan
                </label>
                <div className="mt-2">
                  <select
                    id="rukun_warga"
                    name="rukun_warga"
                    autoComplete="rukun_warga"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  sm:text-sm/6 uppercase"
                  >
                    <option className="uppercase">Rambang</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3 flex flex-col lg:flex-row gap-4">
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
                  >
                    <option>BELUM KAWIN</option>
                    <option>KAWIN</option>
                    <option>JANDA</option>
                    <option>DUDA</option>
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
                  >
                    <option>PELAJAR/MAHASISWA</option>
                    <option>WIRASWASTA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
            <div className="sm:col-span-3 mt-6 flex flex-col lg:flex-row gap-4">
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
                    autoComplete="status"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                  >
                    <option>WNI</option>
                    <option>WNA</option>
                  </select>
                </div>
              </div>
              <div className="sm:w-fit">
                <label
                  htmlFor="work"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Berlaku Hingga
                </label>
                <div className="mt-2">
                  <select
                    id="work"
                    name="work"
                    autoComplete="work"
                    className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm/6"
                  >
                    <option>SEUMUR HIDUP</option>
                    <option>SEMENTARA</option>
                  </select>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default ResidentCreateForm;
