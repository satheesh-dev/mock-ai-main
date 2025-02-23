import CTA from "./components/CTA";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
