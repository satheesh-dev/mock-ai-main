"use client";
import { Button } from "../dashboard/_components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroImg from "../../public/AIInt.webp";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="py-5 px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-10 md:mb-0 md:ml-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Ace Your Next Interview with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Practice with our AI-powered mock interviews and get real-time
          feedback to improve your skills.
        </p>
        <div className="flex justify-center items-center md:flex-none md:justify-start md:items-start">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/dashboard")}
          >
            Start Your Mock Interview
          </Button>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image
          src={HeroImg}
          alt="AI Interview Illustration"
          width={500}
          height={400}
          className="rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </section>
  );
}
