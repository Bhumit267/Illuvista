'use client';

import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { useState } from "react";
import Link from 'next/link';

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async (role: UserRole) => {
        try {
            await login(role);
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    // Mock handler for form submission
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Default to Buyer for form login in mock mode
        handleLogin('BUYER');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4 py-12">
            <div className="bg-background p-8 rounded-xl shadow-xl max-w-md w-full border border-muted/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Sign In</h1>
                    <p className="text-muted text-sm">Welcome back to IlluVista.</p>
                </div>

                {/* Standard Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4 mb-8">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Email Only</label>
                        <input
                            type="email"
                            placeholder="demo@example.com"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-foreground text-background py-3 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-muted/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted">Or try demo accounts</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin('ARTIST')}
                        className="w-full flex items-center justify-between p-3 border border-muted/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                    >
                        <div>
                            <p className="font-medium group-hover:text-accent">Artist Demo</p>
                            <p className="text-xs text-muted">Elena Vora</p>
                        </div>
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin('BUYER')}
                        className="w-full flex items-center justify-between p-3 border border-muted/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                    >
                        <div>
                            <p className="font-medium group-hover:text-accent">Buyer Demo</p>
                            <p className="text-xs text-muted">Bob Buyer</p>
                        </div>
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleLogin('ADMIN')}
                        className="w-full flex items-center justify-between p-3 border border-muted/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                    >
                        <div>
                            <p className="font-medium group-hover:text-accent">Admin Demo</p>
                            <p className="text-xs text-muted">Alice Admin</p>
                        </div>
                    </button>
                </div>

                {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}

                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-foreground font-medium hover:underline">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}
