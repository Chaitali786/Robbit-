import Link from 'next/link'
import React from 'react'

const Authlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    
    <header className ="p-4 border-b border-sushi flex p-1.5 m-2.5 justify-between">
      <Link className="button" href="/">Robbit</Link>
      </header>
    {children}
    </>
    
  )
}

export default Authlayout