import React from "react";

const dataTps = [
  {
    id: 1,
    name: "TPS 1",
    href: "#",
    address: "Kabupaten Muara Enim, Kecamatan Benakat, Pagar Dewa",
    voter_total: 120,
  },
  {
    id: 2,
    name: "TPS 2",
    href: "#",
    address: "Kabupaten Muara Enim, Kecamatan Gunung Megang, Desa Gunung Megang Dalam",
    voter_total: 60,
  },
  {
    id: 3,
    name: "TPS 3",
    href: "#",
    address: "Kabupaten Muara Enim, Kecamatan Rambang, Desa Tanjung Dalam",
    voter_total: 12,
  },
  {
    id: 4,
    name: "TPS 4",
    href: "#",
    address: "Kabupaten Muara Enim, Kecamatan Lembak, Desa Tapus",
    voter_total: 134,
  },
  {
    id: 5,
    name: "TPS 5",
    href: "#",
    address: "Kabupaten Muara Enim, Kecamatan Lembak, Desa Tapus",
    voter_total: 0,
  },
];
const TpsCard = () => {
  return (
    <>
      {dataTps.map((data) => (
        <div
          key={data.id}
          className="w-full rounded-xl border-[1.5px] border-stroke bg-white p-4"
        >
          <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
          <p className="text-gray-500 my-3">{data.address}</p>
          <p className="text-gray-500"><span className="font-semibold">Pemilih :</span> {data.voter_total} Orang</p>
        </div>
      ))}
    </>
  );
};

export default TpsCard;
