'use client';

/**
 * NEXT.JS + REFINE CLIENT CONTEXT
 * 
 * This file creates the client-side Refine context provider.
 * It's marked with 'use client' because Refine's React Context
 * needs to run on the client side.
 */

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import { dataProvider } from './data-provider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';

export default function RefineContext({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AntdRegistry>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1890ff',
                    },
                }}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
                        resources={[
                            {
                                name: 'users',
                                list: '/users',
                                create: '/users/create',
                                edit: '/users/edit/:id',
                                show: '/users/:id',
                                meta: {
                                    label: 'Users',
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        {children}
                    </Refine>
                </Suspense>
            </ConfigProvider>
        </AntdRegistry>
    );
}

