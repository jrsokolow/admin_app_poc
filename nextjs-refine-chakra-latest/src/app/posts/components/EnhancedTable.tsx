'use client';

import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    HStack,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    ColumnResizeMode,
} from '@tanstack/react-table';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { Post } from '@/types/post';
import { useState, useMemo } from 'react';

interface EnhancedTableProps {
    posts: Post[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function EnhancedTable({ posts, onView, onEdit, onDelete }: EnhancedTableProps) {
    const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

    const columns = useMemo<ColumnDef<Post>[]>(
        () => [
            {
                id: 'id',
                accessorKey: 'id',
                header: 'ID',
                size: 80,
                minSize: 50,
                maxSize: 150,
                cell: ({ getValue }) => (
                    <Badge colorScheme="blue">{getValue() as number}</Badge>
                ),
            },
            {
                id: 'userId',
                accessorKey: 'userId',
                header: 'User ID',
                size: 100,
                minSize: 70,
                maxSize: 150,
                cell: ({ getValue }) => (
                    <Badge colorScheme="purple">{getValue() as number}</Badge>
                ),
            },
            {
                id: 'title',
                accessorKey: 'title',
                header: 'Title',
                size: 300,
                minSize: 150,
                maxSize: 600,
                cell: ({ getValue }) => (
                    <Box fontWeight="medium" isTruncated maxW="400px">
                        {getValue() as string}
                    </Box>
                ),
            },
            {
                id: 'body',
                accessorKey: 'body',
                header: 'Body',
                size: 400,
                minSize: 200,
                maxSize: 800,
                cell: ({ getValue }) => (
                    <Box isTruncated maxW="500px" color="gray.600">
                        {getValue() as string}
                    </Box>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 150,
                minSize: 120,
                maxSize: 200,
                enableResizing: false,
                cell: ({ row }) => (
                    <HStack spacing={2} justify="center">
                        <IconButton
                            aria-label="View"
                            icon={<IconEye size={18} />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => onView(row.original.id)}
                        />
                        <IconButton
                            aria-label="Edit"
                            icon={<IconEdit size={18} />}
                            size="sm"
                            colorScheme="green"
                            variant="ghost"
                            onClick={() => onEdit(row.original.id)}
                        />
                        {onDelete && (
                            <IconButton
                                aria-label="Delete"
                                icon={<IconTrash size={18} />}
                                size="sm"
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => onDelete(row.original.id)}
                            />
                        )}
                    </HStack>
                ),
            },
        ],
        [onView, onEdit, onDelete]
    );

    const table = useReactTable({
        data: posts,
        columns,
        columnResizeMode,
        enableColumnResizing: true,
        getCoreRowModel: getCoreRowModel(),
    });

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Box overflowX="auto" bg={bgColor} borderRadius="md">
            <Table
                variant="simple"
                size="sm"
                style={{
                    width: table.getTotalSize(),
                    tableLayout: 'fixed',
                }}
            >
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th
                                    key={header.id}
                                    style={{
                                        width: `${header.getSize()}px`,
                                        position: 'relative',
                                    }}
                                    paddingRight="8px"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {header.column.getCanResize() && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                height: '100%',
                                                width: '10px',
                                                background: header.column.getIsResizing() ? '#3182ce' : 'rgba(66, 153, 225, 0.3)',
                                                cursor: 'col-resize',
                                                userSelect: 'none',
                                                touchAction: 'none',
                                                zIndex: 100,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#4299e1';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!header.column.getIsResizing()) {
                                                    e.currentTarget.style.background = 'rgba(66, 153, 225, 0.3)';
                                                }
                                            }}
                                        />
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                            {row.getVisibleCells().map((cell) => (
                                <Td
                                    key={cell.id}
                                    style={{
                                        width: `${cell.column.getSize()}px`,
                                        maxWidth: `${cell.column.getSize()}px`,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Box p={3} fontSize="sm" color="gray.600" bg={useColorModeValue('gray.50', 'gray.700')} borderTop="1px" borderColor={borderColor}>
                💡 <strong>Tip:</strong> Hover over column edges and drag to resize column widths
            </Box>
        </Box>
    );
}

