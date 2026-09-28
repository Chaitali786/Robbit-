'use server'

import {createClient} from'@/lib/supabase/serverClients'
import{redirect} from 'next/navigation'

export const logout = async() => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}