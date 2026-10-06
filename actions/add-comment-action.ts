'use server'
import { createClient } from "@/lib/supabase/serverClients"
import { commentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export const AddCommentAction  = async({commentdata,postId} : {commentdata : z.infer<typeof commentSchema>,postId:string})  => {
  const supabase = await createClient()
  const parsedData = commentSchema.parse(commentdata)

  const {data:{user}} = await supabase.auth.getUser()
  if(!user) throw new Error ("You need to log in to do comment . ")

  await supabase.from("comments")
  .insert({post_id:postId,user_id:user.id,...parsedData})
  .throwOnError()

  revalidatePath("/")

}