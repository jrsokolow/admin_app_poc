import { Suspense } from 'react';
import { dataProvider } from '@/providers/data-provider';
import UserShowClient from './show-client';
import { notFound } from 'next/navigation';

/**
 * USER SHOW PAGE - Server Component (SSR)
 * 
 * This page uses Server-Side Rendering to fetch user data on the server.
 * Benefits:
 * - SEO friendly - user details are in HTML for search engines
 * - Faster initial load - data ready before page renders
 * - Better for social media sharing (Open Graph tags can be dynamic)
 */

// Fetch single user data on the server
async function getUser(id: string) {
    try {
        const { data } = await dataProvider.getOne({
            resource: 'users',
            id,
            meta: {},
        });
        return data;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        return null;
    }
}

// Loading component
function LoadingUser() {
    return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <h2>Loading user details...</h2>
        </div>
    );
}

// Main page component - Server Component
export default async function UserShowPage({
    params,
}: {
    params: { id: string };
}) {
    // Fetch data on server
    const user = await getUser(params.id);

    // If user not found, show 404
    if (!user) {
        notFound();
    }

    return (
        <Suspense fallback={<LoadingUser />}>
            <UserShowClient initialUser={user} userId={params.id} />
        </Suspense>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: { id: string };
}) {
    const user = await getUser(params.id);

    if (!user) {
        return {
            title: 'User Not Found',
        };
    }

    return {
        title: `${user.name} - User Details`,
        description: `View details for ${user.name} (${user.email})`,
    };
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

