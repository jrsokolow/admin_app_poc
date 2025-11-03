import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Next.js + Refine + Chakra UI',
    description: 'Modern CRUD application with latest packages',
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


