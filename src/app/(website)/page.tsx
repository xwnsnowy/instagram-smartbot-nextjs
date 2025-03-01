import Hero from "@/components/global/Hero";
import Pricing from "@/components/global/Pricing";
import Header from "@/components/global/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Header />
        <Hero />
        <Pricing />
      </div>
    </main>
  );
}
