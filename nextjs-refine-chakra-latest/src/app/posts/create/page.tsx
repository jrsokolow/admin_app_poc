'use client';

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Heading,
    HStack,
    useColorModeValue,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigation } from '@refinedev/core';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { Post } from '@/types/post';

export const dynamic = 'force-dynamic';

export default function PostCreatePage() {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Post>({
        refineCoreProps: {
            resource: 'posts',
            action: 'create',
        },
    });

    const { list } = useNavigation();
    const toast = useToast();

    const bgColor = useColorModeValue('white', 'gray.800');

    const onSubmit = async (data: Post) => {
        try {
            await onFinish(data);
            toast({
                title: 'Post created',
                description: 'The post has been created successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            list('posts');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg={bgColor} shadow="md" borderRadius="lg" p={8}>
                <HStack justify="space-between" mb={6}>
                    <Heading as="h1" size="lg">
                        Create Post
                    </Heading>
                    <Button
                        leftIcon={<IconArrowLeft size={20} />}
                        variant="ghost"
                        onClick={() => list('posts')}
                    >
                        Back
                    </Button>
                </HStack>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={6} align="stretch">
                        <FormControl isInvalid={!!errors.userId}>
                            <FormLabel>User ID</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter user ID"
                                {...register('userId', {
                                    required: 'User ID is required',
                                    valueAsNumber: true,
                                })}
                            />
                            <FormErrorMessage>
                                {errors.userId?.message as string}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.title}>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="Enter post title"
                                {...register('title', {
                                    required: 'Title is required',
                                    minLength: {
                                        value: 5,
                                        message: 'Title must be at least 5 characters',
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.title?.message as string}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.body}>
                            <FormLabel>Body</FormLabel>
                            <Textarea
                                placeholder="Enter post content"
                                rows={6}
                                {...register('body', {
                                    required: 'Body is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Body must be at least 10 characters',
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.body?.message as string}
                            </FormErrorMessage>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            leftIcon={<IconDeviceFloppy size={20} />}
                            isLoading={isSubmitting}
                            loadingText="Creating..."
                        >
                            Create Post
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}


