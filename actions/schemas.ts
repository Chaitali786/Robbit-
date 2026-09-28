import {z} from 'zod'

export const loginSchema = z.object(
  {email: z.email("Zod says incorrect email !") ,
   password: z.string().min(6,"Zod says no ! Password must be 6 characters long")
}
)  

export const signUpSchema = z.object(
  {
    username: z.string().min(8,"You need atleast 8 characters"),
   email: z.email("Zod says incorrect email !") ,
   password: z.string().min(6,"Zod says no ! Password must be 6 characters long")
}
)  