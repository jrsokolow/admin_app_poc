'use client';

/**
 * USER EDIT PAGE - CSR (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Fetch user data on client
 * - Manage loading states
 * - Populate form manually
 * - Handle form updates
 * - Handle submission
 * - Handle errors
 * - Handle navigation
 * - No useForm() hook with automatic data loading!
 * 
 * This is significantly more complex than Refine version!
 */

import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Typography, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, User } from '@/lib/api';

const { Title } = Typography;

export default function UserEditPage({ params }: { params: { id: string } }) {
    console.log('🔵 CLIENT (No Refine): Edit page - managing ALL state manually!');

    // ❌ Manual state management for EVERYTHING
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // ❌ Manual data fetching on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await api.getUser(params.id);
                setUser(userData);

                // ❌ Manual form population
                form.setFieldsValue(userData);
            } catch (error) {
                message.error('Failed to load user data');
                console.error('Error loading user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [params.id, form]);

    // ❌ Manual form submission handler
    const handleSubmit = async (values: any) => {
        console.log('Submitting form manually...', values);

        try {
            setSubmitting(true);

            // ❌ Manual API call
            const updatedUser = await api.updateUser(params.id, values);

            // ❌ Manual success handling
            message.success('User updated successfully!');
            console.log('Updated user:', updatedUser);

            // ❌ Manual navigation
            router.push(`/users/${params.id}`);
        } catch (error) {
            // ❌ Manual error handling
            message.error('Failed to update user');
            console.error('Error updating user:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // ❌ Manual error handling
    const handleSubmitFailed = (errorInfo: any) => {
        console.log('Form validation failed:', errorInfo);
        message.error('Please fill in all required fields');
    };

    // ❌ Manual loading state
    if (loading) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Loading user data...</p>
            </div>
        );
    }

    // ❌ Manual empty state
    if (!user) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <p>User not found</p>
                <Link href="/users">
                    <Button>Back to List</Button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Spin spinning={submitting}>
                <Card>
                    {/* ❌ Manual header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Title level={3}>Edit User (No Refine)</Title>
                        <Link href={`/users/${params.id}`}>
                            <Button>Cancel</Button>
                        </Link>
                    </div>

                    {/* ❌ Manual form with all fields */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        onFinishFailed={handleSubmitFailed}
                    >
                        <Form.Item label="ID" name="id">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please enter name' },
                                { min: 3, message: 'Name must be at least 3 characters' },
                            ]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                { required: true, message: 'Please enter username' },
                                { min: 3, message: 'Username must be at least 3 characters' },
                            ]}
                        >
                            <Input placeholder="Enter username" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter valid email' },
                            ]}
                        >
                            <Input type="email" placeholder="user@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please enter phone' }]}
                        >
                            <Input placeholder="123-456-7890" />
                        </Form.Item>

                        <Form.Item label="Website" name="website">
                            <Input placeholder="example.com" />
                        </Form.Item>

                        <Form.Item label="Street" name={['address', 'street']}>
                            <Input placeholder="123 Main St" />
                        </Form.Item>

                        <Form.Item label="Suite" name={['address', 'suite']}>
                            <Input placeholder="Apt. 4" />
                        </Form.Item>

                        <Form.Item label="City" name={['address', 'city']}>
                            <Input placeholder="New York" />
                        </Form.Item>

                        <Form.Item label="Zipcode" name={['address', 'zipcode']}>
                            <Input placeholder="10001" />
                        </Form.Item>

                        <Form.Item label="Company Name" name={['company', 'name']}>
                            <Input placeholder="Acme Corp" />
                        </Form.Item>

                        <Form.Item label="Company Catchphrase" name={['company', 'catchPhrase']}>
                            <Input placeholder="Innovation at its finest" />
                        </Form.Item>

                        <Form.Item label="Company BS" name={['company', 'bs']}>
                            <Input placeholder="synergy-driven solutions" />
                        </Form.Item>

                        {/* ❌ Manual submit button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={submitting}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    );
}

