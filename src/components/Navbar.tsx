'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import NotificationBell from './notifications/NotificationBell';

export default function Navbar() {
    const { items, toggleCart } = useCart();
    const { user } = useAuth();
    const itemCount = items.length;

    const getDashboardLink = (role: UserRole) => {
        return '/dashboard';
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-muted/20">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                    IlluVista
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/gallery" className="text-sm font-medium hover:text-accent transition-colors">
                        Gallery
                    </Link>
                    <Link href="/artists" className="text-sm font-medium hover:text-accent transition-colors">
                        Artists
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                        About
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium hover:text-accent transition-colors">
                        Pricing
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    <button className="hover:text-accent transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <NotificationBell />

                    {user ? (
                        <Link
                            href={getDashboardLink(user.role)}
                            className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
                        >
                            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs">
                                {user.name[0]}
                            </div>
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="hover:text-accent transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                    )}

                    <button onClick={toggleCart} className="hover:text-accent transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
