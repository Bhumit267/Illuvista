import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { UserRole, isAuthorized } from '@/lib/auth/rbac';

export type ApiHandler = (req: Request, context: any, session: any) => Promise<NextResponse>;

/**
 * Middleware for API routes to enforce role-based access control
 */
export function withRole(requiredRole: UserRole, handler: ApiHandler) {
    return async (req: Request, context: any) => {
        try {
            const session = await getSession();

            if (!session) {
                return NextResponse.json(
                    { error: 'Unauthorized: Session required' },
                    { status: 401 }
                );
            }

            if (!isAuthorized(session.role, requiredRole)) {
                return NextResponse.json(
                    { error: 'Forbidden: Insufficient permissions' },
                    { status: 403 }
                );
            }

            return handler(req, context, session);
        } catch (error) {
            console.error('RBAC API Wrapper Error:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    };
}
