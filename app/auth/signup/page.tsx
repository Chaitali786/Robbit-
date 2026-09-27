import Link from "next/link";
import React from "react";
import SignUpForm from "./form";

const SignUpPage = () => {
  return (
    <div className="text-center ">
      <h1 className="heading my-4">Signup to Robbit !</h1>
      <SignUpForm/>
      <Link href="/auth/login">
        Already have an account? <span className="text-pacifika font-bold">LogIn Here !</span>
      </Link>
    </div>
  );
};

export default SignUpPage;
