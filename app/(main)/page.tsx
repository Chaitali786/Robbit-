


import { getHomePosts } from "@/lib/supabase/queries";
import HomePosts from "../components/HomePosts/HomePosts";
import { createClient } from "@/lib/supabase/serverClients";


export default async  function Home() {
   const supabase = await createClient() 
   const {data, error} = await getHomePosts(supabase)

   console.log("Server" , data)
  return (
    <div className="m-4 ">
      
             
       
        <h1 className ="heading "> Welcome To Robbit !</h1>
        {
          data && <HomePosts posts={data}></HomePosts>          
        }
      
    </div>
  );
}
