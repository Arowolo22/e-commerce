import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return null;
};

const App = () => {
<<<<<<< HEAD
   return (
      <>
         <Toaster />
         <Router>
            <ScrollToTop />
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/home" element={<Home />} />
               <Route path="/" element={<Navigate to="/login" replace />} />

               {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
         </Router>
      </>
   );
=======
  return (
    <>
      <Toaster />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </Router>
    </>
  );
>>>>>>> 44dedf7513db678bceaf387c9da5437d8cc17ba6
};

export default App;
