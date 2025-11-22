import React from "react";


import TrustedPartners from "../../components/TrustedPartners.tsx";
import About from "./About.tsx";
import Contact from "./Contact.tsx";
import ContentCreators from "./ContentCreators.tsx";
import Pricing from "./Pricing.tsx";
import SmallBusiness from "./SmallBusiness.tsx";

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
