# FITZA — Fashion E-Commerce Platform

<div align="center">

![Fitza Banner](https://img.shields.io/badge/FITZA-Fashion%20Redefined-ff4d6d?style=for-the-badge&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

> A full-stack fashion e-commerce application built on the **Fitza.csv** dataset (215,000+ AJIO products).  
> Backend-focused architecture following **OOP principles**, **clean layered design**, and **REST API standards**.

</div>

---

## 📸 Preview

| Home | Product Detail | Cart | Orders |
|------|---------------|------|--------|
| Product grid with filters | Brand, price, discount info | Quantity controls + total | Order history with status |

---

## ✨ Features

### 🛍️ Shopping
- Browse **215,164** fashion products from AJIO
- Filter by **brand**, **category**, **color**, **price range**
- Full-text **search** across product names and brands
- **Pagination** with configurable page size
- Product detail page with discount calculation

### 🔐 Authentication
- JWT-based **register & login**
- Protected routes with **role-based access control**
- Secure password hashing with **bcrypt**
- Auto-logout on token expiry

### 🛒 Cart & Orders
- Add / remove / update quantity
- Real-time **total price** calculation
- Place orders from cart
- Full **order history** with status tracking

### 🎨 Frontend
- Dark luxury UI with **Playfair Display** + **DM Sans** fonts
- **Skeleton loading** screens
- Hover animations on product cards
- Fully **responsive** — mobile + desktop
- Cart badge with live item count

---

## 🏗️ Architecture

```
Request → Route → Middleware → Controller → Service → Repository → Model → MongoDB
```

### OOP Principles Applied

| Principle | Implementation |
|-----------|---------------|
| **Inheritance** | `BaseModel` extended by all Mongoose models |
| **Encapsulation** | Password hidden in `user.toJSON()`, helpers wrap all responses |
| **Abstraction** | Services never touch DB directly — only repositories |
| **Polymorphism** | `authorize(...roles)` middleware adapts per role |

### Design Patterns

| Pattern | Where Used |
|---------|-----------|
| **Repository Pattern** | `user.repository.js`, `product.repository.js`, etc. |
| **Service Layer** | Business logic isolated from HTTP layer |
| **Singleton** | DB connection in `config/db.js` |
| **Factory Method** | `AppError` static factories |

---

## 📁 Folder Structure

```
Fitza/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection (Singleton)
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
│   │   │   ├── auth.middleware.js      # JWT verification
│   │   │   ├── error.middleware.js     # Global error handler
│   │   │   └── validation.middleware.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── helpers.js             # Response wrappers
│   │   ├── data/
│   │   │   ├── Fitza.csv              # 215K+ product dataset
│   │   │   └── fitzaSeeder.js         # DB seeder
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx        # With skeleton loader
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Product grid + filters
│   │   │   ├── Login.jsx              # Login + Register tabs
│   │   │   ├── Cart.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Orders.jsx
│   │   ├── services/
│   │   │   └── api.js                 # Axios + interceptors
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   ├── idea.md
│   ├── useCaseDiagram.md
│   ├── sequenceDiagram.md
│   ├── classDiagram.md
│   └── ErDiagram.md
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 5.x | Web framework |
| MongoDB | Atlas | Database |
| Mongoose | 8.x | ODM |
| JSON Web Token | 9.x | Authentication |
| bcrypt | 6.x | Password hashing |
| csv-parse | 5.x | CSV data ingestion |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI library |
| React Router | 6.x | Client routing |
| Axios | 1.x | HTTP client |
| Vite | 4.x | Build tool |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/fitza.git
cd fitza
```

### 2. Setup Backend
```bash
cd backend
npm install
npm install csv-parse
```

Create `.env` file in `backend/`:
```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fitza_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Seed the Database
```bash
npm run seed
```
> This imports all 215,164 products from `Fitza.csv` into MongoDB.

### 4. Start Backend
```bash
npm run dev
```
Backend runs at → `http://localhost:8000`

### 5. Setup Frontend
```bash
cd ../frontend
npm install
npm install -D @vitejs/plugin-react
npm start
```
Frontend runs at → `http://localhost:5173`

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Create account |
| `POST` | `/api/auth/login` | Public | Login + get token |
| `GET` | `/api/auth/me` | Private | Get profile |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/products` | Public | List products (paginated) |
| `GET` | `/api/products/:id` | Public | Product detail |
| `GET` | `/api/products/filters` | Public | Get filter options |

**Query Parameters:**
```
?brand=puma&category=Men&minPrice=200&maxPrice=1000&search=shirt&page=1&limit=20&sort=-discountPrice
```

### Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/cart` | Private | Get user cart |
| `POST` | `/api/cart` | Private | Add item |
| `PUT` | `/api/cart/:productId` | Private | Update quantity |
| `DELETE` | `/api/cart/:productId` | Private | Remove item |
| `DELETE` | `/api/cart/clear` | Private | Clear cart |

### Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/order` | Private | Place order |
| `GET` | `/api/order` | Private | My orders |
| `GET` | `/api/order/:id` | Private | Order detail |

### Response Format
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 215164,
    "page": 1,
    "limit": 20,
    "totalPages": 10759
  }
}
```

---

## 🗄️ Database Schema

```
Users ──────────────── Carts ─────────────── CartItems
  │                      │                       │
  │                      └── contains ──────── Products
  │
  └─────────────────── Orders ────────────── OrderItems
                                                  │
                                              Products
```

| Collection | Key Fields |
|-----------|-----------|
| `users` | `name`, `email`, `password (hashed)`, `role` |
| `products` | `name`, `brand`, `category`, `discountPrice`, `originalPrice`, `color`, `imageUrl` |
| `carts` | `user (ref)`, `items[]`, `totalPrice` |
| `orders` | `user (ref)`, `items[]`, `totalPrice`, `status` |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ✅ | Server port (default: 8000) |
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | JWT signing secret |
| `JWT_EXPIRES_IN` | ❌ | Token expiry (default: 7d) |
| `NODE_ENV` | ❌ | Environment (default: development) |
| `CLIENT_URL` | ❌ | Frontend URL for CORS |

---

## 📊 Dataset

The app uses **Fitza.csv** — a dataset of fashion products from AJIO.

| Column | Description |
|--------|-------------|
| `Brand` | Brand name (puma, netplay, dnmx, etc.) |
| `Description` | Product name |
| `Id_Product` | Unique product identifier |
| `Category_by_gender` | Men / Women |
| `Discount Price (in Rs.)` | Sale price in INR |
| `Original Price (in Rs.)` | MRP in INR |
| `Color` | Product color |
| `URL_image` | Product image URL |
| `Product_URL` | AJIO product URL |

> **Total records: 215,164 products**

---

## 👨‍💻 Author

**Ankit Kumar**  
Full Stack Developer

---

## 📄 License

This project is built for educational purposes as part of SESD coursework.

---

<div align="center">

**Built with ❤️ using Node.js, Express, MongoDB & React**

⭐ Star this repo if you found it helpful!

</div>