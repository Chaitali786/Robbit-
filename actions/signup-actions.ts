'use server'

import { createClient } from "@/lib/supabase/serverClients"
import { redirect } from "next/navigation"

export const SignUp = async (formdata: FormData) => {
 const userdata= { 
 username: formdata.get("username") as string,
 email : formdata.get("email") as string, 
 password: formdata.get("password") as string
 }
 const supabase = await createClient()
 const {data:{user},error} = await supabase.auth.signUp(userdata)
 //console.log("User" , user,"Error",error)
 if (error) throw error 
 console.log("User from action", user)
 if(user && user.email) {
  const {data, error} = await supabase.from('Users').insert({id:user.id , email:user.email, username: userdata.username})
  //console.log("Our Users", data, error) 
  if (error) throw error 
  
}
redirect("/")
 
}
