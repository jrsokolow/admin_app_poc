'use client';

import { Box, Button, Container, Heading, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
    return (
        <Container maxW="container.xl" py={10}>
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Heading as="h1" size="2xl" mb={4} color="gray.800">
                        Product Management System
                    </Heading>
                    <Text fontSize="xl" color="gray.600" mb={8}>
                        Built with Next.js, Refine, and Chakra UI
                    </Text>
                </Box>

                <Box textAlign="center">
                    <Link href="/products">
                        <Button colorScheme="blue" size="lg" px={8} py={6}>
                            Go to Products
                        </Button>
                    </Link>
                </Box>

                <Box
                    bg="white"
                    p={8}
                    borderRadius="lg"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Heading as="h2" size="lg" mb={6} color="gray.800">
                        Features
                    </Heading>
                    <VStack align="start" spacing={4}>
                        <HStack spacing={3}>
                            <Icon as={CheckIcon} color="green.500" boxSize={5} />
                            <Text color="gray.700" fontSize="md" fontWeight="500">
                                Full CRUD operations for products
                            </Text>
                        </HStack>
                        <HStack spacing={3}>
                            <Icon as={CheckIcon} color="green.500" boxSize={5} />
                            <Text color="gray.700" fontSize="md" fontWeight="500">
                                Beautiful UI with Chakra UI
                            </Text>
                        </HStack>
                        <HStack spacing={3}>
                            <Icon as={CheckIcon} color="green.500" boxSize={5} />
                            <Text color="gray.700" fontSize="md" fontWeight="500">
                                Powered by Refine framework
                            </Text>
                        </HStack>
                        <HStack spacing={3}>
                            <Icon as={CheckIcon} color="green.500" boxSize={5} />
                            <Text color="gray.700" fontSize="md" fontWeight="500">
                                Connected to NestJS backend
                            </Text>
                        </HStack>
                        <HStack spacing={3}>
                            <Icon as={CheckIcon} color="green.500" boxSize={5} />
                            <Text color="gray.700" fontSize="md" fontWeight="500">
                                Responsive design
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

