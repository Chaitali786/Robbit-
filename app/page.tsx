

import Header from "./components/Header/Header";
import { getHomePosts } from "@/lib/supabase/queries";
import HomePosts from "./components/HomePosts/HomePosts";

export default async  function Home() {
   
   const {data, error} = await getHomePosts()
   console.log("Server" , data)
  return (
    <div className="m-4 ">
      
      <main className="">        
       
        <h1 className ="heading "> Welcome To Robbit !</h1>
        {
          data && <HomePosts posts={data}></HomePosts>
          
        }
      </main>
    </div>
  );
}
