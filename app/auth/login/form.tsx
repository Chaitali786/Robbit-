"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LogIn } from "@/actions/login-action";
import { loginSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useMutation } from "@tanStack/react-query";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  //console.log("Errors:", errors);
  const {mutate ,error,isPending} =  useMutation({
    mutationFn: LogIn
  })
  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex flex-col max-w-md m-auto border-3 rounded-2xl text-left border-sushi p-4 mb-4 "
      >
        <label htmlFor="email"> Enter Email</label>
        <input
          className="input"
          {...register("email")}
          name="email"
          placeholder="Email"
        />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password"> Enter Password</label>
        <input
          className="input"
          {...register("password")}
          name="password"
          placeholder="Password"
          type="password"
        />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <button >{isPending ? "Logging in" : "Log In!"}</button>
        {error && <ErrorMessage error={error.message}/>}
      </form>
    </div>
  );
};

export default LogInForm;
