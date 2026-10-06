"use client";
import { commentSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ErrorMessage, useForm } from "react-hook-form";
import { useMutation } from "@tanStack/react-query";
import { toast } from "sonner";
import { AddCommentAction } from "@/actions/add-comment-action";

const AddComment = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(commentSchema),
  });
  const { mutate, error } = useMutation({
    mutationFn: AddCommentAction,
    onSuccess:() => reset(),
    onSettled: () => toast("Comment Added !"),
  });
  return (
    <div className="rounded-r-2xl border-2 max-w-md m-auto p-4 border-sushi  pb-10">
      <form
        onSubmit={handleSubmit(values =>
          mutate({ commentdata : { content: values.content }, postId: postId }),
        )}
      >
        <label htmlFor="content"></label>
        <textarea
          placeholder="Add your comment Here ....."
          {...register("content")}
        ></textarea>

        <button className="button-secondary">Add Comment</button>
        
      </form>
    </div>
  );
};

export default AddComment;
