import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Shield,
} from "lucide-react";

export default function Footer() {
  const integrations = [
    {
      to: "/content-creators",
      label: "Redistribute TikTok Videos",
      implemented: false,
    },
    {
      to: "/content-creators",
      label: "Redistribute Instagram Reels",
      implemented: false,
    },
    {
      to: "/content-creators",
      label: "Redistribute Facebook Reels",
      implemented: false,
    },
    {
      to: "/content-creators",
      label: "Redistribute Facebook Videos",
      implemented: false,
    },
  ];

  const product = [
    { to: "/login", label: "Login", implemented: true },
    { to: "/pricing", label: "Pricing", implemented: true },
    { to: "/content-creators", label: "Content Creators", implemented: true },
    { to: "/small-business", label: "Small Business", implemented: true },
    { to: "/contact", label: "Help Center", implemented: true },
    { to: "/shopping", label: "Redistribute Merch Store", implemented: true },
  ];

  const resources = [
    { to: "/about", label: "Blog", implemented: false },
    {
      to: "/content-creators",
      label: "Content Repurposing Guide",
      implemented: false,
    },
    {
      to: "/content-creators",
      label: "Redistribute Onboarding Video",
      implemented: false,
    },
    {
      to: "/content-creators",
      label: "33 Ways To Redistribute Your Videos",
      implemented: false,
    },
  ];

  const company = [
    {
      to: "/terms-and-conditions",
      label: "Terms of Service",
      implemented: true,
    },
    { to: "/privacy-policy", label: "Privacy Policy", implemented: true },
    { to: "/contact", label: "Contact Us", implemented: true },
    { to: "/about", label: "About Us", implemented: true },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Integrations</h3>
            <ul className="space-y-2">
              {integrations.map((link, idx) => (
                <li key={idx}>
                  {link.implemented ? (
                    <Link
                      href={link.to}
                      className="text-gray-600 hover:text-accent transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400 line-through text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              {product.map((link, idx) => (
                <li key={idx}>
                  {link.implemented ? (
                    <Link
                      href={link.to}
                      className="text-gray-600 hover:text-accent transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400 line-through text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link, idx) => (
                <li key={idx}>
                  {link.implemented ? (
                    <Link
                      href={link.to}
                      className="text-gray-600 hover:text-accent transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400 line-through text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((link, idx) => (
                <li key={idx}>
                  {link.implemented ? (
                    <Link
                      href={link.to}
                      className="text-gray-600 hover:text-accent transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400 line-through text-sm cursor-not-allowed">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Copyright © {new Date().getFullYear()}{" "}
              <span className="font-semibold">Redistribute.io</span> Inc. All
              Rights Reserved.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-accent transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-accent transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-accent transition">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-accent transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-accent transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-accent transition"
            >
              <Shield />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
