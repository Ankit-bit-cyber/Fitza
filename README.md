# FITZA — Fashion E-Commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

> A full-stack fashion e-commerce application built on the **Fitza.csv** dataset (215,164 AJIO products).  
> Backend-focused architecture following **OOP principles** and **clean layered design**.

---

## Features

### Shopping
- Browse **215,164** fashion products from  dataset
- Filter by **brand**, **category**, **price range**
- **Pagination** support with configurable page size
- Detailed product pages with discount calculation

### Authentication
- JWT-based **register & login**
- Protected routes with **role-based access control**
- Secure password hashing with **bcrypt**
- Auto-logout on token expiry

### Cart & Orders
- Add / remove / update item quantity
- Real-time **total price** calculation
- Place orders directly from cart
- Full **order history** with status tracking

### Frontend UI
- Luxury dark editorial design — **Cormorant Garamond** + **Jost** fonts
- **Skeleton loading** screens with shimmer animation
- Hover animations on product cards
- Transparent → frosted glass navbar on scroll
- Split-screen login page with editorial quote
- Accordion order cards
- Fully **responsive** — mobile + desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18.x |
| Framework | Express.js 5.x |
| Database | MongoDB Atlas + Mongoose 8.x |
| Auth | JSON Web Token + bcrypt |
| CSV Parsing | csv-parse |
| Frontend | React 18 + Vite 4 |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## Architecture

```
Request → Route → Middleware → Controller → Service → Repository → Model → MongoDB
```

### OOP Principles

| Principle | Implementation |
|-----------|---------------|
| **Inheritance** | All repositories extend `BaseRepository` pattern |
| **Encapsulation** | Password hidden in `user.toJSON()`, helpers wrap all responses |
| **Abstraction** | Services never touch DB — only repositories |
| **Polymorphism** | `authorize(...roles)` middleware adapts per role |

### Design Patterns

| Pattern | Where Used |
|---------|-----------|
| Repository Pattern | Data access layer for all models |
| Service Layer | Business logic isolated from HTTP |
| Singleton | DB connection in `config/db.js` |
| Factory Method | Error creation with static factories |

---

## Folder Structure

```
Fitza/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    
│   │   ├── controllers/
│   │   │   ├── auth.controller.js        
│   │   │   ├── product.controller.js     
│   │   │   ├── cart.controller.js        
│   │   │   └── order.controller.js       
│   │   ├── services/
│   │   │   ├── auth.service.js           
│   │   │   ├── product.service.js        
│   │   │   ├── cart.service.js         
│   │   │   └── order.service.js          
│   │   ├── repositories/
│   │   │   ├── user.repository.js        
│   │   │   ├── product.repository.js     
│   │   │   ├── cart.repository.js        
│   │   │   └── order.repository.js       
│   │   ├── models/
│   │   │   ├── user.model.js             
│   │   │   ├── product.model.js          
│   │   │   ├── cart.model.js             
│   │   │   └── order.model.js           
│   │   ├── routes/
│   │   │   ├── auth.routes.js           
│   │   │   ├── product.routes.js        
│   │   │   ├── cart.routes.js            
│   │   │   └── order.routes.js           
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js        
│   │   │   ├── error.middleware.js       
│   │   │   └── validation.middleware.js  
│   │   ├── utils/
│   │   │   ├── logger.js                 
│   │   │   └── helpers.js                
│   │   ├── data/
│   │   │   ├── Fitza.csv                
│   │   │   └── fitzaSeeder.js           
│   │   ├── app.js                       
│   │   └── server.js                    
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                
│   │   │   └── ProductCard.jsx           
│   │   ├── pages/
│   │   │   ├── Home.jsx                
│   │   │   ├── Login.jsx                 
│   │   │   ├── Cart.jsx                 
│   │   │   ├── ProductDetail.jsx        
│   │   │   └── Orders.jsx              
│   │   ├── services/
│   │   │   └── api.js                    
│   │   ├── App.jsx                      
│   │   └── main.jsx                     
│   ├── index.html                        
│   ├── vite.config.js                  
│   └── package.json
│
├── idea.md
├── useCaseDiagram.md
├── sequenceDiagram.md
├── classDiagram.md
├── ErDiagram.md
└── README.md
```

---

## Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/fitza.git
cd Fitza
```
### 2. Backend setup
```bash
cd backend
npm install
npm install csv-parse
```

Create `.env` in `backend/`:
```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fitza_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Seed the database
```bash
npm run seed
```
> Imports all 215,164 products from `Fitza.csv` into MongoDB.

### 4. Start backend
```bash
npm run dev
# Running at http://localhost:8000
```

### 5. Frontend setup
```bash
cd ../frontend
npm install
npm install -D @vitejs/plugin-react
npm start
# Running at http://localhost:5173
```

---

## API Reference

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login + get token |
| GET | `/api/auth/me` | Private | Get profile |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | List (paginated + filtered) |
| GET | `/api/products/:id` | Public | Product detail |
| GET | `/api/products/filters` | Public | Get brands & categories |

**Query params:** `?brand=puma&category=Men&minPrice=200&maxPrice=1000&search=shirt&page=1&limit=20&sort=-discountPrice`

### Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/cart` | Private | Get cart |
| POST | `/api/cart` | Private | Add item |
| PUT | `/api/cart/:productId` | Private | Update quantity |
| DELETE | `/api/cart/:productId` | Private | Remove item |
| DELETE | `/api/cart/clear` | Private | Clear cart |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/order` | Private | Place order |
| GET | `/api/order` | Private | My orders |
| GET | `/api/order/:id` | Private | Order detail |

### Response Format
```json
{ "success": true, "message": "Success", "data": { ... } }
```
```json
{ "success": true, "data": [...], "pagination": { "total": 215164, "page": 1, "limit": 20, "totalPages": 10759 } }
```

---

## Database Schema

| Collection | Key Fields |
|-----------|-----------|
| `users` | `name`, `email`, `password (bcrypt)`, `role` |
| `products` | `name`, `brand`, `category`, `discountPrice`, `originalPrice`, `color`, `imageUrl` |
| `carts` | `user (ref)`, `items[]`, `totalPrice` |
| `orders` | `user (ref)`, `items[]`, `totalPrice`, `status` |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ✅ | — | Server port |
| `MONGO_URI` | ✅ | — | MongoDB connection string |
| `JWT_SECRET` | ✅ | — | JWT signing secret |
| `JWT_EXPIRES_IN` | ❌ | `7d` | Token expiry |
| `NODE_ENV` | ❌ | `development` | Environment |
| `CLIENT_URL` | ❌ | — | Frontend URL for CORS |

---


---


**Total: 215,164 products**

---

**Built by Ankit Kumar — SESD Project 2026**