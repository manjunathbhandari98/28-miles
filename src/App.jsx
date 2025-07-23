import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomBar from "./components/layout/BottomBar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AboutUs from "./pages/AboutUs";
import AllItems from "./pages/AllItems";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import ProductView from "./pages/ProductView";
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
      </Routes>
      <Footer />
      <BottomBar />
    </>
  );
}

export default App;
