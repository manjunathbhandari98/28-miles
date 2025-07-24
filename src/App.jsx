import { Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./components/account/Mobile-Views/EditProfile";
import HelpSupport from "./components/account/Mobile-Views/HelpSupport";
import ManageAdress from "./components/account/Mobile-Views/ManageAdress";
import ManageOrders from "./components/account/Mobile-Views/ManageOrders";
import BottomBar from "./components/layout/BottomBar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import AllItems from "./pages/AllItems";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import OtpVerificationPage from "./pages/OTPVerification";
import PrivacyPolicy from "./pages/Policy";
import ProductView from "./pages/ProductView";
import ShippingReturns from "./pages/ShippiingReturns";
import TermsAndConditions from "./pages/TermsCondition";
import Wishlist from "./pages/Wishlist";
import Women from "./pages/Women";
function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/collection-men" element={<Men />} />
        <Route path="/collection-women" element={<Women />} />
        <Route path="/collection-all" element={<AllItems />} />
        <Route path="/product-view/:slug" element={<ProductView />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/checkout/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/my-profile" element={<Account />} />
        <Route path="/manage-address" element={<ManageAdress />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route path="/help-and-support" element={<HelpSupport />} />
        <Route path="/manage-profile" element={<EditProfile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
      <BottomBar />
    </>
  );
}

export default App;
