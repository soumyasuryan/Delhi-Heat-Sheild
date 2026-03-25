import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeatMapSection from "@/components/HeatMapSection";
import HVIFactorsSection from "@/components/HVIFactorsSection";
import SearchLocationSection from "@/components/SearchLocationSection";
import HVIRatingSection from "@/components/HVIRatingSection";
import ImpactCarousel from "@/components/ImpactCarousel";
import AlertSystemSection from "@/components/AlertSystemSection";
import Footer from "@/components/Footer";


const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <SearchLocationSection />
    <HVIFactorsSection />
    <HVIRatingSection />
    <ImpactCarousel />
    <AlertSystemSection />
    <Footer />
  </div>
);

export default Index;
