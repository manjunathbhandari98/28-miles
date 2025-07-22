import { Route, Routes } from "react-router-dom";
import "./App.css";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import BottomBar from "./components/layout/BottomBar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AboutUs from "./pages/AboutUs";
import AllItems from "./pages/AllItems";
import Home from "./pages/Home";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import Women from "./pages/Women";
function App() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/collection-men" element={<Men />} />
        <Route path="/collection-women" element={<Women />} />
        <Route path="/collection-all" element={<AllItems />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
      <BottomBar />
    </>
  );
}

export default App;
