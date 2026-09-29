'use server'

import { createClient } from "@/lib/supabase/serverClients"
import { redirect } from "next/navigation"

export const DeletePost = async (postId:string) => {
  const supabase = await createClient() 
  await supabase.from("Post").delete().eq("post_id",postId).throwOnError()

  redirect("/")
  
}