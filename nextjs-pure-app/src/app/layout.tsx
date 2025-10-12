import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import './globals.css';

/**
 * ROOT LAYOUT - Pure Next.js (NO REFINE)
 * 
 * Without Refine, you only have Ant Design styling,
 * no automatic routing, no data management, no hooks.
 */

export const metadata: Metadata = {
    title: 'Pure Next.js + Ant Design (No Refine)',
    description: 'CRUD app without Refine to show the difference',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#1890ff',
                            },
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}

