'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Divider,
    useColorModeValue,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useShow, useNavigation } from '@refinedev/core';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { Post } from '@/types/post';
import { useEditModal } from '@/contexts/EditModalContext';

export const dynamic = 'force-dynamic';

export default function PostShowPage({ params }: { params: { id: string } }) {
    const { queryResult } = useShow<Post>({
        resource: 'posts',
        id: params.id,
    });

    const { list } = useNavigation();
    const { openEditModal } = useEditModal();

    const { data, isLoading } = queryResult;
    const post = data?.data;

    const bgColor = useColorModeValue('white', 'gray.800');

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    if (!post) {
        return (
            <Container maxW="container.md" py={8}>
                <Text>Post not found</Text>
            </Container>
        );
    }

    return (
        <Container maxW="container.md" py={8}>
            <Box bg={bgColor} shadow="md" borderRadius="lg" p={8}>
                <HStack justify="space-between" mb={6}>
                    <Button
                        leftIcon={<IconArrowLeft size={20} />}
                        variant="ghost"
                        onClick={() => list('posts')}
                    >
                        Back to Posts
                    </Button>
                    <Button
                        leftIcon={<IconEdit size={20} />}
                        colorScheme="green"
                        onClick={() => openEditModal(post.id)}
                    >
                        Edit Post
                    </Button>
                </HStack>

                <Divider mb={6} />

                <VStack align="start" spacing={4}>
                    <HStack>
                        <Text fontWeight="bold" color="gray.600">
                            ID:
                        </Text>
                        <Badge colorScheme="blue" fontSize="md">
                            {post.id}
                        </Badge>
                    </HStack>

                    <HStack>
                        <Text fontWeight="bold" color="gray.600">
                            User ID:
                        </Text>
                        <Badge colorScheme="purple" fontSize="md">
                            {post.userId}
                        </Badge>
                    </HStack>

                    <Box w="full">
                        <Text fontWeight="bold" color="gray.600" mb={2}>
                            Title:
                        </Text>
                        <Heading as="h2" size="lg" color="gray.800">
                            {post.title}
                        </Heading>
                    </Box>

                    <Box w="full">
                        <Text fontWeight="bold" color="gray.600" mb={2}>
                            Body:
                        </Text>
                        <Text color="gray.700" fontSize="md" lineHeight="tall">
                            {post.body}
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Container>
    );
}


