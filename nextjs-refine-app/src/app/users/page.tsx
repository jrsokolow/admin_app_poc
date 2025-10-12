import { Suspense } from 'react';
import { dataProvider } from '@/providers/data-provider';
import UserListClient from './list-client';

/**
 * USERS LIST PAGE - Server Component (SSR)
 * 
 * This page uses Server-Side Rendering to fetch data on the server.
 * Benefits:
 * - SEO friendly - content is available in HTML
 * - Faster initial load - data fetched before page renders
 * - No loading spinner on initial load
 * 
 * The actual UI is rendered by a Client Component for interactivity.
 */

// Fetch users data on the server
async function getUsers() {
    console.log('🟢 SERVER: Fetching users from API...');

    try {
        const { data, total } = await dataProvider.getList({
            resource: 'users',
            pagination: {
                current: 1,
                pageSize: 10,
            },
            filters: [],
            sorters: [],
            meta: {},
        });

        console.log(`🟢 SERVER: Successfully fetched ${data.length} users`);
        return { users: data, total };
    } catch (error) {
        console.error('Error fetching users:', error);
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

// Main page component - Server Component
export default async function UsersPage() {
    console.log('🟢 SERVER: Rendering UsersPage component on the server');

    // Fetch data on server
    const { users, total } = await getUsers();

    console.log('🟢 SERVER: Sending pre-rendered HTML to browser with user data');
    return (
        <Suspense fallback={<LoadingUsers />}>
            <UserListClient initialUsers={users} initialTotal={total} />
        </Suspense>
    );
}

// Enable dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

