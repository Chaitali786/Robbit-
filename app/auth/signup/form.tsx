"use client";

import { signUpSchema } from "@/actions/schemas";
import { SignUp } from "@/actions/signup-actions";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm({
     resolver: zodResolver(signUpSchema),
   }); 
  return (
    <div>
      <form onSubmit={handleSubmit((values) => SignUp(values))}
      className="flex flex-col max-w-md m-auto border-3 rounded-2xl text-left border-sushi p-4 mb-4 ">
        <label htmlFor="username"> Enter Username</label>
        <input className="input"   {...register("username")}  placeholder="Username" />
         {errors.username && <ErrorMessage error ={errors.username.message!} />}

        <label htmlFor="email"> Enter Email</label>
        <input className="input"   {...register("email")}  placeholder="Email" />
         {errors.email && <ErrorMessage error ={errors.email.message!} />}
         
        <label htmlFor="password"> Enter Password</label>
        <input className="input" {...register("password")}    placeholder="Password" type = "password" />
         {errors.password && <ErrorMessage error ={errors.password.message!} />}

        <button >SignUp</button>
      </form>
    </div>
  );
};

export default SignUpForm;
