import { Suspense } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import ProductsListClient from './list-client';
import { Product } from '@/types/product';

// Server-side uses internal Docker hostname, client-side uses localhost
const API_URL = typeof window === 'undefined'
    ? (process.env.API_URL_INTERNAL || 'http://backend:4000')
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');

async function getProducts(): Promise<Product[]> {
    console.log('🟢 SERVER: Fetching products from', API_URL);

    try {
        const response = await fetch(`${API_URL}/products`, {
            cache: 'no-store', // Always fetch fresh data (SSR)
        });

        if (!response.ok) {
            console.error('🟢 SERVER: Failed to fetch products:', response.status);
            return [];
        }

        const products = await response.json();
        console.log('🟢 SERVER: Fetched', products.length, 'products');
        return products;
    } catch (error) {
        console.error('🟢 SERVER: Error fetching products:', error);
        return [];
    }
}

function LoadingProducts() {
    return (
        <Center h="100vh">
            <Spinner size="xl" color="blue.500" />
        </Center>
    );
}

export default async function ProductsListPage() {
    console.log('🟢 SERVER: ProductsListPage - Server-Side Rendering');

    const products = await getProducts();

    return (
        <Suspense fallback={<LoadingProducts />}>
            <ProductsListClient products={products} />
        </Suspense>
    );
}

