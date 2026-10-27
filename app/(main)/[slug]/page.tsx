import { getPostComments, getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClients";
import React from "react";
import DeleteButton from "./deleteButton";
import Link from "next/link";
import Comments from "./comments";
import AddComment from "./addComment";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getSinglePost(slug);

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-pacifika">Post not found</h2>
        <Link href="/" className="mt-4 inline-block text-sushi underline">
          Back to all topics
        </Link>
      </div>
    );
  }

  const isAuthor: boolean = !!(user && data && user.id === data.author.id);
  const comments = await getPostComments(data.post_id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
       
        <div className="w-full sticky lg:top-24">
          {data.image ? (
            <div className="overflow-hidden rounded-2xl border-2 border-pacifika/15 shadow-sm bg-white">
              <img
  src={data.image}
  alt={data.title || "Post image"}
  className="w-full h-auto max-h-[550px] object-contain rounded-2xl mx-auto"
/>
            </div>
          ) : (
            <div className="h-64 sm:h-96 w-full rounded-2xl border-2 border-dashed border-pacifika/20 bg-ivory/50 flex flex-col items-center justify-center text-slate-400">
              <p className="text-sm font-medium">No image provided</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border-2 border-pacifika/20 bg-white p-6 shadow-sm">
            {data.category && (
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-pacifika/10 text-pacifika">
                {data.category}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-pacifika tracking-tight mb-4">
              {data.title}
            </h1>

            {data.content && (
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base mb-6">
                {data.content}
              </p>
            )}

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Created by{" "}
                <span className="font-semibold text-slate-800">
                  {data.author.username}
                </span>
              </span>

              
              {isAuthor && (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${slug}/edit`}
                    className="button-secondary text-xs"
                  >
                    Edit Post
                  </Link>
                  <DeleteButton id={data.post_id} />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-pacifika/10 bg-ivory p-6 shadow-sm space-y-6">
                     
            {user ? (
              <AddComment postId={data.post_id} />
            ) : (
              <p className="text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200">
                <Link
                  href="/login"
                  className="text-pacifika font-bold underline"
                >
                  Please Log in !!
                </Link>{" "}
                to join the discussion and share your thoughts.
              </p>
            )}

            
            {comments && (
              <Comments
                postid={data.post_id}
                isAuthor={isAuthor}
                userId={user ? user.id : null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
