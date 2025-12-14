"use client";

import { useRef, useState, useEffect } from "react";
import PricingCards from "../../components/PricingCards";

export default function PricingPage() {
  const button = useRef(null);
  const basePrices = [0.99, 2.99, 9.99];
  const [ismonthly, setMonthly] = useState(true);
  const [plans, setPlans] = useState([
    {
      title: "Starter",
      pricePerDay: 0.99,
      description:
        "Perfect for solo content creators, small business owners, and entrepreneurs.",
      features: [
        "✔️  3 Accounts per Social Media Channel",
        "✔️  1,000 Published Videos Per Month",
        "✔️  Premium Social Pack",
        "✔️  Live Support",
      ],
      buttonText: "Start 14-day Free Trial",
    },
    {
      title: "Pro",
      pricePerDay: 2.99,
      description:
        "Ideal for growing businesses, marketing teams, and influencers.",
      features: [
        "✔️  10 Accounts per Social Media Channel",
        "✔️  10,000 Published Videos Per Month",
        "✔️  Advanced Analytics & Reporting",
        "✔️  Priority Support",
      ],
      buttonText: "Start 14-day Free Trial",
    },
    {
      title: "Enterprise",
      pricePerDay: 9.99,
      description:
        "Best for large enterprises, agencies, and organizations with extensive needs.",
      features: [
        "✔️  Unlimited Accounts per Social Media Channel",
        "✔️  Unlimited Published Videos Per Month",
        "✔️  Dedicated Account Manager",
        "✔️  Custom Integrations & Features",
      ],
      buttonText: "Contact Sales",
    },
  ]);

  useEffect(() => {
    if (ismonthly) {
      setPlans(
        plans.map((plan, idx) => ({ ...plan, pricePerDay: basePrices[idx] }))
      );
    } else {
      setPlans(
        plans.map((plan, idx) => ({
          ...plan,
          pricePerDay: Number(((basePrices[idx] * 335) / 365).toFixed(2)),
        }))
      );
    }
  }, [ismonthly]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl font-bold">
        A couple of cents can save you hours of work.
      </h2>
      <p className="mt-2 text-xl">
        Upload 10 videos for free; no credit card required
      </p>
      <div className="flex gap-2 justify-center items-center mt-12 mb-4 text-xl">
        <div className="font-bold">
          Yearly <span className="text-accent">(30 days for free)</span>
        </div>
        <div
          className="h-8 drop-shadow-sm aspect-[16/9] rounded-full bg-accent/50 relative cursor-pointer"
          onClick={() => setMonthly(!ismonthly)}
        >
          <div
            style={{
              transform: !ismonthly ? "translateX(-10%)" : "translateX(90%)",
            }}
            ref={button}
            className="absolute transition-all ease-out bg-primary shadow rounded-full aspect-square w-8 h-8"
          ></div>
        </div>
        <div className="font-bold">Monthly</div>
      </div>
      <div className="flex justify-center items-center sm:p-10 !pt-4 flex-wrap">
        {plans.map((plan, idx) => (
          <PricingCards monthly={ismonthly} plan={plan} idx={idx} key={idx} />
        ))}
      </div>
    </div>
  );
}
