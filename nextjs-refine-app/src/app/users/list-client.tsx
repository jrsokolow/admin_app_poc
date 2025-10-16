'use client';

/**
 * USERS LIST CLIENT COMPONENT
 * 
 * This client component renders the user list with Ant Design Table.
 * It receives initial data from the server component (SSR),
 * but can also fetch more data client-side for pagination/filtering.
 */

import { useList } from '@refinedev/core';
import { List } from '@refinedev/antd';
import { Table, Space, Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { User } from '@/types/user';

interface UserListClientProps {
    initialUsers: User[];
    initialTotal: number;
}

export default function UserListClient({
    initialUsers,
    initialTotal,
}: UserListClientProps) {
    console.log('🔵 CLIENT: UserListClient component rendering in browser');
    console.log('🔵 CLIENT: Received', initialUsers.length, 'users from server');

    // useList hook can use SSR data or fetch client-side
    const { data, isLoading } = useList<User>({
        resource: 'users',
        queryOptions: {
            // Use initial data from SSR
            initialData: {
                data: initialUsers,
                total: initialTotal,
            },
        },
    });

    const users = data?.data || initialUsers;

    return (
        <div style={{ padding: '24px' }}>
            <List
                title="Users List (SSR)"
                headerButtons={
                    <Link href="/users/create">
                        <Button type="primary">Create User</Button>
                    </Link>
                }
            >
                <Table
                    dataSource={users}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        total: data?.total || initialTotal,
                    }}
                >
                    <Table.Column dataIndex="id" title="ID" width={80} />
                    <Table.Column dataIndex="name" title="Name" />
                    <Table.Column dataIndex="username" title="Username" />
                    <Table.Column dataIndex="email" title="Email" />
                    <Table.Column dataIndex="phone" title="Phone" />
                    <Table.Column dataIndex="website" title="Website" />
                    <Table.Column
                        dataIndex={['company', 'name']}
                        title="Company"
                    />
                    <Table.Column
                        title="Actions"
                        width={150}
                        render={(_, record: User) => (
                            <Space>
                                <Link href={`/users/${record.id}`}>
                                    <Button
                                        type="default"
                                        icon={<EyeOutlined />}
                                        size="small"
                                    >
                                        Show
                                    </Button>
                                </Link>
                                <Link href={`/users/edit/${record.id}`}>
                                    <Button
                                        type="default"
                                        icon={<EditOutlined />}
                                        size="small"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                            </Space>
                        )}
                    />
                </Table>
            </List>
        </div>
    );
}

