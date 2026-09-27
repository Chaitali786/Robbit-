import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div>
      Sign Up Page
      <Link className="heading m-4  " href="/signup">
        Signup Here
      </Link>
    </div>
  );
};

export default SignUpPage;
