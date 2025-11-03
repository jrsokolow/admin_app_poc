'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { RefineThemes } from '@refinedev/chakra-ui';
import { Suspense } from 'react';
import { EditModalProvider } from '@/contexts/EditModalContext';
import EditPostModal from './posts/components/EditPostModal';

const API_URL = 'https://jsonplaceholder.typicode.com';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={RefineThemes.Blue}>
            <EditModalProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(API_URL)}
                        resources={[
                            {
                                name: 'posts',
                                list: '/posts',
                                create: '/posts/create',
                                show: '/posts/show/:id',
                                meta: {
                                    label: 'Posts',
                                },
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        {children}
                        <EditPostModal />
                    </Refine>
                </Suspense>
            </EditModalProvider>
        </ChakraProvider>
    );
}


