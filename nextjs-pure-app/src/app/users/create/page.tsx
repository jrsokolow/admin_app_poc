'use client';

/**
 * USER CREATE PAGE - CSR (NO REFINE)
 * 
 * ❌ WITHOUT REFINE: You must manually:
 * - Manage ALL form state yourself
 * - Handle form submission manually
 * - Handle validation manually
 * - Handle loading states manually
 * - Handle error states manually
 * - Handle success messages manually
 * - Handle navigation after save manually
 * - No useForm() hook - do EVERYTHING manually!
 * 
 * Compare this to Refine version - it's 3x more code!
 */

import { useState } from 'react';
import { Card, Form, Input, Button, message, Typography, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const { Title } = Typography;

export default function UserCreatePage() {
    console.log('🔵 CLIENT (No Refine): Create page - managing ALL state manually!');

    // ❌ Manual state management for everything
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ❌ Manual form submission handler
    const handleSubmit = async (values: any) => {
        console.log('Submitting form manually...', values);

        try {
            setLoading(true);

            // ❌ Manual API call
            const newUser = await api.createUser(values);

            // ❌ Manual success handling
            message.success('User created successfully!');
            console.log('Created user:', newUser);

            // ❌ Manual navigation
            router.push('/users');
        } catch (error) {
            // ❌ Manual error handling
            message.error('Failed to create user');
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    // ❌ Manual error handling for submit
    const handleSubmitFailed = (errorInfo: any) => {
        console.log('Form validation failed:', errorInfo);
        message.error('Please fill in all required fields');
    };

    return (
        <div style={{ padding: '24px' }}>
            <Spin spinning={loading}>
                <Card>
                    {/* ❌ Manual header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Title level={3}>Create New User (No Refine)</Title>
                        <Link href="/users">
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
                                loading={loading}
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

