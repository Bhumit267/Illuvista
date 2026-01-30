'use client';

import { db } from '@/lib/mock-db';
import { Users, Palette, DollarSign, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import StatsCard from '@/components/dashboard/StatsCard'; // Reusing existing component if suitable, or create new simplified one inline

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        users: 0,
        artworks: 0,
        sales: 0,
        orders: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            // Mocking aggregate data since mock-db is simple
            const users = await db.users.getById('u1'); // Just to trigger a call? No "getAllUsers" in mock-db visible yet effectively. 
            // Ideally we'd extend mock-db, but for UI demo we can hardcode somewhat based on array lengths or just mock numbers.
            // Let's use hardcoded mock numbers for "Production Grade UI" feel without backend overhaul.
            setStats({
                users: 1254,
                artworks: 843,
                sales: 45200,
                orders: 12
            });
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Revenue', value: `$${stats.sales.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', trendUp: true },
        { title: 'Active Users', value: stats.users.toLocaleString(), icon: Users, trend: '+5.2%', trendUp: true },
        { title: 'Artworks', value: stats.artworks.toLocaleString(), icon: Palette, trend: '+2.4%', trendUp: true },
        { title: 'Pending Orders', value: stats.orders.toLocaleString(), icon: ShoppingBag, trend: '-1.5%', trendUp: false },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted text-sm mt-1">Platform performance metrics and recent activity.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.title} className="p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="p-2 bg-neutral-100 rounded-lg">
                                <card.icon className="w-5 h-5 text-neutral-600" />
                            </div>
                            <span className={`text-xs font-medium flex items-center gap-1 ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                {card.trend}
                                {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">{card.value}</h3>
                            <p className="text-sm text-neutral-500 mt-1">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Recent Sales</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-sm font-medium">AB</div>
                                    <div>
                                        <p className="text-sm font-medium">Artwork #{1000 + i}</p>
                                        <p className="text-xs text-neutral-500">Sold to User #{500 + i}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">$450.00</p>
                                    <p className="text-xs text-neutral-500">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Pending Verifications</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                                        <Palette className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New Artist Profile</p>
                                        <p className="text-xs text-neutral-500">Artist #{200 + i}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-medium text-neutral-900 bg-neutral-100 px-3 py-1.5 rounded-full hover:bg-neutral-200 transition-colors">
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
