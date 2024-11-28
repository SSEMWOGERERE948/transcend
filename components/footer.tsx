import Link from 'next/link';
import {  Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.jpg"
            alt="Doda Logo"
            className="h-12 w-12" // Updated size
            />
          <span className="text-xl font-bold text-purple-600">Doda</span>
        </Link>
            <p className="text-gray-600">
              Crafting joy through handmade crochet pieces, bringing warmth and style to your everyday life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Kampala, Uganda</li>
              <li>dodacrochets@gmail.com</li>
              <li>+256 726 219 235</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Doda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="h-6 w-6" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="h-6 w-6" />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="h-6 w-6" />,
  },
];