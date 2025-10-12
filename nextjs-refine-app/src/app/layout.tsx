import type { Metadata } from 'next';
import RefineContext from '@/providers/refine-context';
import '@refinedev/antd/dist/reset.css';

/**
 * NEXT.JS ROOT LAYOUT
 * 
 * This is the root layout for the Next.js app.
 * It wraps all pages with the Refine context provider.
 * This layout is a Server Component by default.
 */

export const metadata: Metadata = {
    title: 'Next.js + Refine + Ant Design',
    description: 'CRUD app with SSR using Next.js, Refine, and Ant Design',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <RefineContext>{children}</RefineContext>
            </body>
        </html>
    );
}

