'use client';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    FormErrorMessage,
    useToast,
    IconButton,
    HStack,
    Box,
    Text,
} from '@chakra-ui/react';
import { useForm } from '@refinedev/react-hook-form';
import { IconDeviceFloppy, IconMinus, IconMaximize } from '@tabler/icons-react';
import { Post } from '@/types/post';
import { useEffect } from 'react';
import { useEditModal } from '@/contexts/EditModalContext';

export default function EditPostModal() {
    const { isOpen, onClose, postId, isMinimized, setIsMinimized } = useEditModal();

    if (!postId) return null;
    const {
        refineCore: { onFinish, queryResult },
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Post>({
        refineCoreProps: {
            resource: 'posts',
            id: postId,
            action: 'edit',
            redirect: false,
        },
    });

    const toast = useToast();

    // Reset form when modal opens with new data
    useEffect(() => {
        if (queryResult?.data?.data) {
            reset(queryResult.data.data);
        }
    }, [queryResult?.data?.data, reset]);

    const onSubmit = async (data: Post) => {
        try {
            await onFinish(data);
            toast({
                title: 'Post updated',
                description: 'The post has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (isMinimized) {
        // Render as floating box when minimized (no modal blocking)
        return (
            <Box
                position="fixed"
                bottom="20px"
                right="20px"
                width="350px"
                bg="blue.600"
                boxShadow="dark-lg"
                borderRadius="lg"
                zIndex={1400}
                border="2px solid"
                borderColor="blue.500"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '2xl',
                }}
            >
                <HStack
                    justify="space-between"
                    p={4}
                    borderRadius="lg"
                >
                    <Text fontWeight="bold" fontSize="sm" color="white">
                        📝 Edit Post #{postId}
                    </Text>
                    <HStack spacing={1}>
                        <IconButton
                            aria-label="Maximize"
                            icon={<IconMaximize size={18} />}
                            size="sm"
                            variant="solid"
                            colorScheme="whiteAlpha"
                            onClick={() => setIsMinimized(false)}
                            _hover={{ bg: 'whiteAlpha.300' }}
                        />
                        <IconButton
                            aria-label="Close"
                            icon={<Box fontSize="xl" fontWeight="bold">×</Box>}
                            size="sm"
                            variant="solid"
                            colorScheme="whiteAlpha"
                            onClick={onClose}
                            _hover={{ bg: 'red.500' }}
                        />
                    </HStack>
                </HStack>
            </Box>
        );
    }

    // Render as modal when maximized
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack justify="space-between" align="center">
                        <Box>Edit Post #{postId}</Box>
                        <HStack spacing={2}>
                            <IconButton
                                aria-label="Minimize"
                                icon={<IconMinus size={18} />}
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsMinimized(true)}
                            />
                        </HStack>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
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
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="green"
                            leftIcon={<IconDeviceFloppy size={20} />}
                            isLoading={isSubmitting}
                            loadingText="Updating..."
                        >
                            Update Post
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

