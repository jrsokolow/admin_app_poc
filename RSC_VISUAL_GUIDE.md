# RSC Visual Guide: What Actually Happens

## 🎬 Traditional React (Everything on Client)

```
┌─────────────────────────────────────────────────────────────────┐
│                           BROWSER                               │
│                                                                 │
│  1. Download empty HTML                                         │
│     └─ <div id="root"></div>                                   │
│                                                                 │
│  2. Download HUGE JavaScript bundle                            │
│     ├─ React library (40 KB)                                   │
│     ├─ Your components (100 KB)                                │
│     ├─ Dependencies (200 KB)                                   │
│     └─ Data fetching code (20 KB)                              │
│                                                                 │
│  3. Execute JavaScript                                          │
│                                                                 │
│  4. Fetch data from API ──────────┐                            │
│                                    │                            │
│  5. Wait for response... ◄─────────┘                            │
│                                                                 │
│  6. Finally render content                                      │
│                                                                 │
│  Total Time: 2-3 seconds                                        │
│  Bundle Size: 360 KB                                            │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 With RSC (Smart Split)

### Initial Page Load

```
┌──────────────────────────────────────┐
│           SERVER                     │
│                                      │
│  1. Receive request                 │
│  2. Run Server Component            │
│  3. Fetch from database             │
│  4. Render to HTML                  │
│  5. Send HTML + minimal JS          │
└──────────┬───────────────────────────┘
           │
           │ HTML with content (30 KB)
           │ + Client Component JS (50 KB)
           │
           ▼
┌──────────────────────────────────────┐
│           BROWSER                    │
│                                      │
│  1. Receive HTML (already has data!) │
│  2. Display content immediately      │
│  3. Download client JS               │
│  4. Hydrate interactive parts        │
│                                      │
│  Total Time: 500ms                   │
│  Bundle Size: 50 KB (85% smaller!)   │
└──────────────────────────────────────┘
```

### Client-Side Navigation (Clicking Link)

```
┌──────────────────────────────────────┐
│           SERVER                     │
│                                      │
│  1. Receive RSC request (?_rsc=...)│
│  2. Run Server Component            │
│  3. Fetch from database             │
│  4. Serialize to RSC payload        │
│  5. Send RSC payload                │
└──────────┬───────────────────────────┘
           │
           │ RSC Payload (5-10 KB)
           │ Serialized components + data
           │
           ▼
┌──────────────────────────────────────┐
│           BROWSER                    │
│                                      │
│  1. Receive RSC payload             │
│  2. React deserializes it           │
│  3. Update DOM (no reload!)         │
│                                      │
│  Total Time: 200-300ms              │
│  No new JS downloaded!              │
└──────────────────────────────────────┘
```

## 🔍 Your App's Architecture

### The Component Tree

```
page.tsx (Server Component)
│
├─ Runs ONLY on server
├─ Can access database
├─ Can use async/await
├─ Code NEVER sent to browser
│
└─── passes data as props ───┐
                             │
                             ▼
                  show-client.tsx (Client Component)
                  │
                  ├─ Runs in browser
                  ├─ Receives data from server
                  ├─ Can use onClick, useState
                  └─ Code IS sent to browser
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ SERVER: page.tsx                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  async function UserShowPage({ params }) {                 │
│    // ✅ Runs on server                                    │
│    const user = await getUser(params.id);                  │
│    //           ↑                                           │
│    //           Database query happens HERE (server)       │
│    //                                                       │
│    return <UserShowClient initialUser={user} />;           │
│    //                                  ↓                    │
│    //                                  Data passed          │
│  }                                     ↓                    │
│                                        ↓                    │
└────────────────────────────────────────┼────────────────────┘
                                         │
                       RSC Payload: {    │
                         component: ..., │ Sent to browser
                         data: {...}     │
                       }                 │
                                         ▼
┌─────────────────────────────────────────────────────────────┐
│ BROWSER: show-client.tsx                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  'use client';                                              │
│                                                             │
│  function UserShowClient({ initialUser }) {                │
│    //                       ↑                               │
│    //                       Data received from server       │
│    //                       NO fetch needed!                │
│    //                                                       │
│    return (                                                 │
│      <Card>                                                 │
│        <h3>{initialUser.name}</h3>  ← Already has data!    │
│        <Button onClick={...}>...</Button>  ← Interactive!   │
│      </Card>                                                │
│    );                                                       │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📦 What Goes to the Browser?

### Server Component (page.tsx)

```typescript
// ❌ This code NEVER goes to browser
async function UserShowPage({ params }) {
    const user = await getUser(params.id);
    return <UserShowClient initialUser={user} />;
}

// Browser receives: 0 bytes of this code
// Browser receives: Just the data and serialized component tree
```

### Client Component (show-client.tsx)

```typescript
// ✅ This code DOES go to browser (bundled)
'use client';
function UserShowClient({ initialUser }) {
    return <Card>...</Card>;
}

// Browser receives: ~20-30 KB (component + dependencies)
```

### Total Bundle Comparison

```
Traditional React App:
├─ React library: 40 KB
├─ Data fetching logic: 20 KB
├─ All components: 100 KB
├─ Dependencies: 200 KB
└─ Total: 360 KB
    └─ User waits: 2-3 seconds

With RSC:
├─ React library: 40 KB
├─ Client components only: 30 KB
├─ (Server code = 0 KB to browser)
└─ Total: 70 KB
    └─ User waits: 300-500ms
```

## 🎭 The RSC Format Explained

### What you see in Network tab (RSC Payload):

```
1:HL["/_next/static/css/app.css","style"]
2:I{"id":"1","name":"Leanne Graham","email":"Sincere@april.biz"}
3:["$","div",null,{"style":{"padding":"24px"},"children":["$","h3",null,{"children":"User Details"}]}]
```

### What it means:

```javascript
// Line 1: Load CSS
// Link to stylesheet

// Line 2: Data from server
const userData = {
  id: "1",
  name: "Leanne Graham",
  email: "Sincere@april.biz"
};

// Line 3: Component tree
<div style={{ padding: "24px" }}>
  <h3>User Details</h3>
</div>
```

### React deserializes this and updates the DOM!

## 🔄 Request/Response Comparison

### Scenario 1: Type URL manually

```
┌──────────────────────────────────────┐
│ Browser sends:                       │
│ GET /users/1                         │
│ Accept: text/html                    │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ Server responds with:                │
│ Content-Type: text/html              │
│                                      │
│ <!DOCTYPE html>                      │
│ <html>                               │
│   <head>                             │
│     <title>User Details</title>      │
│     <link rel="stylesheet"...>       │
│   </head>                            │
│   <body>                             │
│     <div id="__next">                │
│       <div style="padding:24px">    │
│         <h3>User Details</h3>        │
│         <p>Leanne Graham</p>         │
│       </div>                         │
│     </div>                           │
│     <script src="..."></script>      │
│   </body>                            │
│ </html>                              │
│                                      │
│ Size: ~40-60 KB                      │
└──────────────────────────────────────┘
```

### Scenario 2: Click navigation link

```
┌──────────────────────────────────────┐
│ Browser sends:                       │
│ GET /users/1?_rsc=tyl3d             │
│ RSC: 1                               │
│ Next-Router-State-Tree: ...         │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ Server responds with:                │
│ Content-Type: text/x-component       │
│                                      │
│ 1:HL["/_next/static/css/..."]       │
│ 2:I{"id":"1","name":"Leanne..."}    │
│ 3:["$","div",null,{...}]            │
│                                      │
│ Size: ~5-10 KB                       │
│                                      │
│ ↑ This is the RSC PAYLOAD!          │
└──────────────────────────────────────┘
```

## 💡 Key Insights

### 1. RSC is NOT just "server-side rendering"

```
Traditional SSR:
- Render HTML on server ✅
- Send HTML to browser ✅
- Then component runs on client ✅
- Code still bundled for client ❌
- Can't use server-only APIs in components ❌

React Server Components:
- Render on server ✅
- Send serialized tree to browser ✅
- Component NEVER runs on client ✅
- Code NOT bundled for client ✅
- Can use server-only APIs ✅
```

### 2. It's a component-level decision

```typescript
// ✅ You can mix them in the same app!

// Server Component
export default async function Page() {
    const data = await fetchFromDB();  // Server
    
    return (
        <div>
            <ServerComponent />         {/* Runs on server */}
            <ClientComponent data={data} />  {/* Runs on client */}
        </div>
    );
}
```

### 3. The rules

```typescript
// Server Components CAN:
✅ Use async/await
✅ Access database
✅ Read files
✅ Use server-only libraries
✅ Access environment variables
✅ Fetch data

// Server Components CANNOT:
❌ Use useState, useEffect
❌ Use onClick, onChange
❌ Access browser APIs
❌ Use browser-only libraries

// Client Components CAN:
✅ Use useState, useEffect
✅ Use onClick, onChange
✅ Access browser APIs
✅ Use browser-only libraries

// Client Components CANNOT:
❌ Use async/await in component
❌ Access database directly
❌ Read files directly
❌ Use server-only libraries
```

## 🎯 Bottom Line

**RSC (React Server Components)** is:

1. A new way to write React components that run **only on the server**
2. The server sends a **serialized component tree** (RSC payload) instead of HTML
3. **Zero JavaScript** sent to browser for server components
4. Can access **backend resources** (database, files) directly in components
5. Results in **smaller bundles** and **faster page loads**

The `?_rsc=tyl3d` you see is Next.js requesting this special RSC payload format instead of full HTML!

