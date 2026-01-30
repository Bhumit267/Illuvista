'use client';

import StatsCard from "@/components/dashboard/StatsCard";
import { Users, Palette, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold">Platform Overview</h1>
                <p className="text-muted">Global statistics and system health.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value="1,240"
                    icon={Users}
                    trend="+85 this week"
                />
                <StatsCard
                    title="Total Artworks"
                    value="342"
                    icon={Palette}
                />
                <StatsCard
                    title="Platform Revenue"
                    value="$45.2K"
                    icon={DollarSign}
                />
                <StatsCard
                    title="System Status"
                    value="99.9%"
                    icon={Activity}
                    description="Uptime"
                />
            </div>
        </div>
    );
}
