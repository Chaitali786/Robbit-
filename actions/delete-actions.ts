'use server'

import { createClient } from "@/lib/supabase/serverClients"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const DeletePost = async (postId:string) => {
  const supabase = await createClient() 
  await supabase.from("Post").delete().eq("post_id",postId).throwOnError()
  revalidatePath("/")
  redirect("/")
  
}