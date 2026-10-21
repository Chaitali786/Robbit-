"use server";

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/lib/supabase/serverClients";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "@/lib/supabase/slugify";
import uploadImages from "@/lib/supabase/upload-images";

export const EditPost = async ({
  postdata,
  post_id,
}: {
  postdata: z.infer<typeof postSchema>;
  post_id: string;
}) => {
  //const parsedData = postSchema.parse(postdata);
  const supabase = await createClient();

  const imageFile = postdata.image?.get("image");

  const { data: post, error } = await supabase
    .from("Post")
    .select("*")
    .eq("post_id", post_id)
    .single();

  if (!post) throw new Error("Post doesn't exists !!!");

  let imageUrl = post.image;

  if (typeof imageFile !== "undefined") {
    if (!(imageFile instanceof File) && imageFile !== null) {
      throw Error("Image is not in a valid format");
    }
    imageUrl = imageFile ? await uploadImages(imageFile) : null;
  } else {
    imageUrl = post.image;
  }

  const { data: updatedPost } = await supabase
    .from("Post")
    .update({ content: postdata.content, image: imageUrl })
    .eq("post_id", post_id)
    .select("slug")
    .single()
    .throwOnError();

  revalidatePath("/");
  revalidatePath(`/${updatedPost.slug}`);
  //redirect(`/${updatedPost.slug}`);
  return { slug: updatedPost.slug };
};
