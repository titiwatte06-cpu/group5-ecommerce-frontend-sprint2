# System Design — Group 5 E-Commerce App

## 1. System Design Diagram

```mermaid
graph TB
    User(["👤 User"])
    Admin(["🔑 Admin"])

    subgraph Client ["🌐 Client Layer"]
        Browser["Web Browser"]
    end

    subgraph Frontend ["⚛️ Frontend — React 19 + Vite + Tailwind CSS v4"]
        direction TB

        subgraph Routing ["React Router v7 — Routes"]
            direction LR
            R1["/ — Home"]
            R2["/catalog — Catalog"]
            R3["/product/:id — Product Detail"]
            R4["/cart — Cart & Checkout"]
            R5["/payment — Payment"]
            R6["/tracking — Order Tracking"]
            R7["/login · /register — Auth"]
            R8["/admin/* — Admin Panel"]
        end

        subgraph State ["Global State"]
            CartCtx["CartContext\nitems · subtotal · total\naddItem · removeItem · updateQty"]
        end

        subgraph UIComponents ["UI Components"]
            NavBar["NavBar\nSearch · Cart Badge · User Menu"]
            Footer["Footer"]
            ShadcnUI["shadcn/ui + Radix UI\n49 reusable components"]
        end
    end

    subgraph Backend ["⚙️ Backend API — Node.js / Express"]
        direction TB
        AuthSvc["🔐 Auth Service\nPOST /api/auth/login\nPOST /api/auth/register\nPOST /api/auth/logout"]
        ProductSvc["📦 Product Service\nGET /api/products\nGET /api/products/:id\nGET /api/products/search"]
        CartSvc["🛒 Cart Service\nGET /api/cart\nPOST /api/cart\nPUT /api/cart/:itemId\nDELETE /api/cart/:itemId"]
        OrderSvc["📋 Order Service\nPOST /api/orders\nGET /api/orders/:id\nGET /api/orders/:id/track"]
        AdminSvc["🛠️ Admin Service\nGET /api/admin/dashboard\nCRUD /api/admin/products\nGET /api/admin/orders\nGET /api/admin/customers"]
    end

    subgraph Database ["🗄️ Database — PostgreSQL"]
        direction LR
        UsersDB[("Users\nid · name · email\npassword_hash · role")]
        ProductsDB[("Products\nid · name · price\nimage · stock · tags")]
        OrdersDB[("Orders\nid · user_id · status\ntotal · items · address")]
        CartDB[("Cart Items\nid · user_id\nproduct_id · quantity")]
    end

    subgraph External ["🌐 External Services"]
        direction LR
        PaymentGW["💳 Payment Gateway\nOmise / Stripe"]
        CloudStorage["☁️ Cloud Storage\nCloudinary / S3\nProduct Images"]
        EmailSvc["📧 Email Service\nSendGrid\nOrder Confirmations"]
        LogisticsAPI["🚚 Logistics API\nOrder Tracking\nShipping Status"]
    end

    User --> Browser
    Admin --> Browser
    Browser --> Frontend
    Frontend --> Backend

    AuthSvc --> UsersDB
    ProductSvc --> ProductsDB
    CartSvc --> CartDB
    CartSvc --> ProductsDB
    OrderSvc --> OrdersDB
    OrderSvc --> CartDB
    AdminSvc --> UsersDB
    AdminSvc --> ProductsDB
    AdminSvc --> OrdersDB

    OrderSvc --> PaymentGW
    OrderSvc --> EmailSvc
    OrderSvc --> LogisticsAPI
    AdminSvc --> CloudStorage
```

---

## 2. API Specification

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account | No |
| POST | `/api/auth/login` | Login, returns JWT token | No |
| POST | `/api/auth/logout` | Invalidate session | Yes |
| GET | `/api/products` | List all products (with filter/search/pagination) | No |
| GET | `/api/products/:id` | Get single product detail | No |
| GET | `/api/products/search?q=` | Search products by keyword | No |
| GET | `/api/cart` | Get current user's cart | Yes |
| POST | `/api/cart` | Add item to cart | Yes |
| PUT | `/api/cart/:itemId` | Update item quantity | Yes |
| DELETE | `/api/cart/:itemId` | Remove item from cart | Yes |
| POST | `/api/orders` | Place order (triggers payment) | Yes |
| GET | `/api/orders/:id` | Get order detail | Yes |
| GET | `/api/orders/:id/track` | Get real-time tracking status | Yes |
| GET | `/api/admin/dashboard` | Sales stats & analytics | Admin |
| GET | `/api/admin/products` | List all products | Admin |
| POST | `/api/admin/products` | Create new product | Admin |
| PUT | `/api/admin/products/:id` | Update product | Admin |
| DELETE | `/api/admin/products/:id` | Delete product | Admin |
| GET | `/api/admin/orders` | List all orders | Admin |
| PATCH | `/api/admin/orders/:id/status` | Update order status | Admin |
| GET | `/api/admin/customers` | List all customers | Admin |

---

## 3. Frontend–Backend Interaction Diagram

```mermaid
sequenceDiagram
    actor User
    participant FE as Frontend (React)
    participant API as Backend API
    participant DB as Database
    participant Pay as Payment Gateway
    participant Email as Email Service

    Note over User,Email: 🔐 Authentication Flow
    User->>FE: Fill login form
    FE->>API: POST /api/auth/login
    API->>DB: Query Users table
    DB-->>API: User record + password hash
    API-->>FE: JWT Token
    FE-->>User: Redirect to Home

    Note over User,Email: 🛍️ Browse & Add to Cart
    User->>FE: Open Catalog page
    FE->>API: GET /api/products
    API->>DB: Query Products table
    DB-->>API: Product list
    API-->>FE: Products JSON
    FE-->>User: Display product grid

    User->>FE: Click "Add to Cart"
    FE->>API: POST /api/cart (with product_id)
    API->>DB: Insert into Cart Items
    DB-->>API: Updated cart
    API-->>FE: Cart data
    FE-->>User: Update cart badge count

    Note over User,Email: 💳 Checkout & Payment
    User->>FE: Confirm order on Cart page
    FE->>API: POST /api/orders
    API->>DB: Create Order record
    API->>Pay: Charge payment
    Pay-->>API: Payment success
    API->>DB: Update Order status → "Paid"
    API->>Email: Send order confirmation
    API-->>FE: Order ID + status
    FE-->>User: Redirect to Tracking page

    Note over User,Email: 📦 Order Tracking
    User->>FE: View /tracking page
    FE->>API: GET /api/orders/:id/track
    API->>DB: Query Orders table
    DB-->>API: Order + shipping status
    API-->>FE: Tracking data
    FE-->>User: Display tracking timeline
```

---

## Architecture Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + Vite + Tailwind CSS v4 | UI rendering, routing, state |
| State Management | React Context (CartContext) | Global cart state |
| Component Library | shadcn/ui + Radix UI | Accessible UI components |
| Backend | Node.js + Express | REST API, business logic |
| Database | PostgreSQL | Persistent data storage |
| Auth | JWT (JSON Web Token) | Stateless authentication |
| Payment | Omise / Stripe | Secure payment processing |
| Storage | Cloudinary / AWS S3 | Product image hosting |
| Email | SendGrid | Transactional emails |
| Tracking | Logistics API | Real-time shipping status |
