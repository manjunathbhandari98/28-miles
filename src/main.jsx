import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AddressModalProvider } from "./context/AddressModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishListProvider } from "./context/WishlistContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AddressModalProvider>
        <CartProvider>
          <WishListProvider>
            <Toaster />
            <App />
          </WishListProvider>
        </CartProvider>
      </AddressModalProvider>
    </AuthProvider>
  </BrowserRouter>
);
