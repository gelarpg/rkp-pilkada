import MainCard from '@/components/Card/MainCard'
import TpsCreateModal from '@/components/Modal/Tps/TpsCreateModal'
import MainLayout from '@/layouts/MainLayout'
import React from 'react'

const Page = () => {
  return (
    <MainLayout>
      <TpsCreateModal/>
      <div className="grid lg:grid-cols-4 gap-4">
        <MainCard/>
      </div>
    </MainLayout>
  )
}

export default Page