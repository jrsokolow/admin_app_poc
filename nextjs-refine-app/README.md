# Next.js + Refine + Ant Design CRUD App

This is a modern CRUD application built with **Next.js 14**, **Refine**, and **Ant Design** that demonstrates the difference between **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)**.

## 🎯 Key Features

### Server-Side Rendering (SSR)
- **List Page** (`/users`) - Users fetched on server, SEO-friendly
- **Show Page** (`/users/[id]`) - User details pre-rendered on server

### Client-Side Rendering (CSR)
- **Create Page** (`/users/create`) - Form with client-side validation
- **Edit Page** (`/users/edit/[id]`) - Form with real-time updates

## 🏗️ Architecture

```
nextjs-refine-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with Refine provider
│   │   ├── page.tsx                   # Redirect to /users
│   │   └── users/
│   │       ├── page.tsx               # 🟢 SSR List page (Server Component)
│   │       ├── list-client.tsx        # Client component for list UI
│   │       ├── [id]/
│   │       │   ├── page.tsx           # 🟢 SSR Show page (Server Component)
│   │       │   └── show-client.tsx    # Client component for show UI
│   │       ├── create/
│   │       │   └── page.tsx           # 🔵 CSR Create page (Client Component)
│   │       └── edit/
│   │           └── [id]/
│   │               └── page.tsx       # 🔵 CSR Edit page (Client Component)
│   └── providers/
│       ├── data-provider.ts           # API data provider
│       └── refine-context.tsx         # Refine context provider
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd nextjs-refine-app
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will start on **http://localhost:3002**

### 3. Build for Production
```bash
npm run build
npm start
```

## 📊 SSR vs CSR Explained

### 🟢 Server-Side Rendering (List & Show Pages)

**How it works:**
1. Request comes to Next.js server
2. Server fetches data from API
3. Server renders React components to HTML
4. Complete HTML sent to browser
5. React hydrates for interactivity

**Benefits:**
- ✅ SEO-friendly (content in HTML)
- ✅ Faster initial load
- ✅ Better for social media sharing
- ✅ Works without JavaScript

**Code Example:**
```tsx
// Server Component (runs on server)
export default async function UsersPage() {
  // Fetch data on server
  const { users } = await getUsers();
  
  // Pass to client component
  return <UserListClient initialUsers={users} />;
}
```

### 🔵 Client-Side Rendering (Create & Edit Pages)

**How it works:**
1. Empty HTML sent to browser
2. JavaScript loads
3. React mounts
4. Client fetches data and renders

**Benefits:**
- ✅ Instant validation feedback
- ✅ Better for interactive forms
- ✅ No server rendering overhead
- ✅ Easier state management

**Code Example:**
```tsx
'use client';  // Client Component

export default function UserCreatePage() {
  const { formProps } = useForm();
  
  // Everything runs in browser
  return <Form {...formProps}>...</Form>;
}
```

## 🔍 Key Differences from Previous Apps

### vs React Admin App
- **SSR Support**: Next.js adds server-side rendering
- **File-based Routing**: Next.js App Router vs React Router
- **Component Split**: Server Components vs Client Components
- **SEO**: Built-in SEO optimization with metadata API

### vs Refine Vite App
- **SSR**: Server-side data fetching for list/show pages
- **Routing**: Next.js App Router vs React Router
- **Performance**: Initial page load is faster with SSR
- **Deployment**: Can deploy to Vercel/Netlify with edge functions

## 🎨 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Framework**: Ant Design 5
- **Admin Framework**: Refine 4
- **Language**: TypeScript
- **Data Source**: JSONPlaceholder API

## 📝 Page Types

| Page | Type | Reason |
|------|------|--------|
| List | SSR | SEO, faster initial load |
| Show | SSR | SEO, social sharing |
| Create | CSR | Form interactivity |
| Edit | CSR | Form interactivity |

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 🌐 API

Uses the free JSONPlaceholder API:
- Base URL: `https://jsonplaceholder.typicode.com`
- Endpoint: `/users`

## 📦 Key Packages

```json
{
  "@refinedev/core": "Refine core functionality",
  "@refinedev/nextjs-router": "Next.js router integration",
  "@refinedev/antd": "Ant Design UI integration",
  "@refinedev/simple-rest": "REST API data provider",
  "next": "Next.js framework",
  "antd": "Ant Design components"
}
```

## 🎯 Learning Points

1. **Server Components**: How to fetch data on the server
2. **Client Components**: When to use 'use client' directive
3. **Data Hydration**: Passing server data to client components
4. **Metadata API**: Dynamic SEO tags
5. **File-based Routing**: Next.js App Router patterns

## 🚦 When to Use SSR vs CSR

### Use SSR when:
- Content needs to be indexed by search engines
- Initial load performance is critical
- Content is mostly static/read-only
- Social media sharing matters

### Use CSR when:
- High interactivity (forms, dashboards)
- User-specific content behind authentication
- Real-time updates needed
- SEO doesn't matter

## 🔗 Related Apps

Compare this implementation with:
- **React Admin App** - Traditional SPA approach
- **Refine Vite App** - Modern SPA with Vite

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Refine Documentation](https://refine.dev/docs)
- [Ant Design Documentation](https://ant.design/)

---

**Happy coding! 🚀**

