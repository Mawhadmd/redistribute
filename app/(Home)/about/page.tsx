import Link from "next/link";
import { Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="text-center justify-center flex flex-col items-center mx-4 my-8">
      <h1 className="text-4xl font-bold">What about us</h1>
      <p className="max-w-sm text-lg mt-5">
        By using our service you agree to giving us access to your accounts as a
        limited moderators. <br /> <br /> This will allow us to better serve you
        and provide a more personalized experience. <br /> <br /> Please for
        better understanding check out our{" "}
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
  );
}
