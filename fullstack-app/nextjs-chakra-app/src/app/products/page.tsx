'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    HStack,
    IconButton,
    useColorModeValue,
    Spinner,
    Center,
    Text,
} from '@chakra-ui/react';
import { useTable, useNavigation } from '@refinedev/core';
import { IconEdit, IconEye, IconTrash, IconPlus } from '@tabler/icons-react';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export default function ProductsListPage() {
    const { tableQueryResult } = useTable<Product>({
        resource: 'products',
    });

    const { edit, show, create } = useNavigation();

    const { data, isLoading } = tableQueryResult;
    const products = data?.data || [];

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Box bg={bgColor} shadow="md" borderRadius="lg" p={6}>
                <HStack justify="space-between" mb={6}>
                    <Heading as="h1" size="lg">
                        Products
                    </Heading>
                    <Button
                        leftIcon={<IconPlus size={20} />}
                        colorScheme="blue"
                        onClick={() => create('products')}
                    >
                        Create Product
                    </Button>
                </HStack>

                {products.length === 0 ? (
                    <Center py={10}>
                        <Text color="gray.500">No products found. Create your first product!</Text>
                    </Center>
                ) : (
                    <Box overflowX="auto">
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Category</Th>
                                    <Th isNumeric>Price</Th>
                                    <Th isNumeric>Stock</Th>
                                    <Th>Status</Th>
                                    <Th textAlign="center">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {products.map((product) => (
                                    <Tr key={product.id}>
                                        <Td>{product.id}</Td>
                                        <Td fontWeight="medium">{product.name}</Td>
                                        <Td>
                                            <Badge colorScheme="purple">{product.category}</Badge>
                                        </Td>
                                        <Td isNumeric fontWeight="bold">
                                            ${product.price.toFixed(2)}
                                        </Td>
                                        <Td isNumeric>{product.stock}</Td>
                                        <Td>
                                            {product.stock > 20 ? (
                                                <Badge colorScheme="green">In Stock</Badge>
                                            ) : product.stock > 0 ? (
                                                <Badge colorScheme="yellow">Low Stock</Badge>
                                            ) : (
                                                <Badge colorScheme="red">Out of Stock</Badge>
                                            )}
                                        </Td>
                                        <Td>
                                            <HStack spacing={2} justify="center">
                                                <IconButton
                                                    aria-label="View"
                                                    icon={<IconEye size={18} />}
                                                    size="sm"
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    onClick={() => show('products', product.id)}
                                                />
                                                <IconButton
                                                    aria-label="Edit"
                                                    icon={<IconEdit size={18} />}
                                                    size="sm"
                                                    colorScheme="green"
                                                    variant="ghost"
                                                    onClick={() => edit('products', product.id)}
                                                />
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<IconTrash size={18} />}
                                                    size="sm"
                                                    colorScheme="red"
                                                    variant="ghost"
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

