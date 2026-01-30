'use client';

import { useAuth } from "@/context/AuthContext";
import ArtworkTable from "@/components/dashboard/ArtworkTable";
import Link from 'next/link';
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Artwork } from "@/types";
import { db } from "@/lib/mock-db";

export default function DashboardArtworksPage() {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (!user) return;

            let data: Artwork[] = [];
            // In a real app, this would be a server action or API call
            // For now we use our client-side accessible mock-db (which is async)

            if (user.role === 'ARTIST') {
                // In mock db we haven't properly linked user IDs perfectly to names, 
                // so for this demo, we'll just fetch ALL artworks to populate the table for visual effect
                // In a real app: await db.artworks.getByArtistId(user.id);
                data = await db.artworks.getAll();
            } else if (user.role === 'BUYER') {
                // Simulate collection
                const all = await db.artworks.getAll();
                data = all.slice(0, 3); // Just show a few as "collected"
            } else {
                data = await db.artworks.getAll();
            }

            setArtworks(data);
            setIsLoading(false);
        }

        loadData();
    }, [user]);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold">
                        {user.role === 'BUYER' ? 'My Collection' : 'Artworks'}
                    </h1>
                    <p className="text-muted">
                        {user.role === 'ARTIST' && 'Manage your portfolio and listings.'}
                        {user.role === 'BUYER' && 'View your purchased artworks.'}
                        {user.role === 'ADMIN' && 'Moderation and platform-wide artwork management.'}
                    </p>
                </div>
                {user.role === 'ARTIST' && (
                    <Link
                        href="/dashboard/artworks/new"
                        className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Upload New
                    </Link>
                )}
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center text-muted">
                    Loading artworks...
                </div>
            ) : (
                <ArtworkTable artworks={artworks} role={user.role} />
            )}
        </div>
    );
}
