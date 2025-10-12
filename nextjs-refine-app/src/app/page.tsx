import { redirect } from 'next/navigation';

/**
 * ROOT PAGE - Server Component
 * 
 * Redirects to /users on initial load
 */

export default function Home() {
    redirect('/users');
}

