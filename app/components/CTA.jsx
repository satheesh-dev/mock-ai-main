"use client";
import { Button } from "../dashboard/_components/button";
import { useRouter } from "next/navigation";
export default function CTA() {
  const router = useRouter();
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Ace Your Next Interview?
      </h2>
      <p className="text-xl mb-8">
        Start practicing with AI Mock today and boost your confidence!
      </p>
      <Button
        size="lg"
        variant="secondary"
        className="bg-white text-blue-600 hover:bg-gray-100"
        onClick={() => router.push("/dashboard")}
      >
        Get Started Now
      </Button>
    </section>
  );
}
