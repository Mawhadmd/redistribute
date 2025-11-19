import React from "react";
import SmallBusiness from "./SmallBusiness.tsx";
import ContentCreators from "./ContentCreators.tsx";
import Pricing from "./Pricing.tsx";

import TrustedPartners from "../components/TrustedPartners.tsx";
import About from "./About.tsx";
import Contact from "./Contact.tsx";

export default function Home() {
  return (
    <div>
      <ContentCreators />
      <SmallBusiness />
      <TrustedPartners />
      <Pricing />
      <About />
      <Contact />
    </div>
  );
}
