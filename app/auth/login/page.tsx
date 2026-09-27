import Link from 'next/link'
import React from 'react'

const LogInPage = () => {
  return (
    <div className="text-center ">
       <h1 className="heading my-4">Login </h1>
      <Link href="/auth/signup"> 
       Don't have an account? <span className="text-pacifika font-bold">SignUp Here !</span>
      </Link>
    </div>
  )
}

export default LogInPage