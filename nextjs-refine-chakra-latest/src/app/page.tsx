'use client';

import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box minH="100vh" bg={bgColor} py={10}>
            <Container maxW="container.xl">
                <VStack spacing={8} align="stretch">
                    <Box textAlign="center">
                        <Heading as="h1" size="2xl" mb={4} color="blue.600">
                            Next.js + Refine + Chakra UI
                        </Heading>
                        <Text fontSize="xl" color="gray.600" mb={8}>
                            Modern CRUD Application with Latest Packages
                        </Text>
                    </Box>

                    <Box textAlign="center">
                        <Link href="/posts">
                            <Button colorScheme="blue" size="lg" px={8}>
                                Go to Posts
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
                                    Next.js 15 - Latest stable version
                                </Text>
                            </HStack>
                            <HStack spacing={3}>
                                <Icon as={CheckIcon} color="green.500" boxSize={5} />
                                <Text color="gray.700" fontSize="md" fontWeight="500">
                                    Refine 4.55+ - Headless React framework
                                </Text>
                            </HStack>
                            <HStack spacing={3}>
                                <Icon as={CheckIcon} color="green.500" boxSize={5} />
                                <Text color="gray.700" fontSize="md" fontWeight="500">
                                    Chakra UI 2.10+ - Modern component library
                                </Text>
                            </HStack>
                            <HStack spacing={3}>
                                <Icon as={CheckIcon} color="green.500" boxSize={5} />
                                <Text color="gray.700" fontSize="md" fontWeight="500">
                                    TypeScript 5.6 - Type safety
                                </Text>
                            </HStack>
                            <HStack spacing={3}>
                                <Icon as={CheckIcon} color="green.500" boxSize={5} />
                                <Text color="gray.700" fontSize="md" fontWeight="500">
                                    JSONPlaceholder API - Ready-to-use REST API
                                </Text>
                            </HStack>
                            <HStack spacing={3}>
                                <Icon as={CheckIcon} color="green.500" boxSize={5} />
                                <Text color="gray.700" fontSize="md" fontWeight="500">
                                    Full CRUD operations
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>

                    <Box
                        bg="blue.50"
                        p={6}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="blue.200"
                    >
                        <Heading as="h3" size="md" mb={3} color="blue.800">
                            Package Versions
                        </Heading>
                        <VStack align="start" spacing={2}>
                            <Text color="gray.700" fontSize="sm">
                                <strong>Next.js:</strong> 15.0.3
                            </Text>
                            <Text color="gray.700" fontSize="sm">
                                <strong>Refine Core:</strong> 4.55.2
                            </Text>
                            <Text color="gray.700" fontSize="sm">
                                <strong>Chakra UI:</strong> 2.10.4
                            </Text>
                            <Text color="gray.700" fontSize="sm">
                                <strong>React:</strong> 18.3.1
                            </Text>
                            <Text color="gray.700" fontSize="sm">
                                <strong>TypeScript:</strong> 5.6.3
                            </Text>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}


