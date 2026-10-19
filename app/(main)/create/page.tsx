'use client'

import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {CreatePost} from "@/actions/create-post-action"
import { useMutation } from "@tanStack/react-query";
import z from "zod";

const CATEGORIES = [
  "Workplace & Culture",
  "Everyday Slang",
  "Grammar (Grammatik)",
  "Vocabulary",
  "SFI Help",
  "Culture & Customs",
];

const CreatePostPage = () => {
  const postImageSchema = postSchema.omit({image: true}).extend({image: z.unknown().transform(value => {return value as FileList}).optional()})
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema)
  });
  
   const {mutate ,error,isPending} =  useMutation({
      mutationFn: CreatePost
    })

  return (
    <div className="w-lg m-auto  ">
      <h1 className="heading">Create A Post</h1>
      <form 
       onSubmit={handleSubmit((values) =>{
         const imageForm = new FormData()
         if (values.image) imageForm.append('image',values.image[0])
          
        mutate({title:values.title,
          content:values.content,
          category: values.category,
          image:imageForm
        })
       }
       
      )}
       className="flex flex-col w-full m-auto border-3 rounded-2xl text-left border-sushi p-4 mb-4 ">
        <label htmlFor="category">Category</label>
        <select
          className="input bg-white cursor-pointer"
          defaultValue=""
          {...register("category")}
        >
          <option value="" disabled>
            Select a category...
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <ErrorMessage error={errors.category.message!} />}
        
        <label htmlFor="title"> Title</label>
        <input className="input" placeholder="Title" {...register("title")} />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="content"> Add Some Content(Optional)</label>
        <textarea
          className="input"
          placeholder="content"
          {...register("content")}
        />
        <label htmlFor="image">Add an Image (Optional)</label>
        <input className = "input" type="file" {...register("image")}/>
         {error && <ErrorMessage error={error.message}/>}

        <button className="button m-4">Create Post</button>
       {error && <ErrorMessage error={error.message}/>}
      </form>
    </div>
  );
};

export default CreatePostPage;
