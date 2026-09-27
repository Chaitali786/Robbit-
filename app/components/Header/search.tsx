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
    <div className="relative">
    <div className="border-pacifika border ">
      <input onChange ={handleChange} placeholder = "search for posts" value = {input}/>
      <button onClick={handleClick}>Search</button>
    </div>
    {searchResults && 
      <div className="absolute left-0 top-full border-pacifika border p-2 w-full bg-ivory ">
        {searchResults.map((result,index) => 
        <Link className="block " key={index} href={`/${result.slug}`}>{result.title}</Link>
        )}
      </div>
    }
    </div>
    
  )
}

export default search

function awaitsearchPosts(input: string): { data: any; error: any } {
  throw new Error('Function not implemented.')
}
