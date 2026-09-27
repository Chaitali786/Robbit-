
'use client'
const SignUpForm = () => {
  
  return (
    <div>
      <form className="flex flex-col max-w-md m-auto border-3 rounded-2xl text-left border-sushi p-4 mb-4 ">
        <label htmlFor="username"> Enter Username</label>
        <input className="input" id="username" placeholder="Username"/>

        <label htmlFor="email"> Enter Email</label>
        <input className="input" id="email" placeholder="Email"/>

        <label htmlFor="password"> Enter Password</label>
        <input className="input" id="password" placeholder="Password"/>

        

      </form>
    </div>
  )
}

export default SignUpForm