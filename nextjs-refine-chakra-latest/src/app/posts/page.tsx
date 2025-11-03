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
    HStack,
    IconButton,
    useColorModeValue,
    Spinner,
    Center,
    Text,
    Badge,
} from '@chakra-ui/react';
import { useTable, useNavigation } from '@refinedev/core';
import { IconEdit, IconEye, IconTrash, IconPlus } from '@tabler/icons-react';
import { Post } from '@/types/post';

export const dynamic = 'force-dynamic';

export default function PostsListPage() {
    const { tableQueryResult } = useTable<Post>({
        resource: 'posts',
        pagination: {
            pageSize: 10,
        },
    });

    const { edit, show, create } = useNavigation();

    const { data, isLoading } = tableQueryResult;
    const posts = data?.data || [];

    const bgColor = useColorModeValue('white', 'gray.800');

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
                        Posts
                    </Heading>
                    <Button
                        leftIcon={<IconPlus size={20} />}
                        colorScheme="blue"
                        onClick={() => create('posts')}
                    >
                        Create Post
                    </Button>
                </HStack>

                {posts.length === 0 ? (
                    <Center py={10}>
                        <Text color="gray.500">No posts found.</Text>
                    </Center>
                ) : (
                    <Box overflowX="auto">
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>User ID</Th>
                                    <Th>Title</Th>
                                    <Th>Body</Th>
                                    <Th textAlign="center">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {posts.map((post) => (
                                    <Tr key={post.id}>
                                        <Td>
                                            <Badge colorScheme="blue">{post.id}</Badge>
                                        </Td>
                                        <Td>
                                            <Badge colorScheme="purple">{post.userId}</Badge>
                                        </Td>
                                        <Td fontWeight="medium" maxW="300px" isTruncated>
                                            {post.title}
                                        </Td>
                                        <Td maxW="400px" isTruncated color="gray.600">
                                            {post.body}
                                        </Td>
                                        <Td>
                                            <HStack spacing={2} justify="center">
                                                <IconButton
                                                    aria-label="View"
                                                    icon={<IconEye size={18} />}
                                                    size="sm"
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    onClick={() => show('posts', post.id)}
                                                />
                                                <IconButton
                                                    aria-label="Edit"
                                                    icon={<IconEdit size={18} />}
                                                    size="sm"
                                                    colorScheme="green"
                                                    variant="ghost"
                                                    onClick={() => edit('posts', post.id)}
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


