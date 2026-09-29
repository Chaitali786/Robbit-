'use client'
import React from 'react'
import {toast} from 'sonner'
import {useMutation} from '@tanStack/react-query'
import { DeletePost } from '@/actions/delete-actions'

const DeleteButton = ({id}:{id:string}) => {
  const {mutate} = useMutation(
    {
      mutationFn:DeletePost ,
      onSettled : () => toast("Deleted")
    }
  )
  return (
    <>
    
    <button onClick ={() => mutate(id)}className = "button-secondary">Delete Post</button>
    </>
  )
}

export default DeleteButton

