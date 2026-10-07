'use server'
import { createClient } from '@/lib/supabase/serverClients'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'

export const DeleteCommentAction= async(commentId: number) => {

  const supabase = await createClient()
  const {error}= await supabase.from("comments").delete().eq("id",commentId)
  

  if(error) console.log("Error",error)

    revalidatePath("/")
    

}