export interface Artist {
    id: string;
    name: string;
    bio: string;
    avatar: string;
}

export interface Artwork {
    id: string;
    title: string;
    artistId: string;
    artist: Artist;
    image: string;
    price: number;
    description: string;
    medium: string; // e.g., "Digital 3D", "Oil on Canvas", "Generative Code"
    year: number;
    tags: string[];
}

const ARTISTS: Artist[] = [
    {
        id: "a1",
        name: "Elena Vora",
        bio: "Exploring the intersection of nature and digital geometry.",
        avatar: "/avatars/elena.jpg"
    },
    {
        id: "a2",
        name: "Marcus Chen",
        bio: "Cyberpunk surrealist focusing on memory and architecture.",
        avatar: "/avatars/marcus.jpg"
    },
    {
        id: "a3",
        name: "Sernin d'Arles",
        bio: "Reimagining classical forms through procedural generation.",
        avatar: "/avatars/sernin.jpg"
    }
];

export const ARTWORKS: Artwork[] = [
    {
        id: "1",
        title: "Ethereal Construct",
        artistId: "a1",
        artist: ARTISTS[0],
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        price: 1200,
        description: "A digital sculpture representing the fragility of memory in the digital age.",
        medium: "Digital 3D",
        year: 2024,
        tags: ["Abstract", "3D", "Minimalist"]
    },
    {
        id: "2",
        title: "Neon Solitude",
        artistId: "a2",
        artist: ARTISTS[1],
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2574&auto=format&fit=crop",
        price: 950,
        description: "Urban loneliness captured in the glow of synthetic lights.",
        medium: "Digital Painting",
        year: 2023,
        tags: ["Cyberpunk", "Cityscape", "Neon"]
    },
    {
        id: "3",
        title: "The Golden Ratio",
        artistId: "a3",
        artist: ARTISTS[2],
        image: "https://images.unsplash.com/photo-1699912788390-349c25672ceb?q=80&w=2574&auto=format&fit=crop",
        price: 2400,
        description: "Classical composition rules applied to chaotic particle systems.",
        medium: "Generative Code",
        year: 2024,
        tags: ["Generative", "Golden", "Abstract"]
    },
    {
        id: "4",
        title: "Liquid Metal",
        artistId: "a1",
        artist: ARTISTS[0],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        price: 1500,
        description: "Fluid dynamics simulation rendered with metallic shaders.",
        medium: "Fluid Sim",
        year: 2023,
        tags: ["Abstract", "Fluid", "Metallic"]
    }
];

export function getArtworkById(id: string): Artwork | undefined {
    return ARTWORKS.find(art => art.id === id);
}

export function getAllArtworks(): Artwork[] {
    return ARTWORKS;
}
