
// @ts-ignore: side-effect import of CSS without type declarations
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Pricing from "./pages/Pricing.tsx";
import SmallBusiness from "./pages/SmallBusiness.tsx";
import Ecommerce from "./pages/Ecommerce.tsx";
import Footer from "./components/Footer.tsx";
import About from "./pages/About.tsx";

function App() {
  return (
    <div className="text-secondary">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/small-business" element={<SmallBusiness />} />
          <Route path="/E-commerce" element={<Ecommerce />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>

        <Footer />
    
    </div>
  );
}

export default App;
