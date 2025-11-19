import React from 'react'

export default function FilledButton({text, style}: {text: string, style?: string}) {
  return (
      <button className={`w-fit min-w-44 h-12 border bg-accent rounded-lg text-xl text-primary font-bold ${style}`}>
          {text}
        </button>
  )
}
