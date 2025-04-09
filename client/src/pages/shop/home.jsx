import AdminShoppingLayout from "@/components/shopping/layout";
import React from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

export default function Home() {
  const slides = [banner1, banner2, banner3];
  return (
    <AdminShoppingLayout>
      <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <img
              src={slide}
              key={index}
              alt="banner"
              className={`absolute top-0 left-0 w-full  h-full object-cover transition-opacity duration-1000`}
            />
          ))}
        </div>
      </div>
    </AdminShoppingLayout>
  );
}
