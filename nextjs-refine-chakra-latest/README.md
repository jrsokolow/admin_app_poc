# Next.js + Refine + Chakra UI - Latest Versions

A modern CRUD application built with the latest versions of Next.js, Refine, and Chakra UI.

## 🚀 Features

- **Next.js 15.0.3** - Latest stable version with App Router
- **Refine 4.55.2** - Headless React framework for building CRUD applications
- **Chakra UI 2.10.4** - Modern, accessible component library
- **TypeScript 5.6.3** - Full type safety
- **React 18.3.1** - Latest React features
- **JSONPlaceholder API** - Ready-to-use REST API for testing

## 📦 Package Versions

```json
{
  "next": "^15.0.3",
  "@refinedev/core": "^4.55.2",
  "@refinedev/chakra-ui": "^2.36.3",
  "@chakra-ui/react": "^2.10.4",
  "react": "^18.3.1",
  "typescript": "^5.6.3"
}
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3010
   ```

## 📁 Project Structure

```
nextjs-refine-chakra-latest/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Refine + Chakra providers
│   │   └── posts/
│   │       ├── page.tsx         # Posts list (Read)
│   │       ├── components/
│   │       │   └── EditPostModal.tsx  # Edit modal popup
│   │       ├── create/
│   │       │   └── page.tsx     # Create post
│   │       └── show/
│   │           └── [id]/
│   │               └── page.tsx # View post details
│   └── types/
│       └── post.ts              # TypeScript types
├── package.json
├── tsconfig.json
├── next.config.js
├── README.md
└── MODAL_EDIT_IMPLEMENTATION.md  # Modal implementation guide
```

## 🎯 CRUD Operations

### List Posts
- URL: `/posts`
- Shows all posts from JSONPlaceholder API
- Pagination supported
- Actions: View, Edit, Delete

### View Post
- URL: `/posts/show/:id`
- Shows detailed information about a single post

### Create Post
- URL: `/posts/create`
- Form with validation:
  - User ID (required, number)
  - Title (required, min 5 characters)
  - Body (required, min 10 characters)

### Edit Post
- **Opens as modal/popup** (no separate page!)
- Pre-filled form with existing data
- Same validation as create
- Auto-refreshes list after save
- Modern UX - no page navigation required

## 🌐 API

This project uses **JSONPlaceholder** (https://jsonplaceholder.typicode.com) as a free fake REST API for testing and prototyping.

**Available endpoints:**
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## 🎨 UI Components

Built with Chakra UI for:
- ✅ Beautiful, modern design
- ✅ Fully accessible (ARIA compliant)
- ✅ Dark mode support
- ✅ Responsive layout
- ✅ Consistent theming

## 📝 Scripts

```bash
# Development
npm run dev      # Start dev server on port 3010

# Production
npm run build    # Build for production
npm run start    # Start production server

# Code Quality
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Port
The app runs on port **3010** by default. To change:
- Update `package.json` scripts
- Modify `-p 3010` to your desired port

### API URL
The API URL is configured in `src/app/providers.tsx`:
```typescript
const API_URL = 'https://jsonplaceholder.typicode.com';
```

To use a different API, update this constant.

## 🚦 Getting Started

1. **Clone/Create the project**
2. **Install dependencies:** `npm install`
3. **Start dev server:** `npm run dev`
4. **Open browser:** Navigate to `http://localhost:3010`
5. **Explore:** Click "Go to Posts" to see the CRUD interface

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Refine Documentation](https://refine.dev/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## ✨ Features Highlights

### Modern Stack
- Next.js 15 App Router
- Server Components
- Client Components where needed
- TypeScript throughout

### Refine Framework
- Automatic CRUD operations
- Built-in data provider
- Router integration
- Form management with validation

### Chakra UI
- Pre-built components
- Consistent design system
- Responsive by default
- Accessible out of the box

## 🎓 What You'll Learn

- Next.js 15 App Router patterns
- Refine framework for CRUD operations
- Chakra UI component usage
- TypeScript with React
- Form handling with react-hook-form
- REST API integration

## 🐛 Troubleshooting

### Port already in use
If port 3010 is already in use, change it in `package.json`:
```json
"dev": "next dev -p 3011"
```

### Module not found
Run `npm install` to ensure all dependencies are installed.

### Build errors
Make sure you're using Node.js 18+ and latest npm:
```bash
node --version  # Should be 18 or higher
npm --version   # Should be 9 or higher
```

## 📄 License

This is a demo project for learning purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project as a starting point for your own applications!

---

**Built with ❤️ using the latest web technologies**


