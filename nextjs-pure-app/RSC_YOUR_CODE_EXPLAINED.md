# Your Code: Where Does Each Part Run?

This guide shows **exactly** what happens in your app with RSC.

## 📁 Your Files Analyzed

### File 1: `src/app/users/[id]/page.tsx` (Server Component)

```typescript
import { Suspense } from 'react';
import { api } from '@/lib/api';
import UserShowClient from './show-client';
import { notFound } from 'next/navigation';

async function getUser(id: string) {
    try {
        const user = await api.getUser(id);
        return user;
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        return null;
    }
}

function LoadingUser() {
    return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <h2>Loading user details...</h2>
        </div>
    );
}

export default async function UserShowPage({
    params,
}: {
    params: { id: string };
}) {
    const user = await getUser(params.id);

    if (!user) {
        notFound();
    }

    return (
        <Suspense fallback={<LoadingUser />}>
            <UserShowClient initialUser={user} userId={params.id} />
        </Suspense>
    );
}
```

#### ⚙️ Execution Breakdown:

```
┌─────────────────────────────────────────────────────────────┐
│ WHERE: SERVER (Node.js process)                             │
│ WHEN: Every request (manual URL or click navigation)        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✅ getUser() function                                       │
│    - Runs on SERVER                                         │
│    - Never sent to browser                                  │
│    - 0 KB to client bundle                                  │
│                                                             │
│ ✅ api.getUser(id) call                                     │
│    - Executes on SERVER                                     │
│    - Fetches from http://localhost:3001/users/1            │
│    - API call happens from server, not browser!            │
│                                                             │
│ ✅ UserShowPage component                                   │
│    - Renders on SERVER                                      │
│    - Returns React elements                                 │
│    - These elements are serialized to RSC payload          │
│                                                             │
│ ✅ LoadingUser component                                    │
│    - Defined on SERVER                                      │
│    - Serialized if needed (during Suspense)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

What gets sent to browser?
├─ NOT the getUser function code
├─ NOT the api.getUser call code
├─ NOT the UserShowPage component code
└─ ONLY: Serialized component tree + data + reference to UserShowClient

Example RSC Payload sent:
{
  "component": "Suspense",
  "fallback": { "type": "div", "children": "Loading..." },
  "children": {
    "component": "UserShowClient",  // Reference to client component
    "props": {
      "initialUser": { "id": "1", "name": "Leanne Graham", ... },
      "userId": "1"
    }
  }
}
```

### File 2: `src/app/users/[id]/show-client.tsx` (Client Component)

```typescript
'use client';

import { Card, Descriptions, Button, Space, Typography } from 'antd';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { User } from '@/lib/api';

const { Title } = Typography;

interface UserShowClientProps {
    initialUser: User;
    userId: string;
}

export default function UserShowClient({
    initialUser,
    userId,
}: UserShowClientProps) {
    const user = initialUser;

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Title level={3}>User Details (No Refine)</Title>
                    <Space>
                        <Link href="/users">
                            <Button icon={<UnorderedListOutlined />}>Back to List</Button>
                        </Link>
                        <Link href={`/users/edit/${userId}`}>
                            <Button type="primary" icon={<EditOutlined />}>
                                Edit User
                            </Button>
                        </Link>
                    </Space>
                </div>

                <Title level={4}>{user.name}</Title>

                <Descriptions bordered column={1} style={{ marginTop: '16px' }}>
                    <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Descriptions.Item>
                    {/* ... more fields ... */}
                </Descriptions>
            </Card>
        </div>
    );
}
```

#### ⚙️ Execution Breakdown:

```
┌─────────────────────────────────────────────────────────────┐
│ WHERE: BROWSER (Chrome/Firefox/Safari)                      │
│ WHEN: After receiving data from server                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✅ UserShowClient component                                 │
│    - Runs in BROWSER                                        │
│    - Bundled and sent to client                            │
│    - ~20-30 KB to client bundle                             │
│                                                             │
│ ✅ Receives props from server:                              │
│    initialUser: { id: "1", name: "Leanne Graham", ... }    │
│    userId: "1"                                              │
│                                                             │
│ ✅ Can handle user interactions:                            │
│    - Button clicks                                          │
│    - Form inputs                                            │
│    - Could use useState, useEffect, etc.                   │
│                                                             │
│ ✅ Ant Design components (Card, Button, etc.)              │
│    - Bundled and sent to browser                           │
│    - ~200 KB (but shared across all pages)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

What gets sent to browser?
├─ ✅ UserShowClient component code
├─ ✅ Ant Design library code
├─ ✅ Data from server (as props)
└─ ✅ React runtime

Example Browser Bundle:
- UserShowClient: 5 KB
- Ant Design: 200 KB (cached after first load)
- React: 40 KB (cached after first load)
- Total for this page: ~5 KB (after first load)
```

## 🔄 Complete Flow: From Click to Display

### Step-by-Step Execution

```
User clicks "Show" button on /users page
│
├─ 1. Next.js Link intercepts click
│     Location: Browser
│     Action: Prevent default navigation
│            Call router.push('/users/1')
│
├─ 2. Router makes request with RSC header
│     Location: Browser
│     Request: GET /users/1?_rsc=tyl3d
│     Headers: RSC: 1, Next-Router-State-Tree: ...
│
├─ 3. Next.js server receives request
│     Location: Server (Node.js)
│     Detects: RSC request (not HTML request)
│
├─ 4. Server runs UserShowPage component
│     Location: Server
│     Code executed:
│     ┌────────────────────────────────────────┐
│     │ async function UserShowPage({ params }) {
│     │   console.log('🟢 SERVER: Running...');
│     │   const user = await getUser(params.id);
│     │   // ↑ This hits http://localhost:3001/users/1
│     │   // ↑ FROM THE SERVER (not browser)
│     │   
│     │   return <UserShowClient initialUser={user} />;
│     │ }
│     └────────────────────────────────────────┘
│
├─ 5. Server serializes to RSC payload
│     Location: Server
│     Output: Serialized component tree + data
│     ┌────────────────────────────────────────┐
│     │ 1:HL["/_next/static/css/app.css"]
│     │ 2:I{"id":"1","name":"Leanne Graham",...}
│     │ 3:["$","Suspense",null,{"children":
│     │    ["$","@1",null,{"initialUser":{...}}]}]
│     │ M4:{"id":"./show-client.tsx","name":"default"}
│     └────────────────────────────────────────┘
│
├─ 6. Server sends RSC payload to browser
│     Size: ~5-10 KB
│     Contains: Component tree + user data
│
├─ 7. Browser receives RSC payload
│     Location: Browser
│     React deserializes the payload
│
├─ 8. React finds UserShowClient reference
│     Location: Browser
│     React knows this is a client component
│     Already has the code (from initial page load)
│
├─ 9. React calls UserShowClient with props
│     Location: Browser
│     Code executed:
│     ┌────────────────────────────────────────┐
│     │ function UserShowClient({ initialUser }) {
│     │   console.log('🔵 CLIENT: Rendering...');
│     │   const user = initialUser;
│     │   // ↑ Data came from server!
│     │   // ↑ No fetch needed!
│     │   
│     │   return <Card>...</Card>;
│     │ }
│     └────────────────────────────────────────┘
│
└─ 10. React updates the DOM
      Location: Browser
      Action: Smooth transition (no page reload)
      Result: User sees the user details page
```

## 🎯 Console Logs You'll See

### In Your Terminal (Server):

```bash
🟢 SERVER: UserShowPage running on SERVER for user ID: 1
🟢 SERVER: Data fetched on SERVER, user name: Leanne Graham

# This proves the Server Component is running on the server!
```

### In Browser Console (DevTools):

```javascript
🔵 CLIENT: UserShowClient rendering on CLIENT with data from SERVER

// This proves the Client Component is running in the browser!
// But notice: It already HAS the data (from server)
```

## 📊 Code Distribution

### What runs where?

```
┌───────────────────────────────────────────────────────────┐
│                    SERVER (Node.js)                       │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ✅ page.tsx (Server Component)                          │
│     - async function UserShowPage()                      │
│     - async function getUser()                           │
│     - await api.getUser()                                │
│     - Database/API calls                                 │
│                                                           │
│  ✅ lib/api.ts                                            │
│     - API implementation                                 │
│     - fetch() calls to external API                      │
│                                                           │
│  Bundle size sent to browser: 0 KB                       │
│                                                           │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                  BROWSER (Chrome/etc)                     │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ✅ show-client.tsx (Client Component)                    │
│     - 'use client' directive                             │
│     - function UserShowClient()                          │
│     - UI rendering                                       │
│     - Event handlers (if any)                            │
│                                                           │
│  ✅ Ant Design components                                │
│     - Card, Button, Descriptions, etc.                   │
│                                                           │
│  ✅ React runtime                                         │
│                                                           │
│  Bundle size: ~245 KB (but mostly cached)                │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## 🆚 Comparison: With RSC vs Without RSC

### Without RSC (Traditional React):

```typescript
// ❌ Everything runs in browser
'use client';

export default function UserShowPage({ params }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // ❌ Fetch from browser
        fetch(`http://localhost:3001/users/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, [params.id]);
    
    if (loading) return <div>Loading...</div>;
    
    return <Card>...</Card>;
}

// Bundle: ALL of this code goes to browser (~50 KB)
// Fetch: Happens from browser (exposed to user)
// Speed: Slower (extra round trip after page loads)
```

### With RSC (Your Current App):

```typescript
// ✅ Server Component (runs on server)
export default async function UserShowPage({ params }) {
    // ✅ Fetch on server
    const user = await getUser(params.id);
    
    // ✅ Pass data to client component
    return <UserShowClient initialUser={user} />;
}

// ✅ Client Component (runs in browser)
'use client';
export default function UserShowClient({ initialUser }) {
    return <Card>...</Card>;
}

// Bundle: Only UserShowClient goes to browser (~20 KB)
// Fetch: Happens on server (secure, fast)
// Speed: Faster (data comes with component)
```

## 💾 Network Tab Analysis

### When you click "Show" button:

**Request:**
```
URL: http://localhost:3002/users/1?_rsc=tyl3d
Method: GET
Headers:
  RSC: 1
  Next-Router-State-Tree: [...]
```

**Response:**
```
Status: 200 OK
Content-Type: text/x-component

1:HL["/_next/static/css/app/layout.css","style"]
0:["ZhOMBl3YkKCMQrQA5ItAr",[[["",{"children":["users",{"children":["[id]",{"children":["__PAGE__",{}]}]}]},"$undefined","$undefined",true],"$L2",[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app/layout.css","precedence":"next"}]],"$L3"]]]]
2:I{"id":"1","name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz"...}
3:["$","div",null,{"style":{"padding":"24px"},"children":["$","$L4",null,{"initialUser":{"id":"1","name":"Leanne Graham"...},"userId":"1"}]}]
```

**What this means:**
- Line 1: CSS to load
- Line 0: Routing information
- Line 2: The user data (fetched on server!)
- Line 3: The component tree with reference to UserShowClient

**React then:**
1. Parses this payload
2. Finds UserShowClient in the bundle
3. Calls it with the user data
4. Updates the DOM

## ✨ The Magic of RSC

### Traditional Flow:
```
Browser → Page loads → JavaScript executes → Fetch data → Render
          (1 sec)      (500ms)              (300ms)       (100ms)
Total: ~2 seconds
```

### RSC Flow:
```
Browser → Request with ?_rsc → Server fetches + renders → Send payload → Display
                                (300ms)                    (100ms)       (50ms)
Total: ~450ms
```

### Why faster?
1. ✅ No JavaScript download for server components
2. ✅ Data comes WITH the component (not separate fetch)
3. ✅ Server can be closer to database (faster fetch)
4. ✅ No client-side waterfall (fetch → render → fetch)

## 🎓 Summary

**RSC in your app means:**

1. **Server Component** (`page.tsx`):
   - Runs on server every time
   - Fetches data on server
   - Never sent to browser
   - Outputs serialized tree (RSC payload)

2. **Client Component** (`show-client.tsx`):
   - Runs in browser
   - Gets data from server component (via props)
   - Can be interactive (buttons, forms)
   - Bundled and sent to browser

3. **RSC Payload**:
   - Special format Next.js uses
   - Contains component tree + data
   - Smaller than HTML
   - Faster than separate data fetching

4. **Result**:
   - Smaller bundles
   - Faster page loads
   - Secure data fetching
   - Better user experience

The `?_rsc=tyl3d` you saw is Next.js requesting this optimized format!

