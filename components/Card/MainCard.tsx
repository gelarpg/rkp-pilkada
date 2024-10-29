import React from 'react'

const dataTps = [
    {
      id: 1,
      name: 'TPS 1',
      href: '#',
      address: 'Kp. Anu',
      voter_total: 120
    },
    {
      id: 2,
      name: 'TPS 2',
      href: '#',
      address: 'Kp. Anu',
      voter_total: 60
    },
    {
      id: 3,
      name: 'TPS 3',
      href: '#',
      address: 'Kp. Anu',
      voter_total: 12
    },
    {
      id: 4,
      name: 'TPS 4',
      href: '#',
      address: 'Kp. Anu',
      voter_total: 134
    }
  ]
const MainCard = () => {
  return (
    <>
    {dataTps.map((data)=>(
        <div key={data.id} className="w-full rounded-xl border-[1.5px] border-stroke bg-white p-4">
            <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
            <p className="text-gray-500">{data.address}</p>
            <p className="text-gray-500">{data.voter_total} Orang</p>
        </div>
    ))}
        
    </>
  )
}

export default MainCard