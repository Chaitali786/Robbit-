import { CommentsType, getPostComments } from "@/lib/supabase/queries";
import React from "react";
import DeleteComment from "./deleteComment";

const comments = async ({
  postid,
  isAuthor,
  userId,
}: {
  postid: string;
  isAuthor: boolean;
  userId: string | null;
}) => {
  const comments = await getPostComments(postid);
  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="rounded-2xl border-2 m-4 p-2">
            <p className="font-mono">{comment.content} </p>
            <p className="font-bold text-right">{comment.user_id.username}</p>
            {(isAuthor || userId === comment.user_id.id) && (
              <DeleteComment commentId={comment.id} />
            )}
          </div>
        ))
      ) : (
        <h2>No Comments Yet !! </h2>
      )}
    </div>
  );
};

export default comments;
