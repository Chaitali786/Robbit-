import React from 'react'
import AccountLinks from './accountLinks'
import Link from 'next/link'
import Search from './search'

const Header = () => {
  return (
    <header className ="p-4 border-b border-sushi flex p-1.5 m-2.5 justify-between">
      <Link 
  href="/" 
  className="flex items-center gap-2 text-2xl font-black tracking-tight text-pacifika hover:opacity-90 transition-opacity"
>
  
  
  <span>
    Swedish <span className="text-saratoga">Hub</span>
  </span>
</Link>
      <Search/>
      <AccountLinks/>
      
      </header>
  )
}

export default Header