import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  addToCart,
  generateGuestCartId,
  getCartItems,
  getGuestCartItems,
  mergeCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from "../service/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);

      try {
        if (isAuthenticated && user?.userId) {
          // Authenticated user cart
          const items = await getCartItems(user.userId);
          setCart(items);
          setCartItems(items?.items || []);
          setCartId(items?.cartId || null);
        } else if (!isAuthenticated) {
          // Guest cart
          let guestId = localStorage.getItem("guestCartId");
          if (!guestId) {
            guestId = generateGuestCartId();
            localStorage.setItem("guestCartId", guestId);
          }

          try {
            const guestCart = await getGuestCartItems(guestId);
            setCart(guestCart);
            setCartItems(guestCart?.items || []);
            setCartId(guestCart?.id || guestId);
          } catch (err) {
            console.error("Failed to fetch guest cart:", err);
            // Initialize empty cart for guest
            setCart(null);
            setCartItems([]);
            setCartId(guestId);
          }
        } else {
          // User is authenticating, wait for complete auth state
          setCart(null);
          setCartItems([]);
          setCartId(null);
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCart(null);
        setCartItems([]);
        setCartId(null);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, user?.userId]);

  // Updated Add to Cart that supports multi items
  const handleAddToCart = async (product, selectedSizes, selectedColors) => {
    try {
      let currentCartId = cartId;

      if (!isAuthenticated) {
        if (!currentCartId) {
          currentCartId = generateGuestCartId();
          localStorage.setItem("guestCartId", currentCartId);
          setCartId(currentCartId);
        }
      }

      const items = [];
      selectedSizes.forEach((size) => {
        selectedColors.forEach((color) => {
          items.push({
            productId: product.productId,
            productName: product.name,
            size,
            color,
            quantity: 1,
            price: product.price,
            oldPrice: product.oldPrice,
            tax: product.tax,
            image: product.images[0],
          });
        });
      });

      const cartData = {
        userId: isAuthenticated && user?.userId ? user.userId : null,
        cartId: !isAuthenticated ? currentCartId : null,
        items,
      };

      const updatedCart = await addToCart(cartData);
      setCart(updatedCart);
      setCartItems(updatedCart?.items || []);
      setCartId(updatedCart?.cartId || currentCartId);
    } catch (err) {
      console.error("Add to cart failed:", err);
      throw err; // Re-throw to handle in UI
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const updatedCart = await removeCartItem(cartItemId);
      refreshCart();
      setCart(updatedCart);
      setCartItems(updatedCart?.items || []);
    } catch (err) {
      console.error("Remove item failed:", err);
      throw err;
    }
  };

  const handleUpdateQuantity = async (
    cartItemId,
    productId,
    size,
    color,
    quantity
  ) => {
    try {
      const updated = await updateCartItemQuantity(
        cartItemId,
        productId,
        size,
        color,
        quantity
      );
      setCart(updated);
      setCartItems(updated?.items || []);
    } catch (err) {
      console.error("Update quantity failed:", err);
      throw err;
    }
  };

  const mergeCartAfterLogin = async (guestCartId, userId) => {
    try {
      const merged = await mergeCartItem(guestCartId, userId);
      setCart(merged);
      setCartItems(merged?.items || []);
      setCartId(merged?.id || null);
      localStorage.removeItem("guestCartId");
    } catch (err) {
      console.error("Merge cart failed:", err);
      throw err;
    }
  };

  // Refresh cart function for manual refresh
  const refreshCart = async () => {
    setLoading(true);
    try {
      if (isAuthenticated && user?.userId) {
        const items = await getCartItems(user.userId);
        setCart(items);
        setCartItems(items?.items || []);
        setCartId(items?.cartId || null);
      } else if (!isAuthenticated) {
        const guestId = localStorage.getItem("guestCartId");
        if (guestId) {
          const guestCart = await getGuestCartItems(guestId);
          setCart(guestCart);
          setCartItems(guestCart?.items || []);
          setCartId(guestCart?.id || guestId);
        }
      }
    } catch (err) {
      console.error("Failed to refresh cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cart,
        cartId,
        loading,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        mergeCartAfterLogin,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
