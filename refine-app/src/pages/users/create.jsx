import { useForm, Create } from '@refinedev/antd';
import { Form, Input } from 'antd';

/**
 * REFINE USER CREATE
 * 
 * Key Features:
 * - Similar to Edit but for creating new records
 * - Same hook-based approach with useForm()
 * - Manual form layout definition
 * - Full control over validation and field behavior
 */
export const UserCreate = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Name is required' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Username is required' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name="website">
                    <Input />
                </Form.Item>

                <Form.Item label="Street" name={["address", "street"]}>
                    <Input />
                </Form.Item>

                <Form.Item label="City" name={["address", "city"]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Zipcode" name={["address", "zipcode"]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Company Name" name={["company", "name"]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Company Catchphrase" name={["company", "catchPhrase"]}>
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};

