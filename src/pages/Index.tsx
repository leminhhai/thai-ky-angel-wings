
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import NotificationGuide from "@/components/NotificationGuide";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <NotificationGuide />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
