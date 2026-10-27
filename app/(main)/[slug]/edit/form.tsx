"use client";
import { type Tables } from "@/lib/supabase/database.types";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "@/actions/schemas";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "@/actions/edit-page-action";
import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditPageForm = ({
  initialValues,
  post_id,
}: {
  initialValues: Pick<Tables<"Post">, "title" | "content" | "image">;
  post_id: string;
}) => {
  const postImageSchema = postSchema
    .omit({ image: true, category: true })
    .extend({
      image: z
        .unknown()
        .transform((value) => {
          return value as FileList;
        })
        .optional(),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title || undefined,
      content: initialValues.content || undefined,
      image: initialValues.image || undefined,
    },
  });

  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: EditPost,
    onSuccess: (data) => {
      if (data?.slug) {
        router.push(`/${data.slug}`);
        router.refresh();
      }
    },
    onError: (err: any) => {
      console.error("Edit error:", err.message);
      alert(err.message || "Failed to update post");
    },
  });

  return (
    <>
      <div>EditPageForm</div>
      <form
        onSubmit={handleSubmit((values) => {
          let imageForm = undefined;
          if (values.image && typeof values.image !== "string") {
            imageForm = new FormData();
            imageForm.append("image", values.image[0]);
          }

          mutate({
            postdata: {
              title: initialValues.title || values.title,
              content: values.content,
              image: imageForm,
            },
            post_id,
          });
        })}
        className="flex flex-col w-full m-auto border-3 rounded-2xl text-left border-sushi p-4 mb-4 "
      >
        <label htmlFor="title"> Title (Cannot be changed) </label>
        <input
          className="input"
          placeholder="Title"
          {...register("title")}
          readOnly
        />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="content"> Add Some Content(Optional) </label>
        <textarea
          className="input"
          placeholder="content"
          {...register("content")}
        />
        {error && <ErrorMessage error={error.message} />}

        {initialValues.image && (
          <img
            src={initialValues.image}
            alt={initialValues.title ? initialValues.title : ""}
          />
        )}

        <label htmlFor="image">
          Do you want to Change an Image? (Optional)
        </label>
        <input
          className="input file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pacifika file:text-ch hover:file:bg-sushi file:cursor-pointer text-xs text-slate-500 cursor-pointer"
          type="file"
          {...register("image")}
        />
        {error && <ErrorMessage error={error.message} />}

        <button className="button m-4">Edit Post</button>
      </form>
    </>
  );
};

export default EditPageForm;
