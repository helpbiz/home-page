import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SolutionsSection from "./components/SolutionsSection";
import DashboardSection from "./components/DashboardSection";
import TrustSection from "./components/TrustSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <SolutionsSection />
      <DashboardSection />
      <TrustSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
