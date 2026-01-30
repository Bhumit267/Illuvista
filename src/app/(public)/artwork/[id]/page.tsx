import { db } from "@/lib/mock-db";
import Image from 'next/image';
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

// Correct type for Next.js 15+ Page Props (params is a Promise)
// ... imports
// Correct type for Next.js 15+ Page Props (params is a Promise)
export default async function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artwork = await db.artworks.getById(id);

    if (!artwork) {
        notFound();
    }

    const artist = await db.users.getById(artwork.artistId);

    return (
        <div className="min-h-screen pt-24 pb-24 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Visual Content */}
                <div className="relative aspect-[3/4] w-full bg-muted/10">
                    <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Info Content */}
                <div>
                    <span className="text-sm uppercase tracking-widest text-muted block mb-4">
                        {artwork.medium} — {artwork.year}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        {artwork.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                            {/* Placeholder for Artist Avatar if not ready */}
                            <div className="absolute inset-0 bg-accent/20" />
                        </div>
                        <div>
                            <p className="font-medium">{artwork.artistName}</p>
                            <p className="text-xs text-muted">Artist</p>
                        </div>
                    </div>

                    <div className="prose prose-sm text-neutral-500 mb-10 leading-relaxed">
                        <p className="mb-4">{artwork.description}</p>
                        {artist?.bio && <p className="italic">"{artist.bio}"</p>}
                    </div>



                    <div className="flex items-center justify-between border-t border-muted/20 pt-8">
                        <div className="text-2xl font-serif">
                            ${artwork.price.toLocaleString()}
                        </div>
                        <AddToCartButton artwork={artwork} />
                    </div>
                </div>
            </div>
        </div>
    );
}
