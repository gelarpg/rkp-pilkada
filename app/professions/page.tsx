import Breadcrumb from '@/components/Breadcrum'
import MainLayout from '@/layout/MainLayout'
import React from 'react'

const Page = () => {
  return (
    <MainLayout>
        <Breadcrumb href='professions' mainPage='Professions' pageName='Professions'/>
    </MainLayout>
  )
}

export default Page