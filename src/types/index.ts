export type UserRole = 'ADMIN' | 'ARTIST' | 'BUYER';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    bio?: string; // For artists
}

export type ArtworkStatus = 'DRAFT' | 'PUBLISHED' | 'SOLD';

export interface Artwork {
    id: string;
    title: string;
    artistId: string;
    artistName: string; // Denormalized for simpler display
    image: string;
    price: number;
    description: string;
    medium: string;
    year: number;
    tags: string[];
    status: ArtworkStatus;
    views: number;
    createdAt: string;
}

export interface OrderItem {
    artworkId: string;
    title: string;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

export interface Collection {
    id: string;
    userId: string;
    name: string;
    artworkIds: string[];
    isPublic: boolean;
}
