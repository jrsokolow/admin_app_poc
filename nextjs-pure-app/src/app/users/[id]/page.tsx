import { Suspense } from 'react';
import { api } from '@/lib/api';
import UserShowClient from './show-client';
import { notFound } from 'next/navigation';

/**
 * USER SHOW PAGE - SSR (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Write fetching logic
 * - Handle 404 errors
 * - Create metadata manually
 * - No useShow() hook
 */

async function getUser(id: string) {
    try {
        const user = await api.getUser(id);
        return user;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        return null;
    }
}

function LoadingUser() {
    return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <h2>Loading user details...</h2>
        </div>
    );
}

export default async function UserShowPage({
    params,
}: {
    params: { id: string };
}) {
    console.log('🟢 SERVER: UserShowPage running on SERVER for user ID:', params.id);
    const user = await getUser(params.id);
    console.log('🟢 SERVER: Data fetched on SERVER, user name:', user?.name);

    if (!user) {
        notFound();
    }

    return (
        <Suspense fallback={<LoadingUser />}>
            <UserShowClient initialUser={user} userId={params.id} />
        </Suspense>
    );
}

// ❌ Manual metadata generation
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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

