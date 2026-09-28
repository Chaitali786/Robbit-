"use server";

import { createClient } from "@/lib/supabase/serverClients";
import { redirect } from "next/navigation";
import { loginSchema } from "./schemas";
import z from "zod";

export const LogIn = async (userdata: z.infer<typeof loginSchema>) => {
 
  //colsole.log(errors)
  //const parseData = loginSchema.parse(userdata);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(userdata);
  if (error) throw error;

  redirect("/");
};
