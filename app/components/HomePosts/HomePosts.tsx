"use client";
import { getHomePosts, HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import { useQuery } from "@tanStack/react-query";
import createClient from "@/lib/supabase/createClient";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
 const supabase = createClient()
  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getHomePosts(supabase);
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
    staleTime: 1000,
  });
  console.log("Component", data);
  return (
    <div>
      HomePosts
      {data.map((post) => (
        <Link
          key={post.post_id}
          className="block border border-sushi p-4 rounded-2xl m-4"
          href={`/${post.slug}`}
        >
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <p className="text-right">posted by - {post.author.username}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomePosts;
