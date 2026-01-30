'use client';

import DashboardSidebar from "@/components/dashboard/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-background text-foreground flex">
                <DashboardSidebar />
                <main className="flex-1 ml-64 p-8 bg-muted/5 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </AuthProvider>
    );
}
