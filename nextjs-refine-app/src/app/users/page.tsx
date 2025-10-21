'use client';

/**
 * USERS LIST PAGE - Client Component (CSR)
 * 
 * This page uses Client-Side Rendering to fetch data in the browser.
 * Benefits:
 * - Faster initial page load (no server processing)
 * - Better for interactive features
 * - Easier state management
 * 
 * Trade-offs:
 * - Shows loading spinner initially
 * - Not ideal for SEO (but admin panels don't need SEO)
 */

import UserListClient from './list-client';

// Disable static generation for this client component
export const dynamic = 'force-dynamic';

export default function UsersPage() {
    console.log('🔵 CLIENT: Rendering UsersPage component in browser (CSR)');

    // No server-side data fetching - let client component handle everything
    return <UserListClient />;
}

