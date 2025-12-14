import Image from "next/image";

export default function TrustedPartners() {
  return (
    <div className="border-y border-secondary/20 my-12 sm:my-24">
      <div className="my-4 flex items-center md:w-[60%] px-10 md:px-0 mx-auto sm:gap-10 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trusted integration partners</h1>
          <p>
            <span className="text-accent font-bold">#1</span> content
            repurposing platform
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="bg-secondary/10 inline p-2 rounded-md aspect-square size-10">
            <Image
              src="/instagram.webp"
              alt="Instagram"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </div>
          <div className="bg-secondary/10 inline p-2 rounded-md aspect-square size-10">
            <Image
              src="/youtube-shorts-icon-1-1.webp"
              alt="Youtube"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </div>
          <div className="bg-secondary/10 inline p-2 rounded-md aspect-square size-10">
            <Image
              src="/tiktok-icon-3-1.webp"
              alt="Tiktok"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </div>
          <div className="bg-secondary/10 inline p-2 rounded-md aspect-square size-10">
            <Image
              src="/facebook.webp"
              alt="Facebook"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
