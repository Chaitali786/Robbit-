import React from 'react'
import { type Tables } from '@/lib/supabase/database.types'

const EditPageForm = ({initialValues}: { initialValues: Pick<Tables<"Post">, "title" | "content">}) => {
  return (
    <>
    <div>EditPageForm</div>
    </>
    
  )
}

export default EditPageForm