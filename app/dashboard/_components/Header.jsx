"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, Mail, Info, Menu, X } from "lucide-react";
import { Button } from "../../dashboard/_components/button";

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/contact", label: "Contact Us", icon: Mail },
    { href: "/about", label: "About", icon: Info },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              width={60}
              height={50}
              alt="logo"
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-primary">MockAI</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-primary/10 ${
                  path === item.href
                    ? "text-primary font-semibold bg-primary/20"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
      >
        <div className="p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
                path === item.href
                  ? "text-primary font-semibold bg-primary/20"
                  : "text-gray-600 hover:text-primary hover:bg-primary/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
