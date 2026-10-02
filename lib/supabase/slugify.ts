import React from 'react'

const slugify = (text:string) => {
  
   return text
   .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "") 
    .slice(0, 10);
   //.trim().replace(/[^\w]/g, "")
   //console.log(text)
  
}

export default slugify