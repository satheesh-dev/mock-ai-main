import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "./dashboard/_components/sonner";
import Head from "next/head"; // Import Head for metadata

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MockAI",
  description:
    "Practice mock interviews with AI and get real-time feedback to ace your next interview.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Page Title */}
          <title>{metadata.title}</title>

          {/* Description */}
          <meta name="description" content={metadata.description} />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
