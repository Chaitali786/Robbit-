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
  console.log("User from Slug: ", user);
  const { data, error } = await getSinglePost(slug);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;

  console.log("Is this the correct Author :", isAuthor);
  console.log("SlugData", data, "Error", error);

  const comments = await getPostComments(data!.post_id);
  return (
    <div className="pb-10">
      {data && (
        <div className="rounded-r-2xl border-2 max-w-md m-auto p-4 border-sushi  pb-10">
        

          <h1 className="heading">{data.title}</h1>
          {data.image && (
            <img src={data.image} alt={data.title ? "{data.title}" : ""} />
          )}
          {data.content && <p>{data.content}</p>}
          <p className="text-red-600 text-right">Created By - {data.author.username}</p>

          {isAuthor && (
            <div className="flex gap-1.5 justify-between">
              <DeleteButton id={data.post_id} />
              <Link className="button-secondary" href={`/${slug}/edit`}>
                Edit Post
              </Link>
            </div>
          )}
           {comments && <Comments  postid ={data.post_id} />}
          {user && <AddComment postId = {data.post_id}/>}
        </div>
      )}
     
    </div>
  );
};

export default PostPage;
