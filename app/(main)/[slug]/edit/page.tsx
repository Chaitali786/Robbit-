import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClients";
import { redirect } from "next/navigation";
import React from "react";
import EditPageForm from "./form";


const EditPagePost = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("User from Slug: ", user);
  const { data, error } = await getSinglePost(slug);

  if (user && data && user.id !== data.author.id) {
    redirect("/");
  }

  return (
    <>
    { data &&
      <div className ="border border-sushi p-4 rounded-2xl mt-8 max-w-md m-auto">
      <h1 className="heading">Edit {data.title}</h1>
      <EditPageForm initialValues ={{title:data.title, content: data.content}}/>
      </div>
    }
    </>
    
  );
};

export default EditPagePost;
