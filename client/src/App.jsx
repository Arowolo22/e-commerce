import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import MobileDebug from "./components/MobileDebug";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">App is Loading!</h1>
            <p className="text-gray-600">If you can see this, the app is working.</p>
          </div>
        </div>
        <MobileDebug />
      </Router>
    </>
  );
};

export default App;
