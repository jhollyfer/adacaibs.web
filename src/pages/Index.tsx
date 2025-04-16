import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import Testimonials from "@/components/home/Testimonials";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <AboutSection />
      <LatestNews />
      <Testimonials />
      <ContactSection />
    </Layout>
  );
};

export default Index;
