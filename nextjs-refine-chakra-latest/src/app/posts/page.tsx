'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    useColorModeValue,
    Spinner,
    Center,
    Text,
} from '@chakra-ui/react';
import { useTable, useNavigation } from '@refinedev/core';
import { IconPlus } from '@tabler/icons-react';
import { Post } from '@/types/post';
import { useEditModal } from '@/contexts/EditModalContext';
import EnhancedTable from './components/EnhancedTable';

export const dynamic = 'force-dynamic';

export default function PostsListPage() {
    const { tableQueryResult } = useTable<Post>({
        resource: 'posts',
        pagination: {
            pageSize: 10,
        },
    });

    const { show, create } = useNavigation();
    const { openEditModal } = useEditModal();

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
                        Posts (Resizable & Reorderable)
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
                    <EnhancedTable
                        posts={posts}
                        onView={(id) => show('posts', id)}
                        onEdit={(id) => openEditModal(id)}
                    />
                )}
            </Box>
        </Container>
    );
}


