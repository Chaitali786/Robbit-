'use server'

import { createClient } from "@/lib/supabase/serverClients"

export const SignUp = async (formdata: FormData) => {
 const userdata= { 
 username: formdata.get("username") as string,
 email : formdata.get("email") as string, 
 password: formdata.get("password") as string
 }
 const supabase = await createClient()
 const {data:{user},error} = await supabase.auth.signUp(userdata)
 console.log("User" , user,"Error",error)
 if (error) throw error 
 
}
