import { HomePostType } from '@/lib/supabase/queries'
import Link from 'next/link'
import React from 'react'

const HomePosts = ({posts}:{posts : HomePostType}) => {
  return (
    <div>HomePosts
          { posts.map(post => 
          <Link key={post.post_id} className="block border border-sushi p-4 rounded-2xl m-4" href={`/${post.slug}`}>
            <h3 className = "font-bold text-2xl">{post.title}</h3>
            <p className="text-right">posted by - {post.author.username}</p>
          </Link>
        )}
    </div>
    
  )
}

export default HomePosts