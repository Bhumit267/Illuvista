import { User, Artwork, Order, Collection, UserRole } from '@/types';

// Initial Mock Data
const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alice Admin', email: 'admin@illuvista.com', role: 'ADMIN', avatar: '/avatars/admin.jpg' },
    { id: 'u2', name: 'Elena Vora', email: 'elena@art.com', role: 'ARTIST', bio: 'Digital Geometry Specialist', avatar: '/avatars/elena.jpg' },
    { id: 'u3', name: 'Bob Buyer', email: 'bob@collector.com', role: 'BUYER', avatar: '/avatars/bob.jpg' },
];

const MOCK_ARTWORKS: Artwork[] = [
    {
        id: 'a1',
        title: 'Ethereal Construct',
        artistId: 'u2',
        artistName: 'Elena Vora',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
        price: 1200,
        description: 'Digital sculpture.',
        medium: 'Digital 3D',
        year: 2024,
        tags: ['Abstract'],
        status: 'PUBLISHED',
        views: 1240,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 'a2',
        title: 'Neon Solitude',
        artistId: 'u2',
        artistName: 'Elena Vora',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2574&auto=format&fit=crop',
        price: 950,
        description: 'Urban loneliness.',
        medium: 'Digital Painting',
        year: 2023,
        tags: ['Cyberpunk'],
        status: 'PUBLISHED',
        views: 850,
        createdAt: '2023-11-20T14:30:00Z'
    }
];

const MOCK_ORDERS: Order[] = [
    {
        id: 'o1',
        userId: 'u3',
        items: [{ artworkId: 'a2', title: 'Neon Solitude', price: 950, image: '...' }],
        total: 950,
        status: 'COMPLETED',
        createdAt: '2024-02-01T09:00:00Z'
    }
];

// Async Helpers (Simulating DB latency)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
    users: {
        getById: async (id: string): Promise<User | undefined> => {
            await delay(200);
            return MOCK_USERS.find(u => u.id === id);
        },
        getByEmail: async (email: string): Promise<User | undefined> => {
            await delay(200);
            return MOCK_USERS.find(u => u.email === email);
        }
    },
    artworks: {
        getAll: async (): Promise<Artwork[]> => {
            await delay(300);
            return [...MOCK_ARTWORKS];
        },
        getByArtistId: async (artistId: string): Promise<Artwork[]> => {
            await delay(300);
            return MOCK_ARTWORKS.filter(a => a.artistId === artistId);
        },
        getById: async (id: string): Promise<Artwork | undefined> => {
            await delay(200);
            return MOCK_ARTWORKS.find(a => a.id === id);
        },
        create: async (artwork: Artwork): Promise<Artwork> => {
            await delay(500);
            MOCK_ARTWORKS.push(artwork);
            return artwork;
        }
    },
    orders: {
        getByUserId: async (userId: string): Promise<Order[]> => {
            await delay(300);
            return MOCK_ORDERS.filter(o => o.userId === userId);
        },
        getRecent: async (): Promise<Order[]> => {
            await delay(300);
            return [...MOCK_ORDERS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }
};
