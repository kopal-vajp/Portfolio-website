import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Proof } from "@/components/Proof";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kopal Vajpayee — Computer Science × AI × Software" },
      {
        name: "description",
        content:
          "Portfolio of Kopal Vajpayee — CS undergraduate at NMIT building AI-powered applications, data-driven systems and full-stack products.",
      },
      {
        property: "og:title",
        content: "Kopal Vajpayee — Computer Science × AI × Software",
      },
      {
        property: "og:description",
        content:
          "I build software that solves real problems. AI/ML, data systems and full-stack engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Proof />
        <Contact />
      </main>
    </div>
  );
}
