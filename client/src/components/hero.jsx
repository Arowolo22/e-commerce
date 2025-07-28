import React from "react";
import heroImage from "../assets/hero-Image.jpg";

const Hero = () => (
  <section
    className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
    style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
        Welcome to Vogue Vault
      </h1>
      <a
        href="#"
        className="inline-block bg-white text-black font-semibold px-8 py-3 mb-3 rounded shadow hover:bg-blue-100 transition"
      >
        Shop Now
      </a>
    </div>
  </section>
);

export default Hero;
