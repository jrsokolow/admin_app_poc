# Full-Stack Product Management Application

A complete CRUD application with **NestJS backend** and **Next.js + Refine + Chakra UI frontend**, fully dockerized.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# From this directory
docker-compose up --build
```

Then visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

### Stop the Application

```bash
docker-compose down
```

## 📁 Project Structure

```
fullstack-app/
├── nestjs-backend/              # NestJS Backend API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── products/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── nextjs-chakra-app/           # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── providers.tsx
│   │   │   └── products/
│   │   └── types/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml           # Docker orchestration
├── DOCKER_DEPLOYMENT_GUIDE.md   # Detailed Docker guide
├── FULLSTACK_APP_README.md      # Comprehensive documentation
└── README.md                    # This file
```

## 🎯 Features

### Backend (NestJS)
- ✅ RESTful API with full CRUD operations
- ✅ In-memory data store with 5 sample products
- ✅ CORS enabled
- ✅ Health check endpoint (`/health`)
- ✅ TypeScript support

### Frontend (Next.js + Refine + Chakra UI)
- ✅ Modern UI with Chakra UI
- ✅ Full CRUD interface (List, Create, Edit, Show)
- ✅ Refine framework for rapid development
- ✅ Responsive design
- ✅ TypeScript support

## 📡 API Endpoints

Base URL: `http://localhost:4000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |
| GET | `/health` | Health check |

## 🛠️ Local Development

### Backend

```bash
cd nestjs-backend
npm install
npm run start:dev
```

Runs on: http://localhost:4000

### Frontend

```bash
cd nextjs-chakra-app
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev
```

Runs on: http://localhost:3000

## 📚 Documentation

- **[FULLSTACK_APP_README.md](./FULLSTACK_APP_README.md)** - Complete application guide
- **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)** - Docker deployment instructions
- **[nestjs-backend/README.md](./nestjs-backend/README.md)** - Backend documentation
- **[nextjs-chakra-app/README.md](./nextjs-chakra-app/README.md)** - Frontend documentation

## 🔧 Technology Stack

**Backend:**
- NestJS 10
- TypeScript 5
- Express
- Node 20

**Frontend:**
- Next.js 14 (App Router)
- Refine 4
- Chakra UI 2
- TypeScript 5
- React 18

**DevOps:**
- Docker
- Docker Compose

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build -d

# Clean everything
docker-compose down -v
```

## 📝 Common Tasks

### Test API

```bash
# Health check
curl http://localhost:4000/health

# Get all products
curl http://localhost:4000/products

# Create product
curl -X POST http://localhost:4000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "category": "Test",
    "stock": 10
  }'
```

### Access Containers

```bash
# Backend shell
docker exec -it nestjs-backend sh

# Frontend shell
docker exec -it nextjs-frontend sh
```

## 🎨 Frontend Pages

1. **Home** (`/`) - Welcome page
2. **Products List** (`/products`) - Table view with actions
3. **Create Product** (`/products/create`) - Add new product
4. **Edit Product** (`/products/edit/:id`) - Update product
5. **Show Product** (`/products/show/:id`) - View details

## 🔒 Environment Variables

### Backend
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Node environment (default: production)

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://backend:4000)
- `PORT` - Server port (default: 3000)

## 🚀 Deployment

For cloud deployment instructions (AWS ECS, etc.), see **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)**.

## 🐛 Troubleshooting

### Port Already in Use

Change ports in `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "4001:4000"  # Use 4001 instead
  frontend:
    ports:
      - "3001:3000"  # Use 3001 instead
```

### Cannot Connect to Backend

1. Check backend health: `curl http://localhost:4000/health`
2. Check Docker network: `docker network inspect fullstack-app_app-network`
3. Check CORS configuration in `nestjs-backend/src/main.ts`

### Rebuild After Changes

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 📄 License

MIT

---

**Ready to start?** Run `docker-compose up --build` and visit http://localhost:3000 🚀


