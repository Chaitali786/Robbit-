'use server'

import { createClient } from "@/lib/supabase/serverClients"
import { redirect } from "next/navigation"
import z from "zod"
import { signUpSchema } from "./schemas"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
 
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
