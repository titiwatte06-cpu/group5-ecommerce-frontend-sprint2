import { useState, useEffect } from "react";
import { CartContext } from "./useCart";
import { useAuth } from "./AuthContext";
import {
    getCart,
    addCart,
    updateCartItem,
    clearCart as clearCartApi,
} from "@/services/cart";

const SHIPPING_FEE = 30;

// Normalize API cart items → shape the UI expects (qty, _id as productId)
function normalizeItems(apiItems = []) {
    return apiItems.map((item) => {
        const productId = item.productId?._id ?? item.productId;
        return {
            ...item,
            _id: productId,
            id: productId,
            qty: item.quantity,
        };
    });
}

export function CartProvider({ children }) {
    const { user, loading: authLoading } = useAuth();
    const [items, setItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    // Fetch cart when user logs in, clear when logs out
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setItems([]);
            return;
        }
        setCartLoading(true);
        getCart()
            .then((res) => setItems(normalizeItems(res.data?.items)))
            .catch(() => {})
            .finally(() => setCartLoading(false));
    }, [user, authLoading]);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = subtotal + SHIPPING_FEE;

    async function addItem(product) {
        const productId = product._id || product.id;
        const quantity = product.selectedQty || 1;
        const res = await addCart(productId, quantity);
        setItems(normalizeItems(res.data?.items));
    }

    async function incrementQty(id) {
        const item = items.find((i) => (i._id || i.id) === id);
        if (!item) return;
        const res = await updateCartItem(id, item.qty + 1);
        setItems(normalizeItems(res.data?.items));
    }

    async function decrementQty(id) {
        const item = items.find((i) => (i._id || i.id) === id);
        if (!item) return;
        // qty - 1 = 0 → BE removes item (editCartItem handles quantity=0)
        const res = await updateCartItem(id, item.qty - 1);
        setItems(normalizeItems(res.data?.items));
    }

    async function removeItem(id) {
        const res = await updateCartItem(id, 0);
        setItems(normalizeItems(res.data?.items));
    }

    async function clearCart() {
        await clearCartApi();
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                subtotal,
                total,
                cartLoading,
                addItem,
                incrementQty,
                decrementQty,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
