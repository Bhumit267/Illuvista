'use client';

import { Artwork } from '@/types';
import { db } from '@/lib/mock-db';
import { Check, X, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AdminArtworksPage() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            const data = await db.artworks.getAll();
            // Add some dummy "pending" artworks for moderation demo
            const pendingArtworks: Artwork[] = [
                {
                    id: 'pending1',
                    title: 'Abstract Thoughts',
                    artistId: 'u4',
                    artistName: 'Sarah Artist',
                    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop',
                    price: 500,
                    description: 'Oil on canvas, 2024',
                    medium: 'Oil Painting',
                    year: 2024,
                    tags: ['Abstract'],
                    status: 'DRAFT', // Simulating pending
                    views: 0,
                    createdAt: new Date().toISOString()
                }
            ];
            setArtworks([...pendingArtworks, ...data]);
        };
        fetchArtworks();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Artwork Moderation</h1>
                    <p className="text-muted text-sm mt-1">Review and approve artwork submissions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Status: All
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4">Artwork</th>
                            <th className="px-6 py-4">Artist</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4 text-right">Moderation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {artworks.map((artwork) => (
                            <tr key={artwork.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={artwork.image}
                                                alt={artwork.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900">{artwork.title}</p>
                                            <p className="text-xs text-neutral-500">{artwork.medium} • {artwork.year}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs">
                                            {artwork.artistName[0]}
                                        </div>
                                        <span className="font-medium">{artwork.artistName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                        ${artwork.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' :
                                            artwork.status === 'SOLD' ? 'bg-neutral-100 text-neutral-600' :
                                                'bg-yellow-50 text-yellow-700'}`}>
                                        {artwork.status === 'DRAFT' ? 'PENDING REVIEW' : artwork.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    ${artwork.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="p-1.5 hover:bg-green-50 text-neutral-400 hover:text-green-600 rounded-md transition-colors"
                                            title="Approve"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-1.5 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-md transition-colors"
                                            title="Reject"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
