import React from "react";
import Products from "../components/products";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Hero from "../components/hero";
import { useParams } from "react-router-dom";

const Home = () => {
  const { category } = useParams();

  return (
    <>
      <Navbar selectedCategory={category || "all"} />
      <Hero />
      <Products selectedCategory={category || "all"} />
      <Footer />
    </>
  );
};

export default Home;
