import { db } from "@/lib/mock-db";
import ArtworkCard from "@/components/ArtworkCard";

export default async function GalleryPage() {
    const artworks = await db.artworks.getAll();

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-24">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h1>
                <p className="text-muted max-w-2xl mx-auto">
                    Explore our curated selection of digital masterpieces.
                    Each piece is a unique convergence of technology and emotion.
                </p>
            </header>

            {/* Filter placeholder */}
            <div className="flex justify-center gap-6 text-sm uppercase tracking-wide mb-16 text-muted overflow-x-auto pb-4">
                <button className="text-foreground font-medium border-b border-accent pb-1">All</button>
                <button className="hover:text-foreground transition-colors">Digital 3D</button>
                <button className="hover:text-foreground transition-colors">Generative</button>
                <button className="hover:text-foreground transition-colors">Photography</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </div>
    );
}
