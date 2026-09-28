import { createClient } from '@/lib/supabase/serverClients'
import Link from 'next/link'
import React from 'react'
import {logout} from '@/actions/logout-actions'
const accountLinks = async() => {
  const supabase = await createClient()
  const {data:{user}, error} = await supabase.auth.getUser()
  return (
    <div className = "flex justify-between m-1 gap-1.5">
      {user ? 
         <>
         <div onClick = {logout}  className="button">Logout</div>
         </>
      : 
          <>
          <Link className = "button" href="/auth/login">Login
              </Link>
              <Link className = "button" href="/auth/signup">Signup
              </Link>
          </>
          
       }
    </div>
  )
}

export default accountLinks