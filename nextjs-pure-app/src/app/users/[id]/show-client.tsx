'use client';

/**
 * USER SHOW CLIENT - Pure Next.js (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Build entire layout
 * - Structure all fields
 * - Create navigation buttons
 * - No useShow() hook
 * - No automatic breadcrumbs
 * - No Show wrapper component
 */

import { Card, Descriptions, Button, Space, Typography } from 'antd';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { User } from '@/lib/api';

const { Title } = Typography;

interface UserShowClientProps {
    initialUser: User;
    userId: string;
}

export default function UserShowClient({
    initialUser,
    userId,
}: UserShowClientProps) {
    const user = initialUser;

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                {/* ❌ Manual header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Title level={3}>User Details (No Refine)</Title>
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
                </div>

                <Title level={4}>{user.name}</Title>

                {/* ❌ Manual field display */}
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
            </Card>
        </div>
    );
}

