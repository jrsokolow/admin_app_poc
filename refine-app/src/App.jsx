import { Refine } from '@refinedev/core';
import routerBindings, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import { ThemedLayoutV2, RefineThemes, ErrorComponent } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import { UserList, UserEdit, UserCreate, UserShow } from './pages/users';

/**
 * REFINE APPROACH:
 * 
 * 1. Uses <Refine> component but requires explicit routing setup
 * 2. More modular - dataProvider, routerBindings, etc. are separate
 * 3. Headless-first design - UI framework is a choice (Ant Design, Material-UI, etc.)
 * 4. Resources defined as configuration objects
 * 5. More flexibility in layout and structure
 * 6. Explicit route definitions required
 */

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        // Data provider connects to API
                        dataProvider={dataProvider('https://jsonplaceholder.typicode.com')}

                        // Router bindings for navigation
                        routerProvider={routerBindings}

                        // Resources are defined as configuration objects
                        resources={[
                            {
                                name: 'users',
                                list: '/users',
                                create: '/users/create',
                                edit: '/users/edit/:id',
                                show: '/users/show/:id',
                                meta: {
                                    label: 'Users'
                                }
                            }
                        ]}

                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        {/* Routes must be explicitly defined */}
                        <Routes>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route index element={<Navigate to="/users" replace />} />
                                <Route path="/users">
                                    <Route index element={<UserList />} />
                                    <Route path="create" element={<UserCreate />} />
                                    <Route path="edit/:id" element={<UserEdit />} />
                                    <Route path="show/:id" element={<UserShow />} />
                                </Route>
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>

                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;

