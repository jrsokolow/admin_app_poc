import { useForm, Edit } from '@refinedev/antd';
import { Form, Input } from 'antd';

/**
 * REFINE USER EDIT
 * 
 * Key Features:
 * - Uses useForm() hook for form management
 * - Hook returns formProps and saveButtonProps
 * - You manually build the form layout with Ant Design components
 * - More control over form structure and validation
 * - Explicit field definitions with Form.Item
 */
export const UserEdit = () => {
    // useForm hook handles form state and API integration
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

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
        </Edit>
    );
};

