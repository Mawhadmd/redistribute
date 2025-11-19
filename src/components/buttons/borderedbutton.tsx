import React from 'react'

export default function BorderedButton({text, style}: {text: string, style?: string}) {
  return (
     <button  className={`w-fit min-w-44 h-12 border border-accent flex justify-center items-center rounded-lg text-xl text-accent font-bold ${style}`}>
          {text}
        </button>
  )
}
