/**
 * Auth Service
 * Centralized logic for authentication API calls.
 */
export const authService = {
    /**
     * Register a new user
     */
    async register(data: any) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Login a user
     */
    async login(credentials: any) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    /**
     * Logout the current user
     */
    async logout() {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });
        return response.json();
    },

    /**
     * Get current session/user info
     */
    async getMe() {
        const response = await fetch('/api/auth/me');
        return response.json();
    }
};
