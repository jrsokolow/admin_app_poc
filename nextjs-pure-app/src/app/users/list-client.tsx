'use client';

/**
 * USER LIST CLIENT - Pure Next.js (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Build entire table UI
 * - Handle pagination yourself
 * - Handle sorting yourself
 * - Handle filtering yourself
 * - Create action buttons
 * - Handle navigation
 * - Handle delete confirmations
 * - No useTable() hook - do everything manually!
 */

import { useState } from 'react';
import { Table, Button, Space, Card, Typography, message, Modal } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, User } from '@/lib/api';

const { Title } = Typography;

interface UserListClientProps {
    initialUsers: User[];
    initialTotal: number;
}

export default function UserListClient({
    initialUsers,
    initialTotal,
}: UserListClientProps) {
    console.log('🔵 CLIENT (No Refine): Rendering list without Refine hooks');

    // ❌ Manual state management
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ❌ Manual delete handler
    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    setLoading(true);
                    await api.deleteUser(id);

                    // ❌ Manual state update
                    setUsers(users.filter(u => u.id !== id));
                    message.success('User deleted successfully');
                } catch (error) {
                    message.error('Failed to delete user');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    // ❌ Manual column definitions
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Company',
            dataIndex: ['company', 'name'],
            key: 'company',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (_: any, record: User) => (
                <Space>
                    <Link href={`/users/${record.id}`}>
                        <Button type="default" icon={<EyeOutlined />} size="small">
                            Show
                        </Button>
                    </Link>
                    <Link href={`/users/edit/${record.id}`}>
                        <Button type="default" icon={<EditOutlined />} size="small">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        type="default"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDelete(record.id)}
                        loading={loading}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            {/* ❌ Manual header */}
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Title level={3}>Users List (No Refine)</Title>
                    <Link href="/users/create">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Create User
                        </Button>
                    </Link>
                </div>

                {/* ❌ Manual table with all configurations */}
                <Table
                    dataSource={users}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        total: initialTotal,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} users`,
                    }}
                />
            </Card>
        </div>
    );
}

