import AdminShoppingLayout from "@/components/shopping/layout";
import React, { useState, useEffect, useCallback } from "react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { Button } from "@/components/ui/button";
import {
  AirplayIcon,
  ArrowRight,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  HeaterIcon,
  ImagesIcon,
  Shirt,
  ShirtIcon,
  ShoppingBasketIcon,
  UmbrellaIcon,
  WashingMachineIcon,
  WatchIcon,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/productSlice";
import ShoppingProductTile from "@/components/shopping/productCard";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { addToCart, getCartItems } from "@/store/shop/cartSlice";
import ProductDetails from "@/components/shopping/ProductDetails";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachineIcon },
  { id: "puma", label: "Puma", icon: ShoppingBasketIcon },
  { id: "levi", label: "Levi's", icon: AirplayIcon },
  { id: "zara", label: "Zara", icon: ImagesIcon },
  { id: "h&m", label: "H&M", icon: HeaterIcon },
];

export default function Home() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();

  const slides = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleNavigate = useCallback(
    (getCurrentItem, section = "category") => {
      sessionStorage.removeItem("filters");
      const currentFilter = {
        [section]: [getCurrentItem.id],
      };
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      router.push("/shop/listing");
    },
    [router]
  );

  const handleGetProductDetails = useCallback(
    (getCurrentProductId) => {
      dispatch(getProductDetails(getCurrentProductId));
    },
    [dispatch]
  );

  const handleAddtoCart = useCallback(
    (getCurrentProductId) => {
      if (!user?.id) {
        toast.error("Please login to add items to cart");
        return;
      }

      dispatch(
        addToCart({
          userId: user.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getCartItems(user.id));
          toast.success("Product added to cart");
        }
      });
    },
    [dispatch, user]
  );

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const goToPrevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  const goToNextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  // Auto-advance slides
  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(goToNextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, goToNextSlide]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(
      getFilteredProducts({
        filterParams: {},
        sortparams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <AdminShoppingLayout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Carousel */}
        <div
          className="relative w-full h-[600px] overflow-hidden group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide}
                alt={`Promotional banner ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {index === currentSlide && (
                <div className="absolute bottom-10 left-10">
                  <Button size="lg" variant="default">
                    Shop Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-5 h-5 text-primary" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-5 h-5 text-primary" />
          </Button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((categoryItem) => (
                <Card
                  key={categoryItem.id}
                  className="cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleNavigate(categoryItem, "category")}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold text-center">
                      {categoryItem.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Brand
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {brandsWithIcon.map((brandItem) => (
                <Card
                  key={brandItem.id}
                  className="cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleNavigate(brandItem, "brand")}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold text-center">
                      {brandItem.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {productList?.slice(0, 8).map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))}
            </div>
          </div>
        </section>
        <ProductDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </AdminShoppingLayout>
  );
}
