"use client";

import { useEffect, useState } from "react";
import { Mail, Clock, CheckCircle2 } from "lucide-react";

export default function EmailContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!subject) newErrors.subject = "Please select a subject";
    if (!message.trim()) newErrors.message = "Message is required";
    else if (message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form submitted:", { name, email, subject, message });
    setMessage("");
    setName("");
    setEmail("");
    setSubject("");
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-2">Message Sent!</h2>
        <p className="text-gray-600">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <Mail className="w-16 h-16 text-accent mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a question or want to work together? Send us a message and we'll
          respond within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Mail className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-gray-600">support@redistribute.io</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Response Time</h3>
          <p className="text-sm text-gray-600">Within 24 hours</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Availability</h3>
          <p className="text-sm text-gray-600">24/7 Support</p>
        </div>
      </div>

      <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-accent"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-accent"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Subject *</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.subject ? "border-red-500" : "border-accent"
            }`}
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="billing">Billing Question</option>
            <option value="partnership">Partnership Opportunity</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Message *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us how we can help..."
            className={`w-full p-2 border rounded ${
              errors.message ? "border-red-500" : "border-accent"
            }`}
            rows={6}
          ></textarea>
          <div className="flex justify-between items-center mt-1">
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {message.length} characters
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-accent text-white rounded font-semibold hover:bg-accent/90 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3 text-left max-w-2xl mx-auto">
          <details className="bg-gray-50 p-4 rounded">
            <summary className="font-semibold cursor-pointer">
              How quickly will I get a response?
            </summary>
            <p className="mt-2 text-gray-600">
              We respond to all inquiries within 24 hours during business days.
            </p>
          </details>
          <details className="bg-gray-50 p-4 rounded">
            <summary className="font-semibold cursor-pointer">
              What information should I include?
            </summary>
            <p className="mt-2 text-gray-600">
              Please provide as much detail as possible about your inquiry to
              help us assist you better.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
