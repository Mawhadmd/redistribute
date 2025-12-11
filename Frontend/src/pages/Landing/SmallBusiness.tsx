import React from "react";
import FilledButton from "../../components/buttons/filledbutton.tsx";
import { useLocation } from "react-router";

export default function SmallBusiness() {
  const location = useLocation();
  return (
    <div className="flex-col justify-between items-center mx-auto sm:w-[80%] gap-20 py-5 sm:flex-row-reverse flex ">
      <div className="flex-col justify-between  flex space-y-6 sm:w-1/2 items-center sm:items-start text-center sm:text-left">
        <div className="text-accent font-semibold">
          Handling the time-consuming tasks for you
        </div>
        <div>
          <h2 className="text-5xl font-semibold mb-4">
            Distribute Your Content Everywhere - All at Once
          </h2>
          <p className=" sm:text-xl">
            Greater reach, brand visibility, and sales growth through seamless
            omnipresence and automated content sharing.
          </p>
        </div>

        <div>
          {location.pathname != "/" && (
            <>
              <FilledButton
                text="Start your 14-day free trial >"
                to='/register'
                style=" font-semibold  w-fit !px-10 !py-4  h-fit"
              />
              <p className="text-secondary/80 ml-2 ">
                {" "}
                No credit card required
              </p>
            </>
          )}
        </div>
      </div>
      <div className="sm:w-1/2">
        <img src="/REPURPOSE.webp" alt="Image" />
      </div>
    </div>
  );
}
