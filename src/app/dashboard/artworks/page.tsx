'use client';

import { useAuth } from "@/context/AuthContext";

export default function DashboardArtworksPage() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
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
                    <button className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-colors">
                        Upload New
                    </button>
                )}
            </div>

            <div className="bg-card rounded-xl border border-muted/20 min-h-[400px] p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-medium mb-2">No artworks found</h3>
                <p className="text-muted text-sm max-w-sm">
                    {user.role === 'ARTIST' ? "You haven't uploaded any art yet." : "There is nothing to display here right now."}
                </p>
            </div>
        </div>
    );
}
