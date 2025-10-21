# Docker Deployment Guide

This guide explains how to run the full-stack application (NestJS backend + Next.js frontend) using Docker.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Docker Network                     │
│                                                     │
│  ┌──────────────┐           ┌──────────────────┐  │
│  │   Frontend   │           │     Backend      │  │
│  │              │           │                  │  │
│  │  Next.js     │  ───────► │    NestJS        │  │
│  │  Refine      │           │    REST API      │  │
│  │  Chakra UI   │           │                  │  │
│  │              │           │                  │  │
│  │  Port: 3000  │           │   Port: 4000     │  │
│  └──────────────┘           └──────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
         ▲                            ▲
         │                            │
    localhost:3000              localhost:4000
```

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Quick Start

### 1. Clone the Repository

```bash
cd admin_app_poc
```

### 2. Start Both Applications

```bash
docker-compose up --build
```

This will:
- Build the NestJS backend image
- Build the Next.js frontend image
- Start both containers
- Set up networking between them

### 3. Access the Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Backend Health**: http://localhost:4000/health

### 4. Stop the Applications

```bash
docker-compose down
```

## Individual Service Management

### Build Services

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Start Services

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Start specific service
docker-compose up backend
```

### View Logs

```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
```

### Stop Services

```bash
# Stop all services
docker-compose stop

# Stop specific service
docker-compose stop backend
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart frontend
```

### Remove Containers

```bash
# Remove stopped containers
docker-compose rm

# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v
```

## Manual Docker Commands

### Backend (NestJS)

```bash
# Build
cd nestjs-backend
docker build -t nestjs-backend .

# Run
docker run -p 4000:4000 --name backend nestjs-backend

# Run with environment variables
docker run -p 4000:4000 \
  -e PORT=4000 \
  -e NODE_ENV=production \
  --name backend \
  nestjs-backend
```

### Frontend (Next.js)

```bash
# Build
cd nextjs-chakra-app
docker build -t nextjs-frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://backend:4000 \
  .

# Run
docker run -p 3000:3000 --name frontend nextjs-frontend

# Run with environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:4000 \
  --name frontend \
  nextjs-frontend
```

### Running with Custom Network

```bash
# Create network
docker network create app-network

# Run backend
docker run -d \
  --name backend \
  --network app-network \
  -p 4000:4000 \
  nestjs-backend

# Run frontend
docker run -d \
  --name frontend \
  --network app-network \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:4000 \
  nextjs-frontend
```

## Configuration

### Environment Variables

#### Backend (NestJS)
| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 4000 | Server port |
| NODE_ENV | production | Node environment |

#### Frontend (Next.js)
| Variable | Default | Description |
|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | http://backend:4000 | Backend API URL |
| PORT | 3000 | Server port |
| NODE_ENV | production | Node environment |

### Docker Compose Override

Create `docker-compose.override.yml` for local customizations:

```yaml
version: '3.8'

services:
  backend:
    environment:
      - DEBUG=true
    
  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Troubleshooting

### Container Won't Start

Check logs:
```bash
docker-compose logs backend
docker-compose logs frontend
```

### Backend Not Reachable from Frontend

1. Check both containers are in the same network:
```bash
docker network inspect admin_app_poc_app-network
```

2. Verify backend health:
```bash
docker exec backend wget -O- http://localhost:4000/health
```

### CORS Errors

Backend is configured to accept requests from:
- `http://localhost:3000` (local development)
- `http://frontend:3000` (Docker network)

If you need to add more origins, edit `nestjs-backend/src/main.ts`.

### Port Already in Use

Change ports in `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "4001:4000"  # Use 4001 instead of 4000
  
  frontend:
    ports:
      - "3001:3000"  # Use 3001 instead of 3000
```

### Cannot Connect to Backend

From inside frontend container:
```bash
docker exec -it frontend sh
wget -O- http://backend:4000/health
```

### Rebuild After Code Changes

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Development vs Production

### Development (Recommended for development)

Run services locally without Docker:

```bash
# Terminal 1 - Backend
cd nestjs-backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd nextjs-chakra-app
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev
```

Benefits:
- Hot reload
- Faster iterations
- Easier debugging
- No rebuild needed

### Production (Use Docker)

```bash
docker-compose up -d
```

Benefits:
- Consistent environment
- Easy deployment
- Network isolation
- Resource management

## Performance Optimization

### Multi-stage Builds

Both Dockerfiles use multi-stage builds:
- Build stage: Compiles application
- Production stage: Only runtime dependencies

This reduces image size significantly.

### Image Sizes

| Service | Image Size (approx) |
|---------|---------------------|
| Backend | ~200 MB |
| Frontend | ~300 MB |

### Caching

Docker uses layer caching. To maximize:
1. Dependencies are installed before copying source
2. Only changed files trigger rebuild
3. Use `.dockerignore` to exclude unnecessary files

## Deployment to Cloud

### AWS ECS

See `AWS_ECS_DEPLOYMENT_GUIDE.md` for detailed instructions.

### Docker Hub

```bash
# Tag images
docker tag nestjs-backend your-username/nestjs-backend:latest
docker tag nextjs-frontend your-username/nextjs-frontend:latest

# Push to Docker Hub
docker push your-username/nestjs-backend:latest
docker push your-username/nextjs-frontend:latest
```

### Using Remote Images

Update `docker-compose.yml`:

```yaml
services:
  backend:
    image: your-username/nestjs-backend:latest
    # Remove build section
  
  frontend:
    image: your-username/nextjs-frontend:latest
    # Remove build section
```

## Health Checks

### Backend Health Check

```bash
curl http://localhost:4000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "nestjs-backend"
}
```

### Frontend Health Check

```bash
curl http://localhost:3000
```

Should return HTML page.

## Monitoring

### View Resource Usage

```bash
docker stats
```

### Container Information

```bash
docker ps
docker inspect backend
docker inspect frontend
```

## Backup and Restore

### Export Containers

```bash
docker export backend > backend-container.tar
docker export frontend > frontend-container.tar
```

### Export Images

```bash
docker save nestjs-backend > nestjs-backend-image.tar
docker save nextjs-frontend > nextjs-frontend-image.tar
```

### Import Images

```bash
docker load < nestjs-backend-image.tar
docker load < nextjs-frontend-image.tar
```

## Security Best Practices

1. ✅ Use specific Node.js version (not `latest`)
2. ✅ Run as non-root user
3. ✅ Use multi-stage builds
4. ✅ Minimize layer count
5. ✅ Scan images for vulnerabilities:

```bash
docker scan nestjs-backend
docker scan nextjs-frontend
```

## Summary

### Quick Reference

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Rebuild and restart
docker-compose up --build -d

# Clean everything
docker-compose down -v
docker system prune -a
```

### Access Points

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- API Health: http://localhost:4000/health
- API Products: http://localhost:4000/products

### Ports

| Service | Internal Port | External Port |
|---------|--------------|---------------|
| Backend | 4000 | 4000 |
| Frontend | 3000 | 3000 |

---

For more information:
- Backend: See `nestjs-backend/README.md`
- Frontend: See `nextjs-chakra-app/README.md`

