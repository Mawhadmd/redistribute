"use client";

import FilledButton from "../../components/buttons/filledbutton";
import Shopping from "../shopping/page";

export default function ContentCreatorsPage() {
  return (
    <div>
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
      <Shopping />
    </div>
  );
}
