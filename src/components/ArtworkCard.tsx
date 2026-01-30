import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types';

interface ArtworkCardProps {
    artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <Link href={`/artwork/${artwork.id}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted/10 mb-4">
                <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            <div className="space-y-1">
                <h3 className="font-serif text-lg leading-tight group-hover:text-accent transition-colors">
                    {artwork.title}
                </h3>
                <p className="text-sm text-muted">
                    {artwork.artistName}
                </p>
                <p className="text-sm font-medium mt-2">
                    ${artwork.price.toLocaleString()}
                </p>
            </div>
        </Link>
    );
}
