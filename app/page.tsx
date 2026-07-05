import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Automate from "@/components/Automate";
import Demo from "@/components/Demo";
import SocialShowcase from "@/components/SocialShowcase";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Automate />
      <div className="divider" aria-hidden="true" />
      <Demo />
      <SocialShowcase />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home;
