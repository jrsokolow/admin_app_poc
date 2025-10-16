'use client';

/**
 * USER CREATE PAGE - Client Component (CSR)
 * 
 * This page uses Client-Side Rendering for the form.
 * Why CSR for forms?
 * - Forms are highly interactive and need immediate validation
 * - Don't need SEO (forms shouldn't be indexed)
 * - Better UX with instant feedback and state management
 * - No benefit from SSR for user input pages
 */

import { useForm, Create } from '@refinedev/antd';
import { Form, Input, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';

// Disable static generation for this client component
export const dynamic = 'force-dynamic';

export default function UserCreatePage() {
    console.log('🔵 CLIENT: UserCreatePage rendering in browser (CSR only)');

    const { formProps, saveButtonProps } = useForm({
        action: 'create',
        resource: 'users',
        redirect: 'list',
    });

    return (
        <div style={{ padding: '24px' }}>
            <Create
                title="Create New User (CSR)"
                saveButtonProps={saveButtonProps}
                headerButtons={
                    <Link href="/users">
                        <Button>Cancel</Button>
                    </Link>
                }
            >
                <Form {...formProps} layout="vertical">
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
            </Create>
        </div>
    );
}

