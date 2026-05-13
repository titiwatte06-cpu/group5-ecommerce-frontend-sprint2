# Frontend–Backend Interaction Diagram — Group 5 E-Commerce App

## Auth

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| DRegisterScreen | handleSignup | POST /auth/signup | signUpUser |
| DLoginScreen | handleLogin | POST /auth/login | loginUser |
| NavBar | handleLogout | POST /auth/logout | logoutUser |

## Users

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| AdminCustomers | handleGetUsers | GET /users | getAllUsers |
| AdminCustomers | handleUpdateUser | PATCH /users/:userId | updateUserById |
| AdminCustomers | handleUpdateUserRole | PATCH /users/:userId/role | updateUserRole |
| AdminCustomers | handleDeleteUser | DELETE /users/:userId | deleteUserById |

## Products

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| DCatalogScreen | handleGetProducts | GET /products | getAllProducts |
| NavBar | handleSearch | GET /products/search | searchProducts |
| DProductDetailScreen | handleGetProductDetail | GET /products/:productId | getProductById |
| AdminProducts | handleCreateProduct | POST /products | createProduct |
| AdminProducts | handleUpdateProduct | PATCH /products/:productId | updateProductById |
| AdminProducts | handleDeleteProduct | DELETE /products/:productId | deleteProductById |

## Cart

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| DCartCheckoutScreen | handleGetCart | GET /cart | getCart |
| DProductDetailScreen | handleAddToCart | POST /cart | addToCart |
| DCartCheckoutScreen | handleUpdateQty | PATCH /cart/:itemId | updateCartItem |
| DCartCheckoutScreen | handleRemoveItem | DELETE /cart/:itemId | removeCartItem |

## Orders & Payment

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| DCartCheckoutScreen | handleCheckout | POST /orders | createOrder |
| DPaymentScreen | handlePayment | POST /payments | processPayment |
| DTrackingScreen | handleGetOrderDetail | GET /orders/:orderId | getOrderById |
| DTrackingScreen | handleTrackOrder | GET /orders/:orderId/track | trackOrder |

## Admin

| Component | Handler | Route | Controller |
|-----------|---------|-------|------------|
| AdminDashboard | handleGetDashboard | GET /admin/dashboard | getDashboard |
| AdminOrders | handleGetOrders | GET /admin/orders | getAdminOrders |
| AdminOrders | handleUpdateOrderStatus | PATCH /admin/orders/:orderId/status | updateOrderStatus |
| AdminCustomers | handleGetCustomers | GET /admin/customers | getAllCustomers |
