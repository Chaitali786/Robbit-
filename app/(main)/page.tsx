


import { getHomePosts } from "@/lib/supabase/queries";
import HomePosts from "../components/HomePosts/HomePosts";
import { createClient } from "@/lib/supabase/serverClients";
import Link from "next/link";

export const revalidate =600
export default async  function Home() {
   const supabase = await createClient() 
   const {data, error} = await getHomePosts(supabase)

   console.log("Server" , data)
  return (
    <div className="m-4 ">  
             
       
       <main className="max-w-6xl mx-auto px-4 py-8">
    
      <section className="mb-10 text-center space-y-3">
        
        <h1 className="text-4xl md:text-5xl font-black text-pacifika tracking-tight">
          Master Swedish Together
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-base">
          Explore vocabulary, solve tricky grammar questions, and share daily phrases with other learners.
        </p>

        
      </section>

     
      {data && <HomePosts posts={data} />}
    </main>
    </div>
  );
}
