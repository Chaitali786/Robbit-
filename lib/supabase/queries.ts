import createClient from "./createClient"
import {type QueryData} from '@supabase/supabase-js'
export const getHomePosts = async () => {
  const supabase = createClient() 
  return await supabase.from('Post')
                       .select('post_id,title, slug, author("id","username")')
                       .order('created_at',{ascending:true})
  
}

export const getSinglePost = async (slug:string) => {
  const supabase = createClient()
  return await supabase.from('Post')
                       .select('post_id,title,content,author("id","username")')
                       .eq('slug', slug)
                       .single()
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>