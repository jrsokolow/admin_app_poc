# Getting Started with Full-Stack App

## 🚀 Quick Start (Docker)

From this directory:

```bash
docker-compose up --build
```

**That's it!** Now visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## 🛑 To Stop

```bash
docker-compose down
```

## 📖 What You Can Do

### 1. View Products
- Go to http://localhost:3000
- Click "Go to Products"
- See 5 pre-loaded products

### 2. Create a Product
- Click "Create Product" button
- Fill in the form:
  - Name: Required
  - Description: Required
  - Price: Required (number)
  - Category: Required
  - Stock: Required (number)
  - Image URL: Optional
- Click "Create Product"

### 3. Edit a Product
- Click the edit icon (pencil) on any product
- Modify any field
- Click "Save Changes"

### 4. View Product Details
- Click the view icon (eye) on any product
- See all product information including:
  - Product image
  - Full details
  - Stock status
  - Timestamps

### 5. Delete a Product
- Click the delete icon (trash) on any product
- Product is removed from the list

## 🔍 Explore the API

### Get All Products
```bash
curl http://localhost:4000/products
```

### Get Single Product
```bash
curl http://localhost:4000/products/1
```

### Create Product
```bash
curl -X POST http://localhost:4000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "description": "High DPI gaming mouse",
    "price": 79.99,
    "category": "Gaming",
    "stock": 100
  }'
```

### Update Product
```bash
curl -X PATCH http://localhost:4000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 1399.99}'
```

### Delete Product
```bash
curl -X DELETE http://localhost:4000/products/1
```

### Health Check
```bash
curl http://localhost:4000/health
```

## 🛠️ Local Development (Without Docker)

### Terminal 1 - Backend

```bash
cd nestjs-backend
npm install
npm run start:dev
```

Backend runs on: http://localhost:4000

### Terminal 2 - Frontend

```bash
cd nextjs-chakra-app
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
npm run dev
```

Frontend runs on: http://localhost:3000

## 📊 Pre-loaded Products

The backend comes with 5 sample products:

1. **Laptop Pro 15** - $1,299.99 (Electronics)
2. **Wireless Mouse** - $29.99 (Accessories)
3. **USB-C Hub** - $49.99 (Accessories)
4. **Mechanical Keyboard** - $89.99 (Peripherals)
5. **27" 4K Monitor** - $399.99 (Electronics)

## 🎨 UI Features

### Stock Status Badges
- **Green (In Stock)**: Stock > 20
- **Yellow (Low Stock)**: Stock 1-20
- **Red (Out of Stock)**: Stock = 0

### Responsive Design
- Desktop: Full table view
- Tablet: Optimized layout
- Mobile: Stacked cards

### Form Validation
- Required fields marked with *
- Real-time validation
- Error messages
- Success notifications

## 🐛 Troubleshooting

### Port Already in Use

If ports 3000 or 4000 are busy, edit `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "4001:4000"  # Change to 4001
  frontend:
    ports:
      - "3001:3000"  # Change to 3001
```

### Cannot Connect to Backend

1. Check backend is running:
   ```bash
   docker ps
   ```
   
2. Check backend health:
   ```bash
   curl http://localhost:4000/health
   ```

3. Check logs:
   ```bash
   docker-compose logs backend
   ```

### Frontend Shows Error

Check if backend is accessible:
```bash
curl http://localhost:4000/products
```

View frontend logs:
```bash
docker-compose logs frontend
```

### Need to Rebuild

After code changes:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 📚 Learn More

- **[README.md](./README.md)** - Quick reference
- **[FULLSTACK_APP_README.md](./FULLSTACK_APP_README.md)** - Complete guide
- **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)** - Docker details
- **[nestjs-backend/README.md](./nestjs-backend/README.md)** - Backend docs
- **[nextjs-chakra-app/README.md](./nextjs-chakra-app/README.md)** - Frontend docs

## 🎯 Next Steps

1. ✅ Start the app with `docker-compose up --build`
2. ✅ Try all CRUD operations
3. ✅ Explore the API endpoints
4. ✅ Check out the code structure
5. ✅ Customize and extend!

## 💡 Tips

- Use **Ctrl+C** in terminal to stop Docker Compose
- Use `docker-compose logs -f` to follow logs in real-time
- Backend data is in-memory, so it resets on restart
- Frontend connects to backend via Docker network internally
- All TypeScript for type safety

---

**Happy coding!** 🚀


