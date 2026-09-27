import Link from 'next/link'
import React from 'react'

const accountLinks = () => {
  return (
    <div className = "flex justify-between m-1 gap-1.5">
      <Link className = "button" href="/auth/login">Login
      </Link>
      <Link className = "button" href="/auth/signup">Signup
      </Link>
    </div>
  )
}

export default accountLinks