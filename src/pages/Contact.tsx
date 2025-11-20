import ContactCards from "../components/ContactCards.tsx";
import { Mail, MessageCircleIcon, MessageSquareMore, MessageSquareMoreIcon } from "lucide-react";

export default function Contact() {
  return (
    <div >
      <h1 className="text-2xl  font-bold text-center mb-4">Contact</h1>
     <div className="flex justify-center items-center gap-2 flex-wrap">
      <ContactCards icon={<Mail className="size-10 text-accent"/>} title="Email" availablity="Available 24/7 - Response in 24 hours" />

      <ContactCards icon={<MessageCircleIcon className="size-10 text-accent"/>} title="Live Chat" availablity="Not available" available={false} />
      <ContactCards icon={<MessageSquareMoreIcon className="size-10 text-accent"/>} title="Community" availablity="Coming Soon" available={false} />
     </div>
    </div>
  );
}
