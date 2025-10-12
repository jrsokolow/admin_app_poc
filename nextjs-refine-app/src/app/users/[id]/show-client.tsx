'use client';

/**
 * USER SHOW CLIENT COMPONENT
 * 
 * This client component renders the user details.
 * It receives initial data from the server component (SSR).
 */

import { useOne } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { Typography, Descriptions, Button, Space } from 'antd';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title } = Typography;

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

interface UserShowClientProps {
    initialUser: User;
    userId: string;
}

export default function UserShowClient({
    initialUser,
    userId,
}: UserShowClientProps) {
    // useOne hook with SSR initial data
    const { data, isLoading } = useOne<User>({
        resource: 'users',
        id: userId,
        queryOptions: {
            initialData: {
                data: initialUser,
            },
        },
    });

    const user = data?.data || initialUser;

    return (
        <div style={{ padding: '24px' }}>
            <Show
                isLoading={isLoading}
                title={`User Details (SSR)`}
                headerButtons={
                    <Space>
                        <Link href="/users">
                            <Button icon={<UnorderedListOutlined />}>Back to List</Button>
                        </Link>
                        <Link href={`/users/edit/${userId}`}>
                            <Button type="primary" icon={<EditOutlined />}>
                                Edit User
                            </Button>
                        </Link>
                    </Space>
                }
            >
                <Title level={4}>{user.name}</Title>

                <Descriptions bordered column={1} style={{ marginTop: '16px' }}>
                    <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                    <Descriptions.Item label="Website">
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                            {user.website}
                        </a>
                    </Descriptions.Item>
                </Descriptions>

                <Title level={5} style={{ marginTop: '24px' }}>
                    Address
                </Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Street">{user.address.street}</Descriptions.Item>
                    <Descriptions.Item label="Suite">{user.address.suite}</Descriptions.Item>
                    <Descriptions.Item label="City">{user.address.city}</Descriptions.Item>
                    <Descriptions.Item label="Zipcode">{user.address.zipcode}</Descriptions.Item>
                </Descriptions>

                <Title level={5} style={{ marginTop: '24px' }}>
                    Company
                </Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Name">{user.company.name}</Descriptions.Item>
                    <Descriptions.Item label="Catch Phrase">{user.company.catchPhrase}</Descriptions.Item>
                    <Descriptions.Item label="BS">{user.company.bs}</Descriptions.Item>
                </Descriptions>
            </Show>
        </div>
    );
}

