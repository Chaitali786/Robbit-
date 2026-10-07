
'use client'
import { DeleteCommentAction } from '@/actions/delete-comment-action'
import { useMutation } from '@tanStack/react-query';
import React from 'react'
import { toast } from 'sonner';

const DeleteComment = ({commentId}:{commentId:number}) => {
  const { mutate, error } = useMutation({
      mutationFn: DeleteCommentAction,
     
      onSettled: () => toast("Comment Deleted!"),
    });
  return (
    <div><button 
    onClick={()=>mutate(commentId)}
    className="button-secondary ">Delete Comment {commentId}</button></div>
  )
}

export default DeleteComment