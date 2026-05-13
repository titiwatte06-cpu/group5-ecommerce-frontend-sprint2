# API Specification — Group 5 E-Commerce App

### Auth

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /auth/signup | POST | Register a new user |
| /auth/login | POST | Authenticate and issue JWT |
| /auth/logout | POST | Invalidate current session |

### Users

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /users/me | GET | Get logged-in user profile from JWT |
| /users/me | PATCH | Update logged-in user's own details |
| /users | GET | List all users, admin only |
| /users/:userId | PATCH | Admin update user details |
| /users/:userId/role | PATCH | Admin change user role |
| /users/:userId | DELETE | Admin delete user |

### Products

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /products | GET | List all products with filter and pagination |
| /products/search | GET | Search products by keyword (?q=) |
| /products/:productId | GET | Get single product detail |
| /products | POST | Admin create new product |
| /products/:productId | PATCH | Admin update product details |
| /products/:productId | DELETE | Admin delete product |

### Cart

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /cart | GET | Get current user's cart items |
| /cart | POST | Add a product to cart |
| /cart/:itemId | PATCH | Update item quantity in cart |
| /cart/:itemId | DELETE | Remove item from cart |

### Orders

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /orders | POST | Place a new order and trigger payment |
| /orders | GET | Get order history for logged-in user |
| /orders/:orderId | GET | Get single order detail |
| /orders/:orderId/track | GET | Get real-time shipping status |

### Admin

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /admin/dashboard | GET | Get sales stats and analytics summary |
| /admin/orders | GET | List all orders across all users |
| /admin/orders/:orderId/status | PATCH | Update order status |
| /admin/customers | GET | List all registered customers |
