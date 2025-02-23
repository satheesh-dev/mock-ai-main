import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">AI Mock</h3>
          <p className="text-gray-400">
            Empowering job seekers with AI-powered mock interviews.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-gray-400 hover:text-white">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} AI Mock. All rights reserved.</p>
      </div>
    </footer>
  );
}
