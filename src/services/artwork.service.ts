/**
 * Artwork Service
 * Centralized logic for artwork-related API calls.
 */
export const artworkService = {
    /**
     * Get all artworks with optional filters
     */
    async getAll(filters?: any) {
        const query = filters ? `?${new URLSearchParams(filters)}` : '';
        const response = await fetch(`/api/artworks${query}`);
        return response.json();
    },

    /**
     * Get a single artwork by ID
     */
    async getById(id: string) {
        const response = await fetch(`/api/artworks/${id}`);
        return response.json();
    },

    /**
     * Create a new artwork
     */
    async create(data: any) {
        const response = await fetch('/api/artworks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Update an existing artwork
     */
    async update(id: string, data: any) {
        const response = await fetch(`/api/artworks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Delete an artwork
     */
    async delete(id: string) {
        const response = await fetch(`/api/artworks/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
};
