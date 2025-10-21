'use client';

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    NumberInput,
    NumberInputField,
    Textarea,
    VStack,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigation } from '@refinedev/core';

export const dynamic = 'force-dynamic';

export default function ProductCreatePage() {
    const { list } = useNavigation();

    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm({
        refineCoreProps: {
            resource: 'products',
            action: 'create',
            redirect: 'list',
        },
    });

    const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <Container maxW="container.md" py={8}>
            <Box bg={bgColor} shadow="md" borderRadius="lg" p={8}>
                <Heading as="h1" size="lg" mb={6}>
                    Create Product
                </Heading>

                <form onSubmit={saveButtonProps.onClick}>
                    <VStack spacing={6} align="stretch">
                        <FormControl isRequired isInvalid={!!errors.name}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Enter product name"
                                {...register('name', { required: 'Name is required' })}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.description}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Enter product description"
                                rows={4}
                                {...register('description', { required: 'Description is required' })}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.price}>
                            <FormLabel>Price</FormLabel>
                            <NumberInput min={0} step={0.01}>
                                <NumberInputField
                                    placeholder="0.00"
                                    {...register('price', {
                                        required: 'Price is required',
                                        valueAsNumber: true,
                                    })}
                                />
                            </NumberInput>
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.category}>
                            <FormLabel>Category</FormLabel>
                            <Input
                                placeholder="Enter category"
                                {...register('category', { required: 'Category is required' })}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.stock}>
                            <FormLabel>Stock</FormLabel>
                            <NumberInput min={0}>
                                <NumberInputField
                                    placeholder="0"
                                    {...register('stock', {
                                        required: 'Stock is required',
                                        valueAsNumber: true,
                                    })}
                                />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                placeholder="https://example.com/image.jpg"
                                {...register('imageUrl')}
                            />
                        </FormControl>

                        <HStack spacing={4} justify="flex-end">
                            <Button
                                variant="ghost"
                                onClick={() => list('products')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={formLoading}
                                loadingText="Creating..."
                            >
                                Create Product
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}

