import { getSinglePost } from '@/lib/supabase/queries'
import React from 'react'

const PostPage = async ({params}:{params:{slug: string}}) => {
  const {slug} = await params
  const {data, error} = await getSinglePost(slug)
  console.log("SlugData" , data ,"Error", error)
  return (
    <div>
      {data && 
       <div>
        <h1 className = "heading" >{data.title}</h1>
         {data.content && <p>{data.content}</p>}
         <p className = "text-red-600">Created By - {data.author.username}</p>
        </div>
        
      }
       
     
    </div>
  )
}

export default PostPage