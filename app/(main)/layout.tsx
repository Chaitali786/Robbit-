import React from 'react'
import Header from '../components/Header/Header'

const Mainlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      <Header/>
      {children}
    </>
    
  )
}

export default Mainlayout