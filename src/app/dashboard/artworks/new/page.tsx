'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewArtworkPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        router.push('/dashboard/artworks');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <Link
                    href="/dashboard/artworks"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Artworks
                </Link>
                <h1 className="text-3xl font-serif font-bold">Add New Artwork</h1>
                <p className="text-muted">Upload your art and set the pricing.</p>
            </div>

            <form onSubmit={handlePublish} className="space-y-8 bg-card p-8 rounded-xl border border-muted/20">

                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-muted/20 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                        <Upload className="w-8 h-8 text-muted group-hover:text-accent" />
                    </div>
                    <p className="font-medium mb-1">Click to upload image</p>
                    <p className="text-xs text-muted">JPG, PNG or WEBP (Max 10MB)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Midnight Solitude"
                            className="w-full bg-background border border-muted/20 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price ($)</label>
                        <input
                            type="number"
                            required
                            placeholder="0.00"
                            className="w-full bg-background border border-muted/20 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Medium</label>
                        <input
                            type="text"
                            placeholder="e.g. Oil on Canvas"
                            className="w-full bg-background border border-muted/20 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Year</label>
                        <input
                            type="text"
                            placeholder="2025"
                            className="w-full bg-background border border-muted/20 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        rows={4}
                        placeholder="Tell the story behind this piece..."
                        className="w-full bg-background border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                    />
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                    <Link
                        href="/dashboard/artworks"
                        className="px-6 py-2.5 text-sm font-medium hover:bg-muted/10 rounded-md transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-foreground text-background px-8 py-2.5 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? 'Publishing...' : 'Publish Artwork'}
                    </button>
                </div>

            </form>
        </div>
    );
}
