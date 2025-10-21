# Full-Stack Product Management Application

A complete CRUD application with **NestJS backend** and **Next.js + Refine + Chakra UI frontend**, fully dockerized.

## 🚀 Features

### Backend (NestJS)
- ✅ RESTful API with full CRUD operations
- ✅ In-memory data store with sample products
- ✅ CORS enabled for frontend communication
- ✅ Health check endpoint
- ✅ TypeScript support
- ✅ Docker support

### Frontend (Next.js + Refine + Chakra UI)
- ✅ Modern UI with Chakra UI components
- ✅ Refine framework for rapid development
- ✅ Full CRUD interface (List, Create, Edit, Show)
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Docker support

## 📁 Project Structure

```
admin_app_poc/
├── nestjs-backend/              # NestJS Backend API
│   ├── src/
│   │   ├── main.ts              # Application entry point
│   │   ├── app.module.ts        # Root module
│   │   └── products/            # Products module
│   │       ├── products.controller.ts
│   │       ├── products.service.ts
│   │       ├── products.module.ts
│   │       ├── entities/
│   │       └── dto/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── nextjs-chakra-app/           # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── providers.tsx    # Refine & Chakra providers
│   │   │   ├── page.tsx         # Home page
│   │   │   └── products/        # Product pages
│   │   │       ├── page.tsx           # List view
│   │   │       ├── create/            # Create form
│   │   │       ├── edit/[id]/         # Edit form
│   │   │       └── show/[id]/         # Detail view
│   │   └── types/
│   │       └── product.ts       # TypeScript interfaces
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml           # Docker Compose configuration
├── DOCKER_DEPLOYMENT_GUIDE.md   # Docker deployment guide
└── FULLSTACK_APP_README.md      # This file
```

## 🎯 Quick Start

### Option 1: Using Docker (Recommended)

#### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

#### Start the Application

```bash
# From project root
docker-compose up --build
```

#### Access the Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

#### Stop the Application

```bash
docker-compose down
```

### Option 2: Local Development

#### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

#### Backend Setup

```bash
cd nestjs-backend
npm install
npm run start:dev
```

Backend will run on: http://localhost:4000

#### Frontend Setup

```bash
cd nextjs-chakra-app
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev
```

Frontend will run on: http://localhost:3000

## 📡 API Endpoints

### Base URL: `http://localhost:4000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Product Schema

```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Example API Requests

#### Get All Products
```bash
curl http://localhost:4000/products
```

#### Get Single Product
```bash
curl http://localhost:4000/products/1
```

#### Create Product
```bash
curl -X POST http://localhost:4000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50
  }'
```

#### Update Product
```bash
curl -X PATCH http://localhost:4000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 149.99}'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:4000/products/1
```

## 🎨 Frontend Features

### Products List
- View all products in a table
- Stock status badges (In Stock, Low Stock, Out of Stock)
- Quick actions: View, Edit, Delete
- Create new product button

### Create Product
- Clean form with validation
- All required fields marked
- Optional image URL
- Form validation feedback

### Edit Product
- Pre-filled form with current values
- Same validation as create
- Save changes or cancel

### Product Details
- Detailed view with product image
- All product information displayed
- Stock status
- Creation and update timestamps
- Edit button for quick access

## 🐳 Docker Information

### Images

| Service | Base Image | Size (approx) |
|---------|-----------|---------------|
| Backend | node:20-alpine | ~200 MB |
| Frontend | node:20-alpine | ~300 MB |

### Containers

| Container | Port | Internal Network |
|-----------|------|------------------|
| nestjs-backend | 4000:4000 | backend |
| nextjs-frontend | 3000:3000 | frontend |

### Networks

Both containers run in the `app-network` bridge network for internal communication.

### Volumes

No persistent volumes needed (in-memory data store).

## 🔧 Configuration

### Backend Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 4000 | Server port |
| NODE_ENV | production | Node environment |

### Frontend Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | http://backend:4000 | Backend API URL |
| PORT | 3000 | Server port |

## 🚀 Development Workflow

### Backend Development

```bash
cd nestjs-backend

# Install dependencies
npm install

# Development mode (hot reload)
npm run start:dev

# Build
npm run build

# Production mode
npm run start:prod
```

### Frontend Development

```bash
cd nextjs-chakra-app

# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Build
npm run build

# Production mode
npm run start
```

### Docker Development

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up --build
```

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:4000/health

# Get products
curl http://localhost:4000/products

# Get specific product
curl http://localhost:4000/products/1
```

### Test Frontend

1. Open http://localhost:3000
2. Click "Go to Products"
3. Try CRUD operations:
   - View list of products
   - Click "Create Product"
   - Fill form and submit
   - Click "View" icon to see details
   - Click "Edit" icon to modify
   - Click "Delete" icon to remove

## 📊 Technology Stack

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Express** - HTTP server

### Frontend
- **Next.js 14** - React framework with App Router
- **Refine** - CRUD framework
- **Chakra UI** - Component library
- **TypeScript** - Type safety
- **Tabler Icons** - Icon set

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🔒 Security

### CORS Configuration

Backend allows requests from:
- `http://localhost:3000` (local dev)
- `http://frontend:3000` (Docker network)

To add more origins, edit `nestjs-backend/src/main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'http://frontend:3000', 'your-domain.com'],
  // ...
});
```

### Environment Variables

Never commit `.env` files with sensitive data. Use:
- `.env.local` for local development
- `.env.example` as templates
- Environment variables in Docker Compose or cloud platforms

## 📝 Common Issues & Solutions

### Port Already in Use

```bash
# Check what's using the port
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Kill the process or change ports in docker-compose.yml
```

### Cannot Connect to Backend

1. Check backend is running:
```bash
curl http://localhost:4000/health
```

2. Check Docker network:
```bash
docker network inspect admin_app_poc_app-network
```

3. Check frontend environment variable:
```bash
docker exec frontend env | grep NEXT_PUBLIC_API_URL
```

### CORS Errors

Make sure backend CORS configuration includes your frontend URL.

### Docker Build Fails

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

## 📚 Documentation

- **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)** - Complete Docker guide
- **[nestjs-backend/README.md](./nestjs-backend/README.md)** - Backend documentation
- **[nextjs-chakra-app/README.md](./nextjs-chakra-app/README.md)** - Frontend documentation

## 🎓 Learning Resources

### NestJS
- [Official Documentation](https://docs.nestjs.com/)
- [NestJS GitHub](https://github.com/nestjs/nest)

### Next.js
- [Official Documentation](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Refine
- [Official Documentation](https://refine.dev/docs/)
- [Refine GitHub](https://github.com/refinedev/refine)

### Chakra UI
- [Official Documentation](https://chakra-ui.com/docs)
- [Chakra UI GitHub](https://github.com/chakra-ui/chakra-ui)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT

---

## 🎉 Summary

You now have a complete full-stack application with:
- ✅ RESTful API backend with NestJS
- ✅ Modern frontend with Next.js + Refine + Chakra UI
- ✅ Full CRUD operations
- ✅ Docker support for easy deployment
- ✅ TypeScript throughout
- ✅ Production-ready setup

### Quick Commands Reference

```bash
# Docker - Start everything
docker-compose up -d

# Docker - View logs
docker-compose logs -f

# Docker - Stop everything
docker-compose down

# Local - Start backend
cd nestjs-backend && npm run start:dev

# Local - Start frontend
cd nextjs-chakra-app && npm run dev
```

**Happy coding! 🚀**

