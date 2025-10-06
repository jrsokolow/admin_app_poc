# Side-by-Side Code Comparison

This document shows the same functionality implemented in both React Admin and Refine, making it easy to see the differences at a glance.

## 1. Application Setup

### React Admin
```jsx
// react-admin-app/src/App.jsx
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList, UserEdit, UserCreate, UserShow } from './users';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Admin 
      dataProvider={dataProvider}
      title="React Admin CRUD App"
    >
      <Resource 
        name="users" 
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        show={UserShow}
      />
    </Admin>
  );
}
```

**Key Points:**
- Single `<Admin>` wrapper
- Resources as components
- Routing is automatic
- ~15 lines of code

---

### Refine
```jsx
// refine-app/src/App.jsx
import { Refine } from '@refinedev/core';
import routerBindings from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemedLayoutV2, RefineThemes } from '@refinedev/antd';
import { UserList, UserEdit, UserCreate, UserShow } from './pages/users';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider('https://jsonplaceholder.typicode.com')}
          routerProvider={routerBindings}
          resources={[
            {
              name: 'users',
              list: '/users',
              create: '/users/create',
              edit: '/users/edit/:id',
              show: '/users/show/:id',
            }
          ]}
        >
          <Routes>
            <Route element={<ThemedLayoutV2><Outlet /></ThemedLayoutV2>}>
              <Route path="/users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="edit/:id" element={<UserEdit />} />
                <Route path="show/:id" element={<UserShow />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

**Key Points:**
- Modular configuration
- Resources as objects
- Explicit routing required
- UI framework wrapper
- ~40 lines of code

---

## 2. List/Table View

### React Admin
```jsx
// react-admin-app/src/users.jsx
import {
  List, Datagrid, TextField, EmailField,
  EditButton, ShowButton, DeleteButton
} from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="company.name" label="Company" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
```

**Features:**
- ✅ No hooks needed
- ✅ Declarative field components
- ✅ Automatic data fetching
- ✅ Built-in sorting/pagination
- ❌ Less customization options

**Lines:** 18

---

### Refine
```jsx
// refine-app/src/pages/users/list.jsx
import { useTable, List, EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { Table, Space } from 'antd';

export const UserList = () => {
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
        <Table.Column dataIndex={["company", "name"]} title="Company" />
        <Table.Column
          title="Actions"
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
```

**Features:**
- ✅ useTable() hook provides data
- ✅ Explicit column definitions
- ✅ Custom render functions
- ✅ Full control over table
- ✅ Use any UI library

**Lines:** 33

---

## 3. Edit Form

### React Admin
```jsx
// react-admin-app/src/users.jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" required />
      <TextInput source="username" required />
      <TextInput source="email" type="email" required />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="address.street" label="Street" />
      <TextInput source="address.city" label="City" />
      <TextInput source="company.name" label="Company Name" />
    </SimpleForm>
  </Edit>
);
```

**Features:**
- ✅ Automatic form state
- ✅ Simple validation with props
- ✅ Dot notation for nested fields
- ✅ Auto-save handling
- ❌ Limited layout options

**Lines:** 16

---

### Refine
```jsx
// refine-app/src/pages/users/edit.jsx
import { useForm, Edit } from '@refinedev/antd';
import { Form, Input } from 'antd';

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="ID" name="id">
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
        
        <Form.Item label="Company Name" name={["company", "name"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

**Features:**
- ✅ useForm() hook for state
- ✅ Explicit validation rules
- ✅ Array notation for nested fields
- ✅ Full control over layout
- ✅ Custom validation messages

**Lines:** 60

---

## 4. Create Form

### React Admin
```jsx
// react-admin-app/src/users.jsx
import { Create, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="username" required />
      <TextInput source="email" type="email" required />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="address.street" label="Street" />
      <TextInput source="company.name" label="Company Name" />
    </SimpleForm>
  </Create>
);
```

**Lines:** 14

---

### Refine
```jsx
// refine-app/src/pages/users/create.jsx
import { useForm, Create } from '@refinedev/antd';
import { Form, Input } from 'antd';

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input type="email" />
        </Form.Item>
        
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        
        <Form.Item label="Street" name={["address", "street"]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Company Name" name={["company", "name"]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

**Lines:** 48

---

## 5. Show/Detail View

### React Admin
```jsx
// react-admin-app/src/users.jsx
import { Show, SimpleShowLayout, TextField, EmailField } from 'react-admin';

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="address.street" label="Street" />
      <TextField source="company.name" label="Company Name" />
    </SimpleShowLayout>
  </Show>
);
```

**Features:**
- ✅ Automatic data fetching
- ✅ Pre-formatted fields
- ✅ Simple layout
- ❌ Limited customization

**Lines:** 15

---

### Refine
```jsx
// refine-app/src/pages/users/show.jsx
import { useShow, Show } from '@refinedev/antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;

export const UserShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <Text>{record?.id}</Text>
      
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
      
      <Title level={5}>Username</Title>
      <Text>{record?.username}</Text>
      
      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>
      
      <Title level={5}>Phone</Title>
      <Text>{record?.phone}</Text>
      
      <Title level={5}>Street</Title>
      <Text>{record?.address?.street}</Text>
      
      <Title level={5}>Company Name</Title>
      <Text>{record?.company?.name}</Text>
    </Show>
  );
};
```

**Features:**
- ✅ useShow() hook for data
- ✅ Access to loading state
- ✅ Custom layout structure
- ✅ Full control over display

**Lines:** 36

---

## Code Volume Comparison

| Component | React Admin | Refine | Difference |
|-----------|-------------|---------|------------|
| **App Setup** | 15 lines | 40 lines | +167% |
| **List View** | 18 lines | 33 lines | +83% |
| **Edit Form** | 16 lines | 60 lines | +275% |
| **Create Form** | 14 lines | 48 lines | +243% |
| **Show View** | 15 lines | 36 lines | +140% |
| **Total** | **78 lines** | **217 lines** | **+178%** |

**React Admin requires ~40% less code for the same functionality.**

---

## Key Patterns Comparison

### Data Fetching

**React Admin:** Implicit, handled by wrapper components
```jsx
<List>  {/* Automatically fetches data */}
  <Datagrid>
    <TextField source="name" />
  </Datagrid>
</List>
```

**Refine:** Explicit, using hooks
```jsx
const { tableProps } = useTable();  // Explicit hook call
return (
  <List>
    <Table {...tableProps}>  {/* Data passed as props */}
      <Table.Column dataIndex="name" />
    </Table>
  </List>
);
```

---

### Form State Management

**React Admin:** Hidden in `<SimpleForm>`
```jsx
<Edit>
  <SimpleForm>  {/* Form state managed internally */}
    <TextInput source="name" />
  </SimpleForm>
</Edit>
```

**Refine:** Exposed via `useForm()` hook
```jsx
const { formProps, saveButtonProps } = useForm();  // Explicit state
return (
  <Edit saveButtonProps={saveButtonProps}>
    <Form {...formProps}>  {/* Props control form */}
      <Form.Item name="name">
        <Input />
      </Form.Item>
    </Form>
  </Edit>
);
```

---

### Navigation

**React Admin:** Automatic button navigation
```jsx
<EditButton />  {/* Knows where to navigate automatically */}
```

**Refine:** Configuration-based navigation
```jsx
<EditButton recordItemId={record.id} />  
{/* Uses resource config to determine route */}
```

---

## Summary

### React Admin = Concise + Opinionated
- Less code to write
- Faster development
- Clear conventions
- Less flexibility

### Refine = Explicit + Flexible
- More code to write
- More control
- Steeper learning curve
- Maximum customization

---

**Choose based on your priorities:**
- **Speed** → React Admin
- **Control** → Refine
- **Simplicity** → React Admin  
- **Flexibility** → Refine

