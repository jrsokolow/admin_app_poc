'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    VStack,
    Text,
    Badge,
    Image,
    useColorModeValue,
    Spinner,
    Center,
    Divider,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { useShow, useNavigation } from '@refinedev/core';
import { IconEdit, IconArrowLeft } from '@tabler/icons-react';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export default function ProductShowPage({ params }: { params: { id: string } }) {
    const { queryResult } = useShow<Product>({
        resource: 'products',
        id: params.id,
    });

    const { list, edit } = useNavigation();

    const { data, isLoading } = queryResult;
    const product = data?.data;

    const bgColor = useColorModeValue('white', 'gray.800');
    const labelColor = useColorModeValue('gray.600', 'gray.400');

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    if (!product) {
        return (
            <Center h="100vh">
                <Text>Product not found</Text>
            </Center>
        );
    }

    return (
        <Container maxW="container.lg" py={8}>
            <Box bg={bgColor} shadow="md" borderRadius="lg" p={8}>
                <HStack justify="space-between" mb={6}>
                    <Heading as="h1" size="lg">
                        Product Details
                    </Heading>
                    <HStack spacing={3}>
                        <Button
                            leftIcon={<IconArrowLeft size={18} />}
                            variant="ghost"
                            onClick={() => list('products')}
                        >
                            Back to List
                        </Button>
                        <Button
                            leftIcon={<IconEdit size={18} />}
                            colorScheme="blue"
                            onClick={() => edit('products', product.id)}
                        >
                            Edit Product
                        </Button>
                    </HStack>
                </HStack>

                <Divider mb={6} />

                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
                    <GridItem>
                        {product.imageUrl && (
                            <Box mb={6}>
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    borderRadius="md"
                                    objectFit="cover"
                                    w="100%"
                                    h="300px"
                                />
                            </Box>
                        )}

                        <VStack align="stretch" spacing={4}>
                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Name
                                </Text>
                                <Text fontSize="xl" fontWeight="bold">
                                    {product.name}
                                </Text>
                            </Box>

                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Description
                                </Text>
                                <Text>{product.description}</Text>
                            </Box>
                        </VStack>
                    </GridItem>

                    <GridItem>
                        <VStack align="stretch" spacing={6}>
                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Price
                                </Text>
                                <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                                    ${product.price.toFixed(2)}
                                </Text>
                            </Box>

                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Category
                                </Text>
                                <Badge colorScheme="purple" fontSize="md" p={2}>
                                    {product.category}
                                </Badge>
                            </Box>

                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Stock
                                </Text>
                                <HStack>
                                    <Text fontSize="2xl" fontWeight="semibold">
                                        {product.stock}
                                    </Text>
                                    <Text color={labelColor}>units</Text>
                                    {product.stock > 20 ? (
                                        <Badge colorScheme="green">In Stock</Badge>
                                    ) : product.stock > 0 ? (
                                        <Badge colorScheme="yellow">Low Stock</Badge>
                                    ) : (
                                        <Badge colorScheme="red">Out of Stock</Badge>
                                    )}
                                </HStack>
                            </Box>

                            <Divider />

                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Created At
                                </Text>
                                <Text>{new Date(product.createdAt).toLocaleString()}</Text>
                            </Box>

                            <Box>
                                <Text fontSize="sm" color={labelColor} mb={1}>
                                    Last Updated
                                </Text>
                                <Text>{new Date(product.updatedAt).toLocaleString()}</Text>
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </Container>
    );
}

