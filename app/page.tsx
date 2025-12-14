"use client";

import { useRef, useState, useEffect } from "react";
import FilledButton from "./components/buttons/filledbutton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import TrustedPartners from "./components/TrustedPartners";
import PricingCards from "./components/PricingCards";
import Link from "next/link";
import {
  Github,
  Mail,
  MessageCircleIcon,
  MessageSquareMoreIcon,
} from "lucide-react";
import ContactCards from "./components/ContactCards";

export default function Home() {
  const pathname = usePathname();
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
    <div>
      {/* Content Creators Section */}
      <div className="flex-col md:!h-[calc(100vh-132px)] justify-between items-center mx-auto sm:w-[80%] gap-20 py-5 sm:flex-row flex">
        <div className="flex-col justify-between flex space-y-6 sm:w-1/2 items-center sm:items-start text-center sm:text-left">
          <div className="text-accent font-semibold">
            Handling the time-consuming tasks for you
          </div>
          <div>
            <h2 className="text-5xl font-semibold mb-4">
              Content Creators' Dream Tool: Post Once, Reach Everywhere
            </h2>
            <p className="sm:text-xl">
              Reach larger audience, gain more followers, and grow your accounts
              through seamless omnipresence and automated content sharing.
            </p>
          </div>

          <div>
            <FilledButton
              to="/register"
              text="Start your 14-day free trial >"
              style="font-semibold w-fit !px-10 !py-4 h-fit"
            />
            <p className="text-secondary/80 ml-2"> No credit card required</p>
          </div>
        </div>
        <div className="sm:w-1/2">
          <video src={"/landing-03-tiktok.mp4"} autoPlay loop muted></video>
        </div>
      </div>

      {/* Small Business Section */}
      <div className="flex-col justify-between items-center mx-auto sm:w-[80%] gap-20 py-5 sm:flex-row-reverse flex">
        <div className="flex-col justify-between flex space-y-6 sm:w-1/2 items-center sm:items-start text-center sm:text-left">
          <div className="text-accent font-semibold">
            Handling the time-consuming tasks for you
          </div>
          <div>
            <h2 className="text-5xl font-semibold mb-4">
              Distribute Your Content Everywhere - All at Once
            </h2>
            <p className="sm:text-xl">
              Greater reach, brand visibility, and sales growth through seamless
              omnipresence and automated content sharing.
            </p>
          </div>

          <div>
            {pathname != "/" && (
              <>
                <FilledButton
                  text="Start your 14-day free trial >"
                  to="/register"
                  style="font-semibold w-fit !px-10 !py-4 h-fit"
                />
                <p className="text-secondary/80 ml-2">
                  {" "}
                  No credit card required
                </p>
              </>
            )}
          </div>
        </div>
        <div className="sm:w-1/2">
          <Image src="/REPURPOSE.webp" alt="Image" width={600} height={400} />
        </div>
      </div>

      <TrustedPartners />

      {/* Pricing Section */}
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

      {/* About Section */}
      <div className="text-center justify-center flex flex-col items-center mx-4 my-8">
        <h1 className="text-4xl font-bold">What about us</h1>
        <p className="max-w-sm text-lg mt-5">
          By using our service you agree to giving us access to your accounts as
          a limited moderators. <br /> <br /> This will allow us to better serve
          you and provide a more personalized experience. <br /> <br /> Please
          for better understanding check out our{" "}
          <Link className="text-accent underline" href="/terms-and-conditions">
            terms and conditions
          </Link>
          . <br /> <br /> This is a demo project and we do not actually moderate
          or access any accounts.
        </p>
        <br></br>
        Visit The source code here:
        <a href="https://github.com/Mawhadmd/redistribute" target="_blank">
          <Github className="bg-secondary text-accent p-2 size-12 rounded-full m-1 hover:text-white transition-all cursor-pointer" />
        </a>
      </div>

      {/* Contact Section */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Contact</h1>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <ContactCards
            icon={<Mail className="size-10 text-accent" />}
            title="Email"
            availablity="Available 24/7 - Response in 24 hours"
          />

          <ContactCards
            icon={<MessageCircleIcon className="size-10 text-accent" />}
            title="Live Chat"
            availablity="Not available"
            available={false}
          />
          <ContactCards
            icon={<MessageSquareMoreIcon className="size-10 text-accent" />}
            title="Community"
            availablity="Coming Soon"
            available={false}
          />
        </div>
      </div>
    </div>
  );
}
