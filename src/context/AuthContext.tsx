'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { db } from '@/lib/mock-db';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (role: UserRole) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUserId = localStorage.getItem('illu_user_id');
        if (storedUserId) {
            db.users.getById(storedUserId).then(u => {
                if (u) setUser(u);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (role: UserRole) => {
        setIsLoading(true);
        // Simulate finding a user by role for demo purposes
        // In a real app this would be email/password
        const allUsers = await Promise.resolve([
            { id: 'u1', name: 'Alice Admin', email: 'admin@illuvista.com', role: 'ADMIN', avatar: '/avatars/admin.jpg' },
            { id: 'u2', name: 'Elena Vora', email: 'elena@art.com', role: 'ARTIST', bio: 'Digital Geometry Specialist', avatar: '/avatars/elena.jpg' },
            { id: 'u3', name: 'Bob Buyer', email: 'bob@collector.com', role: 'BUYER', avatar: '/avatars/bob.jpg' },
        ]);
        // We re-declare mock users here because we can't easily export MOCK_USERS from lib/mock-db if it's not exported.
        // For the context, we'll just hardcode finding the first user of that role.

        // Better approach: use db.users.getByEmail with known demo emails
        let demoEmail = '';
        switch (role) {
            case 'ADMIN': demoEmail = 'admin@illuvista.com'; break;
            case 'ARTIST': demoEmail = 'elena@art.com'; break;
            case 'BUYER': demoEmail = 'bob@collector.com'; break;
        }

        const foundUser = await db.users.getByEmail(demoEmail);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('illu_user_id', foundUser.id);

            // Redirect based on role
            if (role === 'ADMIN') router.push('/admin');
            else if (role === 'ARTIST') router.push('/artist');
            else router.push('/buyer');
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('illu_user_id');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
