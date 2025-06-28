import React, { useState } from "react";
import Products from "../components/products";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Hero from "../components/hero";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Hero />
      <Products selectedCategory={selectedCategory} />
      <Footer />
    </>
  );
};

export default Home;
