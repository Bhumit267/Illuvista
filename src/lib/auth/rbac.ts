export enum UserRole {
    ADMIN = 'ADMIN',
    ARTIST = 'ARTIST',
    BUYER = 'BUYER',
}

export const ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: ['manage_users', 'manage_artworks', 'manage_orders', 'view_reports'],
    [UserRole.ARTIST]: ['manage_own_artworks', 'view_own_sales', 'comment'],
    [UserRole.BUYER]: ['purchase_artworks', 'comment'],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: string): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
}

/**
 * Check if a role is authorized based on a required role
 */
export function isAuthorized(userRole: string, requiredRole: UserRole): boolean {
    if (userRole === UserRole.ADMIN) return true; // Admins are authorized for everything
    return userRole === requiredRole;
}
