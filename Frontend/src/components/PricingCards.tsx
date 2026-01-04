import React from "react";
import BorderedButton from "./buttons/borderedbutton.tsx";

import tiktok from "../assets/tiktok-icon-3-1.webp";
import instagram from "../assets/instagram.webp";
import youtube from "../assets/youtube-shorts-icon-1-1.webp";
import facebook from "../assets/facebook.webp";
import { Link } from "react-router";

export default function PricingCards({
  monthly,
  plan,
  idx,
}: {
  monthly: boolean;
  plan: {
    title: string;
    pricePerDay: number;
    description: string;
    features: string[];
    buttonText: string;
  };
  idx: number;
}) {
  return (
    <div
      key={idx}
      className={`aspect-[9/16] !w-1/4 min-w-[350px] flex flex-col items-center justify-around p-4 border ${
        idx == 0 && "bg-accent/5 border-accent/30"
      }  space-y-4  w-full m-4 rounded-3xl font-[500]`}
    >
      <b className="text-2xl">{plan.title}</b>
      <div>
        <p className="text-5xl text-accent">
          <b>${plan.pricePerDay}</b>/day
        </p>
        <small className=" mx-auto block">
          $
          {(monthly ? plan.pricePerDay * 30 : plan.pricePerDay * 365).toFixed(
            2
          )}{" "}
          paid {monthly ? "monthly" : "yearly"}
        </small>
      </div>
      <div className="text-secondary/80">{plan.description}</div>
      <ul className="text-start space-y-1">
        {plan.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <div className="flex gap-2"></div>
      <div className="flex gap-2">
        <div className="bg-secondary/10 p-2 rounded-md">
          <img src={instagram} alt="Instagram" className="h-6 w-6" />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <img src={youtube} alt="Youtube" className="h-6 w-6" />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <img src={tiktok} alt="Tiktok" className="h-6 w-6" />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <img src={facebook} alt="Facebook" className="h-6 w-6" />
        </div>
      </div>
      {plan.buttonText.startsWith("Contact") ? (
        <BorderedButton
          text={plan.buttonText}
          to="/contact"
          style={"p-2 text-sm !w-full"}
        />
      ) : (
        <BorderedButton
          text={plan.buttonText}
          style={"p-2 text-sm !w-full"}
          to="/login"
        />
      )}
    </div>
  );
}
