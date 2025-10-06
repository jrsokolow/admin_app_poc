import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList, UserEdit, UserCreate, UserShow } from './users';

/**
 * REACT ADMIN APPROACH:
 * 
 * 1. Uses <Admin> wrapper component as the main container
 * 2. dataProvider is passed directly to Admin component
 * 3. Resources are declared using <Resource> components
 * 4. React Admin provides built-in components and hooks
 * 5. Opinionated Material-UI based design
 */

// Data provider connects to JSONPlaceholder API
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin
            dataProvider={dataProvider}
            title="React Admin CRUD App"
        >
            {/* Resource defines a CRUD entity with its operations */}
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

export default App;

