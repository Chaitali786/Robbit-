"use client";
import { getHomePosts, HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import createClient from "@/lib/supabase/createClient";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  const supabase = createClient();
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
      {data.map((post) => (
        <Link
          key={post.post_id}
          className="block border border-sushi p-4 rounded-2xl m-4"
          href={`/${post.slug}`}
        >
          <h3 className="font-bold text-pacifika text-2xl">{post.title}</h3>
          <p className="font-medium text-slate-700 text-right">
            posted by - {post.author.username}
          </p>
          <p className="text-slate-400 text-right">
            {new Date(post.created_at).toLocaleDateString("sv-SE")}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default HomePosts;
