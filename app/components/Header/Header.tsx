import React from 'react'
import AccountLinks from './accountLinks'
import Link from 'next/link'

const Header = () => {
  return (
    <header className ="p-4 border-b border-sushi flex p-1.5 m-2.5 justify-between">
      <Link className="button" href="/">Robbit</Link>
      <AccountLinks/>
      
      </header>
  )
}

export default Header