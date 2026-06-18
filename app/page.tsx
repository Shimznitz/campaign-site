// app/page.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedCounter from "@/components/AnimatedCounter";
import About from "@/components/About";
import WhyRunning from "@/components/WhyRunning";
import Manifestos from "@/components/Manifestos";
import Gallery from "@/components/Gallery";
import News from "@/components/News";
import Countdown from "@/components/Countdown";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import JoinModal from "@/components/JoinModal";
import ContactModal from "@/components/ContactModal";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <ScrollProgress />
      <Navbar onJoinClick={() => setJoinOpen(true)} />
      <main>
        <Hero onJoinClick={() => setJoinOpen(true)} />
        <AnimatedCounter />
        <About />
        <WhyRunning />
        <Manifestos />
        <Countdown />
        <Gallery />
        <News />
        <Testimonials />
      </main>
      <Footer onJoinClick={() => setJoinOpen(true)} />
      <FloatingButtons
        onJoinClick={() => setJoinOpen(true)}
        onContactClick={() => setContactOpen(true)}
      />
      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}