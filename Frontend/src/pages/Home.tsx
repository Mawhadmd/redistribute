

import TrustedPartners from "../components/TrustedPartners.tsx";
import About from "./Landing/About.tsx";
import Contact from "./Landing/Contact.tsx";
import ContentCreators from "./Landing/ContentCreators.tsx";
import Pricing from "./Landing/Pricing.tsx";
import SmallBusiness from "./Landing/SmallBusiness.tsx";

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
