'use client'
import { searchPosts, SearchResultsType } from '@/lib/supabase/queries'
import Link from 'next/link'
import { SetStateAction, useState } from 'react'

const search = () => {
  const [input, setInput] =useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(null)

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
   setInput(e.target.value)
  }

  const handleClick = async() => {
   const {data, error} = await searchPosts(input)
   if(error) throw new Error
   setSearchResults(data)
   //console.log("Result of Search Is : ",data)
  }


  return (
    <div className="relative w-full max-w-md">
       <div className="flex flex-1 items-center justify-between rounded-full border-2 border-pacifika bg-ivory shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-saratoga focus-within:border-transparent transition-all">
      <input
        className="w-full flex-1 px-4 py-2 text-sm bg-transparent outline-none"
        onChange={handleChange}
        placeholder="search for posts"
        value={input}
      />
      <button
        className="cursor-pointer bg-pacifika text-ch font-semibold text-xs px-4 py-2.5 hover:bg-sushi transition-colors shrink-0"
        onClick={handleClick}
      >
        Search
      </button>
       </div>
        {searchResults &&           
          <div className="absolute left-0  rounded-2xl top-full border-pacifika border p-2 w-full bg-ivory z-50 ">
           {
            searchResults.length > 0 ? (
                 searchResults.map((result,index) => 
            <Link className="block " key={index} href={`/${result.slug}`}>{result.title}</Link>
            )

            ):(<p className="p-3 text-center text-xs text-slate-500"> No Post Found !!!! </p>)

           }
            






            
           

          </div>
        }
    </div>
    
  )
}

export default search

