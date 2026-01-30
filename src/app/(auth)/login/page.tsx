'use client';

import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
        if (e) e.preventDefault();
        setError('');

        const loginEmail = customEmail || email;
        const loginPassword = customPassword || password;

        if (!loginEmail || !loginPassword) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                await login(); // Refresh context
                // Redirect happened in middleware or we can do it here
                if (data.user.role === 'ADMIN') router.push('/admin');
                else if (data.user.role === 'ARTIST') router.push('/dashboard');
                else router.push('/account');
            } else {
                setError(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleDemoLogin = (role: 'ADMIN' | 'ARTIST' | 'BUYER') => {
        let demoEmail = '';
        if (role === 'ADMIN') demoEmail = 'admin@illuvista.com';
        else if (role === 'ARTIST') demoEmail = 'elena@art.com';
        else demoEmail = 'bob@collector.com';

        handleLogin(undefined, demoEmail, 'password123'); // Assuming all demo users have this password
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4 py-12">
            <div className="bg-background p-8 rounded-xl shadow-xl max-w-md w-full border border-muted/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Sign In</h1>
                    <p className="text-muted text-sm">Welcome back to IlluVista.</p>
                </div>

                {/* Standard Form */}
                <form onSubmit={handleLogin} className="space-y-4 mb-4">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-muted/5 border border-muted/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-foreground text-background py-3 text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
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
                        onClick={() => handleDemoLogin('ARTIST')}
                        className="w-full flex items-center justify-between p-3 border border-muted/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                    >
                        <div>
                            <p className="font-medium group-hover:text-accent">Artist Demo</p>
                            <p className="text-xs text-muted">Elena Vora</p>
                        </div>
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('BUYER')}
                        className="w-full flex items-center justify-between p-3 border border-muted/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                    >
                        <div>
                            <p className="font-medium group-hover:text-accent">Buyer Demo</p>
                            <p className="text-xs text-muted">Bob Buyer</p>
                        </div>
                    </button>

                    <button
                        disabled={isLoading}
                        onClick={() => handleDemoLogin('ADMIN')}
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
