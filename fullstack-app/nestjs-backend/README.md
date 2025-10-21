# NestJS Backend API

A simple REST API built with NestJS for product management.

## Features

- ✅ Full CRUD operations for products
- ✅ In-memory data store
- ✅ CORS enabled for frontend communication
- ✅ Docker support
- ✅ Health check endpoint

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome message |
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

### Example Requests

#### Get All Products
```bash
GET http://localhost:4000/products
```

#### Get Single Product
```bash
GET http://localhost:4000/products/1
```

#### Create Product
```bash
POST http://localhost:4000/products
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Product
```bash
PATCH http://localhost:4000/products/1
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 149.99
}
```

#### Delete Product
```bash
DELETE http://localhost:4000/products/1
```

## Development

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
npm install
```

### Running the app
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

### Build
```bash
npm run build
```

## Docker

### Build Docker Image
```bash
docker build -t nestjs-backend .
```

### Run Docker Container
```bash
docker run -p 4000:4000 nestjs-backend
```

## Testing with curl

```bash
# Get all products
curl http://localhost:4000/products

# Get specific product
curl http://localhost:4000/products/1

# Create new product
curl -X POST http://localhost:4000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "category": "Test",
    "stock": 10
  }'

# Update product
curl -X PATCH http://localhost:4000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 149.99}'

# Delete product
curl -X DELETE http://localhost:4000/products/1
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 4000 | Server port |
| NODE_ENV | development | Node environment |

## Project Structure

```
nestjs-backend/
├── src/
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── entities/
│   │   │   └── product.entity.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts
├── Dockerfile
├── package.json
└── tsconfig.json
```

## License

MIT

