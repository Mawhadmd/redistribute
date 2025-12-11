
import React from 'react'
import { Link } from 'react-router'

export default function ContactCards({icon, title, availablity, available}: {icon: React.ReactNode, title: string, availablity: string, available?: boolean}) {
  return (
    <Link
      to={available === false ? '#' : '/contact/' + title.toLowerCase().split(' ').join('-')}
      onClick={(e) => { if (available === false) e.preventDefault(); }}
      aria-disabled={available === false}
      tabIndex={available === false ? -1 : 0}
      className={`size-52 p-6 flex group flex-col items-center justify-center border border-gray-300 rounded-lg text-center m-2 hover:shadow-lg transition-shadow duration-300 ${available === false ? 'opacity-50 cursor-not-allowed shadow-sm' : 'cursor-pointer'}`}
    >
      <div>{icon}</div>
      <h2 className='text-xl font-semibold mt-4'>{title}</h2>
      <p className='text-secondary/50 text-sm mt-2'>{availablity}</p>
    </Link>
  )
}
