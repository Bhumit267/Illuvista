'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/mock-db';
import { Order } from '@/types';
import { useEffect, useState } from 'react';
import PurchaseHistoryTable from '@/components/account/PurchaseHistoryTable';

export default function PurchasesPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.id) {
                try {
                    const userOrders = await db.orders.getByUserId(user.id);
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Failed to fetch orders", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Purchase History</h1>
                <p className="text-muted text-sm mt-1">View details of your past transactions.</p>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-muted/10 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : (
                <PurchaseHistoryTable orders={orders} />
            )}
        </div>
    );
}
