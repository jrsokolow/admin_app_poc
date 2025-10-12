import { Suspense } from 'react';
import { api } from '@/lib/api';
import UserListClient from './list-client';

/**
 * USERS LIST PAGE - SSR (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Write API fetching code
 * - Handle errors yourself
 * - No automatic caching
 * - No automatic retry
 * - No automatic loading states from hooks
 */

// ❌ Manual data fetching function
async function getUsers() {
    console.log('🟢 SERVER (No Refine): Manually fetching users...');

    try {
        const users = await api.getUsers();
        console.log(`🟢 SERVER (No Refine): Got ${users.length} users`);
        return { users, total: users.length };
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        return { users: [], total: 0 };
    }
}

// Loading component
function LoadingUsers() {
    return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <h2>Loading users...</h2>
        </div>
    );
}

// Main page component
export default async function UsersPage() {
    const { users, total } = await getUsers();

    return (
        <Suspense fallback={<LoadingUsers />}>
            <UserListClient initialUsers={users} initialTotal={total} />
        </Suspense>
    );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

