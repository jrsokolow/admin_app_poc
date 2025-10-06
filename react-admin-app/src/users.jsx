import {
    List,
    Datagrid,
    TextField,
    EmailField,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    Show,
    SimpleShowLayout,
    EditButton,
    ShowButton,
    DeleteButton
} from 'react-admin';

/**
 * REACT ADMIN USER LIST
 * 
 * Key Features:
 * - Uses <List> wrapper component
 * - <Datagrid> provides built-in table with sorting, pagination
 * - Field components (TextField, EmailField) automatically map to data
 * - No need to manually handle loading states or data fetching
 * - Built-in action buttons (EditButton, ShowButton, DeleteButton)
 */
export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" label="Company" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

/**
 * REACT ADMIN USER EDIT
 * 
 * Key Features:
 * - Uses <Edit> wrapper with built-in save/cancel logic
 * - <SimpleForm> handles form state and validation
 * - Input components automatically bind to form state
 * - Automatic API calls for update operations
 */
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
            <TextInput source="address.zipcode" label="Zipcode" />
            <TextInput source="company.name" label="Company Name" />
            <TextInput source="company.catchPhrase" label="Company Catchphrase" />
        </SimpleForm>
    </Edit>
);

/**
 * REACT ADMIN USER CREATE
 * 
 * Key Features:
 * - Similar to Edit but for creating new records
 * - Automatic API POST handling
 * - Form validation built-in
 */
export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" required />
            <TextInput source="username" required />
            <TextInput source="email" type="email" required />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="address.street" label="Street" />
            <TextInput source="address.city" label="City" />
            <TextInput source="address.zipcode" label="Zipcode" />
            <TextInput source="company.name" label="Company Name" />
            <TextInput source="company.catchPhrase" label="Company Catchphrase" />
        </SimpleForm>
    </Create>
);

/**
 * REACT ADMIN USER SHOW
 * 
 * Key Features:
 * - Read-only view of a record
 * - <SimpleShowLayout> provides formatted display
 * - Automatic data fetching by ID
 */
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
            <TextField source="address.city" label="City" />
            <TextField source="address.zipcode" label="Zipcode" />
            <TextField source="company.name" label="Company Name" />
            <TextField source="company.catchPhrase" label="Company Catchphrase" />
        </SimpleShowLayout>
    </Show>
);

