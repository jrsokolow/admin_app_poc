'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { RefineThemes } from '@refinedev/chakra-ui';
import { Suspense } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={RefineThemes.Blue}>
            <Suspense fallback={<div>Loading...</div>}>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: 'products',
                            list: '/products',
                            create: '/products/create',
                            edit: '/products/edit/:id',
                            show: '/products/show/:id',
                            meta: {
                                label: 'Products',
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
        </ChakraProvider>
    );
}

