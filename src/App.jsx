import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsShowcase from "./components/ProductsShowcase";
import HoneyBenefits from "./components/HoneyBenefits";
import TourVivencial from "./components/TourVivencial";
import Guardianes from "./components/Guardianes";
import NuestraHistoria from "./components/NuestraHistoria";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BookingPage from "./components/BookingPage";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <ProductsShowcase />
      <HoneyBenefits />
      <TourVivencial />
      <Guardianes />
      <NuestraHistoria />
      <Newsletter />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="font-body-md overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserva" element={<BookingPage />} />
      </Routes>
    </div>
  );
}

export default App;
