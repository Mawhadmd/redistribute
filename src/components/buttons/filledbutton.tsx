import React from 'react'
import { Link } from 'react-router'

export default function FilledButton({text, style, to}: {text: string, style?: string, to?: string}) {
  if (to) {
    return (
      <Link to={to} >
          <button className={`w-fit min-w-44 h-12 border bg-accent rounded-lg text-xl text-primary font-bold ${style}`}>
          {text}
        </button>
      </Link>
    )
  }
  
  return (
      <button className={`w-fit min-w-44 h-12 border bg-accent rounded-lg text-xl text-primary font-bold ${style}`}>
          {text}
        </button>
  )
}
