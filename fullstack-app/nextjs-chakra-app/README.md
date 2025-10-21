# Next.js + Refine + Chakra UI Frontend

A modern CRUD application built with Next.js 14, Refine framework, and Chakra UI.

## Features

- ✅ Full CRUD operations for products
- ✅ Beautiful UI with Chakra UI components
- ✅ Powered by Refine framework
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Docker support
- ✅ Connected to NestJS backend

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Refine** - React framework for CRUD applications
- **Chakra UI** - Component library
- **TypeScript** - Type safety
- **Tabler Icons** - Icon library

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- NestJS backend running on port 4000

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Docker

### Build Docker Image

```bash
docker build -t nextjs-chakra-app .
```

### Run Docker Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:4000 \
  nextjs-chakra-app
```

## Project Structure

```
nextjs-chakra-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Chakra UI & Refine providers
│   │   └── products/
│   │       ├── page.tsx         # Products list
│   │       ├── create/          # Create product
│   │       ├── edit/[id]/       # Edit product
│   │       └── show/[id]/       # Show product details
│   └── types/
│       └── product.ts           # Product type definitions
├── Dockerfile
├── next.config.js
├── package.json
└── tsconfig.json
```

## Features Overview

### Products List
- View all products in a table
- Search and filter
- Quick actions (view, edit, delete)
- Stock status badges

### Create Product
- Form validation
- All required fields
- Image URL support

### Edit Product
- Pre-filled form with existing data
- Update any field
- Save changes

### Show Product
- Detailed product view
- Product image
- All product information
- Stock status
- Timestamps

## API Endpoints Used

The app connects to the NestJS backend:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/products` | GET | List all products |
| `/products/:id` | GET | Get single product |
| `/products` | POST | Create product |
| `/products/:id` | PATCH | Update product |
| `/products/:id` | DELETE | Delete product |

## Customization

### Change Theme

Edit `src/app/providers.tsx`:

```typescript
<ChakraProvider theme={RefineThemes.Blue}> {/* Try: Purple, Orange, etc. */}
```

### Add New Resource

Add to resources in `src/app/providers.tsx`:

```typescript
resources={[
  {
    name: 'products',
    // ...
  },
  {
    name: 'your-resource',
    list: '/your-resource',
    // ...
  },
]}
```

## Screenshots

### Products List
Full table view with all products and actions.

### Create/Edit Form
Clean form with validation for creating and editing products.

### Product Details
Detailed view with product information and image.

## Troubleshooting

### Cannot connect to backend

Make sure the NestJS backend is running on port 4000:

```bash
cd nestjs-backend
npm run start:dev
```

### CORS errors

Backend has CORS enabled for `http://localhost:3000`. If running on different port/domain, update backend CORS configuration.

### Build errors

Clear Next.js cache:

```bash
rm -rf .next
npm run build
```

## License

MIT

