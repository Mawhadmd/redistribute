import Link from "next/link";
import Image from "next/image";
import BorderedButton from "./buttons/borderedbutton";

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
        <small className="mx-auto block">
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
          <Image
            src="/instagram.webp"
            alt="Instagram"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <Image
            src="/youtube-shorts-icon-1-1.webp"
            alt="Youtube"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <Image
            src="/tiktok-icon-3-1.webp"
            alt="Tiktok"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </div>
        <div className="bg-secondary/10 p-2 rounded-md">
          <Image
            src="/facebook.webp"
            alt="Facebook"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </div>
      </div>
      <BorderedButton
        text={plan.buttonText}
        style={"p-2 text-sm !w-full"}
        to={plan.buttonText.startsWith("Contact") ? "/contact" : "/login"}
      />
    </div>
  );
}
