import createClient from "./createClient";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (supabase : ReturnType<typeof createClient>) => {
  return await supabase
    .from("Post")
    .select('post_id,title, slug, author("id","username")')
    .order("created_at", { ascending: true });
};

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("Post")
    .select("title,slug")
    .textSearch("title", searchTerm);
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Post")
    .select('post_id,title,content,image,author("id","username")')
    .eq("slug", slug)
    .single();
};

export const getPostComments = async(post_id: string) => {
  const supabase = createClient()
  const {data, error} = await supabase.from("comments").select('id, content, user_id("id","username")')
                                               .eq('post_id',post_id)
                                               .order("created_at",{ascending:false})
      if (error) console.log(error)
      console.log("Comment data" , data)
  return data
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;
export type SearchResultsType = QueryData<ReturnType<typeof searchPosts>>;
export type CommentsType = QueryData<ReturnType<typeof getPostComments>>;
