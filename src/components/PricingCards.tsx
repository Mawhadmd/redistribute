import React from 'react'
import BorderedButton from './buttons/borderedbutton.tsx'
import { Instagram, Youtube } from 'lucide-react'
import tiktok from '../assets/tiktok-svgrepo-com.svg'

export default function PricingCards({monthly, plan, idx}: {monthly: boolean, plan: {title: string, pricePerDay: number, description: string, features: string[], buttonText: string}, idx: number}) {
  return (
       <div
            key={idx}
            className={`aspect-[9/16] !w-1/4 min-w-[350px] flex flex-col items-center justify-around p-4 border ${
              idx == 0 && "bg-accent/5 border-accent"
            }  space-y-4 border-secondary w-full m-4 rounded-3xl font-[500]`}
          >
            <b className="text-2xl">{plan.title}</b>
            <div>
              <p className="text-5xl text-accent">
                <b>${plan.pricePerDay}</b>/day
              </p>
              <small className=" mx-auto block">
                ${(monthly ? plan.pricePerDay * 30 : plan.pricePerDay * 365).toFixed(2)} paid {monthly ? "monthly" : "yearly"}
              </small>
            </div>
            <div className='text-secondary/80'>{plan.description}</div>
            <ul className="text-start space-y-1">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
              <div className='flex gap-2'>
            <div className="bg-secondary/10 p-2 rounded-md">
                <Instagram />
            </div>
            <div className="bg-secondary/10 p-2 rounded-md">
            <Youtube />
            </div>
            <div className="bg-secondary/10 p-2 rounded-md">
                <img src={tiktok} alt="Tiktok" className="h-6 w-6" />
            </div>
              
           
              </div>
            <BorderedButton
              text={plan.buttonText}
              style={"p-2 text-sm !w-full"}
            />
          </div>
  )
}
