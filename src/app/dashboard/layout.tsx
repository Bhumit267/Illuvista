'use client';

import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
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
                <main className="flex-1 w-full md:ml-64 min-h-screen flex flex-col bg-muted/5 transition-all duration-300">
                    <DashboardHeader />
                    <div className="flex-1 p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </AuthProvider>
    );
}
