import { useTable, List, EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { Table, Space } from 'antd';

/**
 * REFINE USER LIST
 * 
 * Key Features:
 * - Uses useTable() hook for data management
 * - Hook returns tableProps that can be spread to any table component
 * - More explicit control over table configuration
 * - You manually define columns with render functions
 * - Ant Design Table component (or any other UI library)
 * - Buttons from Refine provide automatic navigation/actions
 */
export const UserList = () => {
    // useTable hook provides all table functionality
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="username" title="Username" />
                <Table.Column dataIndex="email" title="Email" />
                <Table.Column dataIndex="phone" title="Phone" />
                <Table.Column dataIndex="website" title="Website" />
                <Table.Column
                    dataIndex={["company", "name"]}
                    title="Company"
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

