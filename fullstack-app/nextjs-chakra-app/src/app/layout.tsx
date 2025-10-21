import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Product Management - Next.js + Refine + Chakra UI',
    description: 'CRUD application built with Next.js, Refine, and Chakra UI',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

