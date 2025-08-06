import { Route, Routes } from "react-router-dom";
import "./App.css";

// Layout
import BottomBar from "./components/layout/BottomBar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

// Pages
import OrderView from "./components/account/OrderView";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import Address from "./pages/Address";
import AllItems from "./pages/AllItems";
import CartPage from "./pages/CartPage";
import CategoryProducts from "./pages/CategoryProducts";
import Home from "./pages/Home";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import OrderSuccess from "./pages/OrderSuccessPage";
import PaymentPage from "./pages/PaymentPage";
import PrivacyPolicy from "./pages/Policy";
import ProductView from "./pages/ProductView";
import ReviewPage from "./pages/ReviewPage";
import ShippingReturns from "./pages/ShippiingReturns";
import TermsAndConditions from "./pages/TermsCondition";
import Wishlist from "./pages/Wishlist";
import Women from "./pages/Women";

// Mobile Views
import EditProfile from "./components/account/Mobile-Views/EditProfile";
import HelpSupport from "./components/account/Mobile-Views/HelpSupport";
import ManageAdress from "./components/account/Mobile-Views/ManageAdress";
import ManageOrders from "./components/account/Mobile-Views/ManageOrders";

// Auth
import LoginPage from "./pages/LoginPage";
import OtpVerificationPage from "./pages/OTPVerification";
import RegisterPage from "./pages/RegisterPage";

// Route Guards
import { CheckoutProvider } from "./context/CheckoutContext";
import ContactUs from "./pages/ContactUs";
import NotFoundPage from "./pages/NotFoundPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import SearchPage from "./pages/Search";
import PrivateRoute from "./routes/PrivateRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoutes";

function App() {
  return (
    <CheckoutProvider>
      <Header />
      <Sidebar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/collection-men" element={<Men />} />
        <Route path="/collection-women" element={<Women />} />
        <Route path="/collection-all" element={<AllItems />} />
        <Route path="/product-view/:slug" element={<ProductView />} />
        <Route path="/products/:slug" element={<CategoryProducts />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/product-reviews" element={<ReviewPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Checkout Steps with Enhanced Protection */}
        <Route path="/checkout/cart" element={<CartPage />} />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute step="address">
              <Address />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute step="payment">
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success/:orderId"
          element={
            <ProtectedRoute step="success">
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute step="success">
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/verify-otp"
          element={
            <PublicRoute>
              <OtpVerificationPage />
            </PublicRoute>
          }
        />

        {/* Private User Routes */}
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-address"
          element={
            <PrivateRoute>
              <ManageAdress />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-orders"
          element={
            <PrivateRoute>
              <ManageOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/help-and-support"
          element={
            <PrivateRoute>
              <HelpSupport />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-profile/order/:orderId"
          element={
            <PrivateRoute>
              <OrderView />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <BottomBar />
    </CheckoutProvider>
  );
}

export default App;
