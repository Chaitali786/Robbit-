import { createBrowserClient } from "@supabase/ssr";
import React from "react";
import { Database } from "./database.types";

const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  );
};

export default createClient;
