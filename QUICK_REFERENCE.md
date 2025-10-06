# Quick Reference Guide

A cheat sheet for understanding React Admin vs Refine at a glance.

## 🎯 Core Philosophy

| Aspect | React Admin | Refine |
|--------|-------------|---------|
| **Approach** | Opinionated, batteries-included | Headless-first, modular |
| **Style** | Declarative components | Hook-based |
| **Configuration** | Convention over configuration | Explicit configuration |
| **UI Coupling** | Tight (Material-UI) | Loose (any framework) |

## 📦 Package Comparison

### React Admin
```json
{
  "react-admin": "^4.16.0",           // Main package
  "ra-data-json-server": "^4.16.0"    // Data provider
}
```

### Refine
```json
{
  "@refinedev/core": "^4.45.0",           // Core (headless)
  "@refinedev/simple-rest": "^4.5.0",     // Data provider
  "@refinedev/react-router-v6": "^4.5.0", // Router integration
  "@refinedev/antd": "^5.37.0",           // UI integration (optional)
  "antd": "^5.12.0"                       // UI library (your choice)
}
```

## 🔧 Basic Setup

### React Admin
```jsx
import { Admin, Resource } from 'react-admin';
import dataProvider from 'ra-data-json-server';

<Admin dataProvider={dataProvider('https://api.example.com')}>
  <Resource name="users" list={UserList} />
</Admin>
```

### Refine
```jsx
import { Refine } from '@refinedev/core';
import routerBindings from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';

<Refine
  dataProvider={dataProvider('https://api.example.com')}
  routerProvider={routerBindings}
  resources={[{ name: 'users', list: '/users' }]}
>
  <Routes>
    <Route path="/users" element={<UserList />} />
  </Routes>
</Refine>
```

## 📋 List View

### React Admin
```jsx
import { List, Datagrid, TextField } from 'react-admin';

const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="email" />
    </Datagrid>
  </List>
);
```

### Refine
```jsx
import { useTable, List } from '@refinedev/antd';
import { Table } from 'antd';

const UserList = () => {
  const { tableProps } = useTable();
  return (
    <List>
      <Table {...tableProps}>
        <Table.Column dataIndex="name" />
        <Table.Column dataIndex="email" />
      </Table>
    </List>
  );
};
```

## 📝 Forms

### React Admin
```jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="email" type="email" />
    </SimpleForm>
  </Edit>
);
```

### Refine
```jsx
import { useForm, Edit } from '@refinedev/antd';
import { Form, Input } from 'antd';

const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email">
          <Input type="email" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

## 🪝 Hooks Comparison

| Need | React Admin | Refine |
|------|-------------|---------|
| **List data** | Implicit in `<List>` | `useTable()` |
| **Single record** | Implicit in `<Show>` | `useShow()` |
| **Form state** | Implicit in `<SimpleForm>` | `useForm()` |
| **Navigation** | `useRedirect()` | `useNavigation()` |
| **Data provider** | `useDataProvider()` | `useDataProvider()` |

## 🎨 UI Framework Support

### React Admin
- ✅ Material-UI (built-in)
- ❌ Ant Design (not supported)
- ❌ Chakra UI (not supported)
- ❌ Custom (difficult)

### Refine
- ✅ Material-UI (via `@refinedev/mui`)
- ✅ Ant Design (via `@refinedev/antd`)
- ✅ Chakra UI (via `@refinedev/chakra-ui`)
- ✅ Mantine (via `@refinedev/mantine`)
- ✅ Custom (easy, use core only)

## 🛣️ Routing

### React Admin
**Automatic routing** - no configuration needed
```
/users          → List
/users/create   → Create  
/users/:id      → Edit
/users/:id/show → Show
```

### Refine
**Explicit routing** - you define routes
```jsx
resources={[
  {
    name: 'users',
    list: '/users',
    create: '/users/create',
    edit: '/users/edit/:id',
    show: '/users/show/:id'
  }
]}
```

## 📊 Feature Comparison

| Feature | React Admin | Refine |
|---------|-------------|---------|
| **Data fetching** | Automatic | Hook-based |
| **Caching** | Built-in | Built-in (React Query) |
| **Authentication** | Built-in | Built-in |
| **Authorization** | Built-in | Built-in |
| **i18n** | Built-in | Built-in |
| **Dark mode** | Built-in | UI library dependent |
| **Form validation** | Built-in | UI library dependent |
| **File upload** | Extensions available | UI library dependent |
| **Real-time** | Extensions available | Built-in support |
| **Audit logs** | Manual | Built-in hooks |

## 💰 Bundle Size (approximate)

### React Admin
- Core + Material-UI: ~500KB (minified)
- Includes UI components

### Refine
- Core only: ~100KB (minified)
- + UI library of choice: varies
- More tree-shakeable

## 📚 Learning Curve

### React Admin
1. Learn React basics
2. Understand Resource concept
3. Learn pre-built components
4. **Time to first app: 1-2 hours**

### Refine
1. Learn React basics
2. Learn React hooks
3. Understand Refine core concepts
4. Learn chosen UI library
5. Understand routing setup
6. **Time to first app: 3-4 hours**

## 🔍 When to Use What

### Use React Admin When:
- 🚀 You need fast development
- 📦 Material-UI is acceptable
- 🎯 Standard admin interface
- 👥 Small team / Less React experience
- 📱 Internal tools
- ⏰ Tight deadlines

### Use Refine When:
- 🎨 You need custom design
- 🔧 You want UI library choice
- 📐 Complex/custom requirements
- 👨‍💻 Experienced React team
- 🌐 Customer-facing applications
- 📦 Bundle size matters
- 🔄 Integration with existing UI

## 🎓 Code Patterns

### Accessing Data

**React Admin:**
```jsx
// Data is implicit in Field components
<TextField source="user.name" />
```

**Refine:**
```jsx
// Data is explicit from hooks
const { data } = useShow();
const user = data?.data;
return <Text>{user?.name}</Text>;
```

### Custom Actions

**React Admin:**
```jsx
import { useRecordContext, useDataProvider } from 'react-admin';

const CustomButton = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  
  const handleClick = () => {
    dataProvider.update('users', { 
      id: record.id, 
      data: { status: 'active' } 
    });
  };
  
  return <Button onClick={handleClick}>Activate</Button>;
};
```

**Refine:**
```jsx
import { useUpdate } from '@refinedev/core';

const CustomButton = ({ record }) => {
  const { mutate } = useUpdate();
  
  const handleClick = () => {
    mutate({
      resource: 'users',
      id: record.id,
      values: { status: 'active' }
    });
  };
  
  return <Button onClick={handleClick}>Activate</Button>;
};
```

## 🔗 Navigation

### React Admin
```jsx
import { useRedirect } from 'react-admin';

const Component = () => {
  const redirect = useRedirect();
  
  const handleClick = () => {
    redirect('list', 'users');
  };
};
```

### Refine
```jsx
import { useNavigation } from '@refinedev/core';

const Component = () => {
  const { list } = useNavigation();
  
  const handleClick = () => {
    list('users');
  };
};
```

## 🎯 Decision Matrix

| Priority | Choice |
|----------|--------|
| **Speed of development** | React Admin |
| **Customization** | Refine |
| **Learning curve** | React Admin |
| **Bundle size** | Refine |
| **UI flexibility** | Refine |
| **Convention** | React Admin |
| **Control** | Refine |
| **Material-UI is perfect** | React Admin |
| **Need different UI** | Refine |
| **Standard CRUD** | React Admin |
| **Complex workflows** | Refine |

## 📖 Documentation Quality

### React Admin
- ⭐⭐⭐⭐⭐ Excellent
- Comprehensive guides
- Many examples
- Large community
- [marmelab.com/react-admin](https://marmelab.com/react-admin/)

### Refine
- ⭐⭐⭐⭐⭐ Excellent
- Modern, interactive docs
- Live code examples
- Growing community
- [refine.dev/docs](https://refine.dev/docs/)

## 🏁 Getting Started Checklist

### React Admin
- [ ] Install `react-admin` and `ra-data-json-server`
- [ ] Create `<Admin>` wrapper
- [ ] Add data provider
- [ ] Define `<Resource>` components
- [ ] Create List/Edit/Create components
- [ ] You're done! 🎉

### Refine
- [ ] Install core packages
- [ ] Choose UI library
- [ ] Install UI library packages
- [ ] Set up router
- [ ] Create `<Refine>` wrapper
- [ ] Configure resources
- [ ] Define routes
- [ ] Create page components
- [ ] You're done! 🎉

---

## 💡 Pro Tips

### React Admin
- Use `ra-ui-materialui` for Material-UI v5
- Customize theme with `<Admin theme={myTheme}>`
- Use `<Resource options={{ label: "..." }}>` for custom labels
- Check out `ra-enterprise` for advanced features

### Refine
- Start with CLI: `npm create refine-app@latest`
- Use `@refinedev/inferencer` to generate CRUD pages
- Leverage multiple data providers for different APIs
- Check out devtools for debugging

---

**📖 For detailed comparisons, see:**
- [COMPARISON.md](COMPARISON.md) - Comprehensive analysis
- [SIDE_BY_SIDE_COMPARISON.md](SIDE_BY_SIDE_COMPARISON.md) - Code examples
- [README.md](README.md) - Project overview

**🚀 Start coding:**
```bash
# React Admin
cd react-admin-app && npm install && npm run dev

# Refine
cd refine-app && npm install && npm run dev
```

