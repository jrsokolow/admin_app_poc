// SIMPLIFIED VERSION FOR TESTING
import { Refine } from '@refinedev/core';
import routerBindings from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function SimpleTest() {
    return (
        <div style={{ padding: '20px', fontSize: '24px' }}>
            <h1>✅ Refine App is Working!</h1>
            <p>If you see this, the basic setup is working.</p>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider('https://jsonplaceholder.typicode.com')}
                routerProvider={routerBindings}
                resources={[{ name: 'users' }]}
            >
                <Routes>
                    <Route path="*" element={<SimpleTest />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
}

export default App;

