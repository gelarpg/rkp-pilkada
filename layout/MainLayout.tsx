import React from 'react'
import Navbar from './Navbar'

interface Props{
    children:React.ReactNode
}
const MainLayout:React.FC<Props> = ({children}) => {
  return (
    <div className='mx-2 lg:mx-0'>
    <Navbar/>
        <div className="mt-10 lg:mx-28 ">
            {children}
        </div>
    </div>
  )
}

export default MainLayout