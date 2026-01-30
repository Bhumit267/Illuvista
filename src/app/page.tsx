import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />

      {/* Featured Section (Placeholder) */}
      <section className="w-full py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-muted">
          <p>Renaissance Revival</p>
          <p>Abstract Modernism</p>
          <p>Digital Surrealism</p>
        </div>
      </section>
    </main>
  );
}
