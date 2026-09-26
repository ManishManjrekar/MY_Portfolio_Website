import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Lab } from "@/components/Lab";
import { Ask } from "@/components/Ask";
import { Career } from "@/components/Career";
import { Beyond, Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Lab />
        <Ask />
        <Career />
        <Beyond />
      </main>
      <Contact />
    </>
  );
}
