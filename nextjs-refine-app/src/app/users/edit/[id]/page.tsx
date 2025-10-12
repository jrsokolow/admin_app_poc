'use client';

/**
 * USER EDIT PAGE - Client Component (CSR)
 * 
 * This page uses Client-Side Rendering for the form.
 * Why CSR for forms?
 * - Forms need real-time validation and state management
 * - Better UX with immediate feedback
 * - No SEO benefit needed for edit pages
 * - Easier to handle complex form interactions
 */

import { useForm, Edit } from '@refinedev/antd';
import { Form, Input, Button, Spin } from 'antd';
import Link from 'next/link';

export default function UserEditPage({ params }: { params: { id: string } }) {
    const { formProps, saveButtonProps, queryResult } = useForm({
        action: 'edit',
        resource: 'users',
        id: params.id,
        redirect: 'show',
    });

    const isLoading = queryResult?.isLoading;

    if (isLoading) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Edit
                title="Edit User (CSR)"
                saveButtonProps={saveButtonProps}
                headerButtons={
                    <Link href={`/users/${params.id}`}>
                        <Button>Cancel</Button>
                    </Link>
                }
            >
                <Form {...formProps} layout="vertical">
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
                </Form>
            </Edit>
        </div>
    );
}

