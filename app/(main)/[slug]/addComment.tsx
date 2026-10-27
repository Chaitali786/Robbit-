"use client";

import { commentSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanStack/react-query";
import { toast } from "sonner";
import { AddCommentAction } from "@/actions/add-comment-action";

const AddComment = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>({
    resolver: zodResolver(commentSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: AddCommentAction,
    onSuccess: () => {
      reset();
      toast.success("Comment Added!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add comment");
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit((values) =>
          mutate({
            commentdata: { content: values.content },
            postId: postId,
          }),
        )}
        className="w-full"
      >
        <div className="relative w-full rounded-2xl border-2 border-pacifika/30 bg-white focus-within:border-pacifika transition-colors shadow-sm">
          <textarea
            placeholder="Dela dina tankar / Add your comment here..."
            rows={3}
            className="w-full resize-none rounded-2xl p-4 pb-14 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
            {...register("content")}
          />

          <div className="absolute bottom-3 right-3">
            <button
              type="submit"
              disabled={isPending}
              className="button-secondary text-xs px-3.5 py-1.5 shadow-sm disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Comment"}
            </button>
          </div>
        </div>

        {errors.content && (
          <p className="mt-1 text-xs text-red-500 pl-2">
            {errors.content.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddComment;
