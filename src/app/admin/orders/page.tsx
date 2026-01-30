'use client';

import { Order } from '@/types';
import { db } from '@/lib/mock-db';
import { Download, Filter, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await db.orders.getRecent(); // Assuming this returns all recent orders for admin in Mock
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted text-sm mt-1">Transaction history and fulfillment status.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">
                                    #{order.id.toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium">User {order.userId}</span>
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {order.items.length} items
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    ${order.total.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                        ${order.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                                            order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
