import React, { useEffect } from "react";

export default function EmailContact() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    useEffect(() => {
        const t = setTimeout(() => {
            setSubmitted((s)=>false)
        }, 3000);
        return () => {
            clearTimeout(t)
        };
    }, [submitted]);
    const submit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!name || !email || !message) {
            return;
        }
        console.log("Form submitted:", { name, email, message });
        setMessage("");
        setName("");
        setEmail("");
        setSubmitted(true);
    }
  return (
    <>
    <h1 className="text-4xl font-bold text-center mb-4">Send an Email</h1>
    <form onSubmit={submit} className="sm:w-[30%]  mx-auto flex flex-col justify-center flex-1  text-secondary">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full mb-4 p-2 border border-accent rounded text-secondary"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full mb-4 p-2 border border-accent rounded text-secondary"
      />
      <textarea
        placeholder="Your Message"
        className="w-full p-2 border border-accent rounded text-secondary"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-accent text-white rounded"
      >
        Send
      </button>
        {submitted && <p className="text-green-500 mt-2">Message sent successfully!</p>}
    </form></>
  );
}
