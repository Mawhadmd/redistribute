import tiktok from "../assets/tiktok-icon-3-1.webp";
import instagram from "../assets/instagram.webp";
import youtube from "../assets/youtube-shorts-icon-1-1.webp";
import facebook from "../assets/facebook.webp";

export default function TrustedPartners() {
  return (
    <div className="border-y border-secondary/20 my-24"> 
      <div className= "my-4 flex items-center w-[60%] mx-auto gap-10">
      <div>
        <h1 className="text-2xl font-bold">Trusted integration partners</h1>
        <p >
          <span className="text-accent font-bold">#1</span> content repurposing platform
        </p>
      </div>
      <div className="flex gap-5 items-center">
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
        <div>And more...</div>
      </div>
    </div>
    </div>
  );
}
