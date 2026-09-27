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
    .select('post_id,title,content,author("id","username")')
    .eq("slug", slug)
    .single();
};

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;
export type SearchResultsType = QueryData<ReturnType<typeof searchPosts>>;
