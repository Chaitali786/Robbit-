'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClients"
import slugify from "@/lib/supabase/slugify"
import { redirect } from "next/navigation"
import uploadImages from "@/lib/supabase/upload-images"

export const CreatePost = async (postdata: z.infer<typeof postSchema >) => {
  const parsedData = postSchema.parse(postdata)
  const slug = slugify(parsedData.title)
  const supabase = await createClient()
  const {data:{user}} = await supabase.auth.getUser()

  if(!user) throw new Error ("Unauthorized Access !!!")
    
    
   const imageFile = postdata.image?.get('image')

   if(!(imageFile instanceof File) && imageFile !== null ){
    throw Error ("Image is not in a valid format")
   }
   const imageUrl = imageFile? await uploadImages(imageFile) : null

    const {data, error} = await supabase.from("Post").insert([{
      ...parsedData,
      
      slug:slug,
      author:user.id,
      image:imageUrl
    }])
    if(error) console.log(error)
    redirect(`/${slug}`)
}