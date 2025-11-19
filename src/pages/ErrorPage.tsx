import { CircleOff } from 'lucide-react'
import React from 'react'

export default function ErrorPage() {
  return (
    <div className='flex flex-col justify-center items-center  '>
       <CircleOff className='size-20 text-red-500 mb-4'/>
       <h1 className='text-3xl font-bold mb-2'>404 - Page Not Found</h1>
       <p className='text-secondary/80 text-center'>The page you are looking for either does not exist or hasn't been created yet.</p>
         </div>
  )
}
