
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AboutSection from '@/components/home/AboutSection';
import LatestNews from '@/components/home/LatestNews';
import Testimonials from '@/components/home/Testimonials';
import ContactSection from '@/components/home/ContactSection';

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
