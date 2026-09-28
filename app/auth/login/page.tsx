import { LogIn } from '@/actions/login-action'
import Link from 'next/link'
import React from 'react'
import LogInForm from './form'

const LogInPage = () => {
  return (
    <div className="text-center ">
       <h1 className="heading my-4">Login </h1>
       <LogInForm/>
      <Link href="/auth/signup"> 
       Don't have an account? <span className="text-pacifika font-bold">SignUp Here !</span>
      </Link>
    </div>
  )
}

export default LogInPage