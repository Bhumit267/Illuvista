'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Palette,
    ShoppingBag,
    Settings,
    Users,
    LogOut,
    BarChart3,
    MessageSquare
} from 'lucide-react';
import clsx from 'clsx';

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    if (!user) return null;

    const getLinks = () => {
        // Common links could go here if any
        const baseLinks = [
            { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        ];

        switch (user.role) {
            case 'ARTIST':
                return [
                    ...baseLinks,
                    { name: 'My Artworks', href: '/dashboard/artworks', icon: Palette },
                    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
                    { name: 'Comments', href: '/dashboard/comments', icon: MessageSquare },
                    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
                ];
            case 'BUYER':
                return [
                    ...baseLinks,
                    { name: 'My Collection', href: '/dashboard/artworks', icon: Palette },
                    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
                    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
                ];
            case 'ADMIN':
                return [
                    ...baseLinks,
                    { name: 'All Artworks', href: '/dashboard/artworks', icon: Palette },
                    { name: 'All Users', href: '/dashboard/users', icon: Users },
                    { name: 'Comments', href: '/dashboard/comments', icon: MessageSquare },
                    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r border-muted/20 flex flex-col z-40 shadow-sm">
            <div className="h-20 flex items-center px-8 border-b border-muted/20">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                    IlluVista
                </Link>
            </div>

            <div className="flex-1 py-8 px-4 space-y-1">
                <div className="px-4 mb-6">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">
                        {user.role} Workspace
                    </p>
                </div>

                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-accent/10 text-accent"
                                    : "text-muted hover:bg-muted/5 hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-muted/20 bg-muted/5">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs text-accent font-bold">
                        {user.name[0]}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
