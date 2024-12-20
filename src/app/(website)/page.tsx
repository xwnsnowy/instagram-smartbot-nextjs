import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Navbar />
        <Hero />
        <Pricing />
      </div>
    </main>
  );
}
