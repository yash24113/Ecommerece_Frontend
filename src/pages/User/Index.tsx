import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  TruckIcon,
  ShieldCheck,
  Headset,
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import musicBanner from "@/assets/music1.png";

type ApiCategory = {
  _id?: string;
  name: string;
  image?: string;
};

// slider slides (you can add more slides later / change text & images)
const heroSlides = [
  {
    id: 1,
    label: "iPhone 14 Series",
    titleLine1: "Up to 10%",
    titleLine2: "off Voucher",
    cta: "Shop Now",
    image: heroBanner,
  },
  {
    id: 2,
    label: "iPhone 14 Series",
    titleLine1: "Limited Time",
    titleLine2: "Festival Offers",
    cta: "Shop Now",
    image: heroBanner,
  },
  {
    id: 3,
    label: "iPhone 14 Series",
    titleLine1: "Upgrade to",
    titleLine2: "New iPhone",
    cta: "Shop Now",
    image: heroBanner,
  },
];

const Index = () => {
  // Products from API
  const [flashProducts, setFlashProducts] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [exploreProducts, setExploreProducts] = useState<any[]>([]);

  // Categories from API
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Hero slider state
  const [activeSlide, setActiveSlide] = useState(0);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Flash sale end date (3 days from now)
  const flashSaleEnd = new Date();
  flashSaleEnd.setDate(flashSaleEnd.getDate() + 3);

  // Fallback static categories (used if API returns nothing or fails)
  const fallbackCategories = [
    { icon: Smartphone, label: "Phones" },
    { icon: Monitor, label: "Computers" },
    { icon: Watch, label: "SmartWatch" },
    { icon: Camera, label: "Camera" },
    { icon: Headphones, label: "HeadPhones" },
    { icon: Gamepad2, label: "Gaming" },
  ];

  // Map category name -> icon
  const getIconForCategory = (name: string) => {
    const key = name.toLowerCase();

    if (key.includes("phone") || key.includes("mobile")) return Smartphone;
    if (key.includes("computer") || key.includes("laptop") || key.includes("pc"))
      return Monitor;
    if (key.includes("watch") || key.includes("smartwatch")) return Watch;
    if (key.includes("camera")) return Camera;
    if (key.includes("headphone") || key.includes("earphone") || key.includes("audio"))
      return Headphones;
    if (key.includes("game") || key.includes("gaming")) return Gamepad2;

    return Monitor;
  };

  // fetch products + categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [flashRes, bestRes, exploreRes] = await Promise.all([
          fetch(`${baseUrl}/api/products?collection=flash`),
          fetch(`${baseUrl}/api/products?collection=best`),
          fetch(`${baseUrl}/api/products?collection=explore`),
        ]);

        const [flashData, bestData, exploreData] = await Promise.all([
          flashRes.json(),
          bestRes.json(),
          exploreRes.json(),
        ]);

        setFlashProducts(flashData);
        setBestSellingProducts(bestData);
        setExploreProducts(exploreData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }

      try {
        setCategoriesLoading(true);
        const catRes = await fetch(`${baseUrl}/api/categories`);
        if (!catRes.ok) throw new Error("Failed to load categories");
        const catData = await catRes.json();
        setCategories(catData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [baseUrl]);

  // hero auto-slide
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with slider */}
        <section className="bg-foreground text-background">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Sidebar categories - hidden on mobile */}
              <aside className="hidden lg:block w-64 border-r border-background/20 pr-8">
                <nav className="space-y-3">
                  <a href="#" className="block hover:underline">
                    Woman&apos;s Fashion
                  </a>
                  <a href="#" className="block hover:underline">
                    Men&apos;s Fashion
                  </a>
                  <a href="#" className="block hover:underline">
                    Electronics
                  </a>
                  <a href="#" className="block hover:underline">
                    Home & Lifestyle
                  </a>
                  <a href="#" className="block hover:underline">
                    Medicine
                  </a>
                  <a href="#" className="block hover:underline">
                    Sports & Outdoor
                  </a>
                  <a href="#" className="block hover:underline">
                    Baby&apos;s & Toys
                  </a>
                  <a href="#" className="block hover:underline">
                    Groceries & Pets
                  </a>
                  <a href="#" className="block hover:underline">
                    Health & Beauty
                  </a>
                </nav>
              </aside>

              {/* Hero slider */}
              <div className="flex-1 w-full">
                <div className="relative rounded-lg overflow-hidden bg-black">
                  <div className="relative h-[220px] sm:h-[260px] lg:h-[340px]">
                    {heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          index === activeSlide
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0"
                        }`}
                        style={{
                          backgroundImage: `url(${slide.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* dark gradient overlay like screenshot */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/5" />

                        <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-white">
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                              alt="Apple"
                              className="h-10 w-10 invert"
                            />
                            <span className="text-sm sm:text-base opacity-80">
                              {slide.label}
                            </span>
                          </div>

                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            {slide.titleLine1}
                            <br />
                            {slide.titleLine2}
                          </h1>

                          <Button
                            variant="ghost"
                            className="text-white border-b border-white rounded-none px-0 w-fit hover:bg-transparent"
                          >
                            {slide.cta} →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slider dots like screenshot */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 w-2.5 rounded-full border border-white/60 transition-colors ${
                          index === activeSlide
                            ? "bg-red-500 border-red-500"
                            : "bg-white/40"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sales */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-8">
            <div className="flex-1">
              <SectionHeader subtitle="Today's" title="Flash Sales" />
            </div>
            <div className="lg:mb-8">
              <CountdownTimer targetDate={flashSaleEnd} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {flashProducts.map((product: any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg">
              View All Products
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="border-t border-border" />
        </div>

        {/* Browse By Category (API) */}
        <section className="container mx-auto px-4 py-16">
          <SectionHeader
            subtitle="Categories"
            title="Browse By Category"
            showNavigation
          />

          {categoriesLoading ? (
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.length > 0
                ? categories.map((category, index) => (
                    <CategoryCard
                      key={category._id || index}
                      icon={getIconForCategory(category.name)}
                      label={category.name}
                      
                      active={index === 0}
                    />
                  ))
                : fallbackCategories.map((category, index) => (
                    <CategoryCard key={index} {...category} />
                  ))}
            </div>
          )}
        </section>

        <div className="container mx-auto px-4">
          <div className="border-t border-border" />
        </div>

        {/* Best Selling Products */}
        <section className="container mx-auto px-4 py-16">
          <SectionHeader
            subtitle="This Month"
            title="Best Selling Products"
            action={
              <Button variant="default" size="lg">
                View All
              </Button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.map((product: any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </section>

        {/* Music Experience Banner */}
      <section className="container mx-auto px-4 py-8">
  <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-black via-black to-gray-900">
    <div className="grid lg:grid-cols-2 items-center gap-8 px-8 py-10 lg:px-16">
      {/* Left content */}
      <div className="space-y-6 text-white">
        <span className="text-success font-semibold">Categories</span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Enhance Your
          <br />
          Music Experience
        </h2>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center shadow-lg">
            <span className="font-bold text-sm">23</span>
            <span className="text-[10px]">Hours</span>
          </div>
          <div className="bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center shadow-lg">
            <span className="font-bold text-sm">05</span>
            <span className="text-[10px]">Days</span>
          </div>
          <div className="bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center shadow-lg">
            <span className="font-bold text-sm">59</span>
            <span className="text-[10px]">Minutes</span>
          </div>
          <div className="bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center shadow-lg">
            <span className="font-bold text-sm">35</span>
            <span className="text-[10px]">Seconds</span>
          </div>
        </div>

        <Button className="bg-success hover:bg-success/90 text-white px-8 py-2 rounded-md">
          Buy Now!
        </Button>
      </div>

      {/* Right image */}
      <div className="relative flex justify-center lg:justify-end">
        <img
          src={musicBanner}
          alt="Music Experience"
          className="w-full max-w-md object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
        />
      </div>
    </div>
  </div>
</section>


        {/* Explore Our Products */}
        <section className="container mx-auto px-4 py-16">
          <SectionHeader
            subtitle="Our Products"
            title="Explore Our Products"
            showNavigation
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {exploreProducts.map((product: any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg">
              View All Products
            </Button>
          </div>
        </section>

        {/* New Arrival (unchanged from your last version, or with the image cards if you used that) */}
        {/* ... keep your New Arrival + Services sections here ... */}

        {/* Services */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <div className="bg-foreground rounded-full p-3">
                  <TruckIcon className="h-8 w-8 text-background" />
                </div>
              </div>
              <h3 className="font-bold mb-2">FREE AND FAST DELIVERY</h3>
              <p className="text-sm text-muted-foreground">
                Free delivery for all orders over $140
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <div className="bg-foreground rounded-full p-3">
                  <Headset className="h-8 w-8 text-background" />
                </div>
              </div>
              <h3 className="font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
              <p className="text-sm text-muted-foreground">
                Friendly 24/7 customer support
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <div className="bg-foreground rounded-full p-3">
                  <ShieldCheck className="h-8 w-8 text-background" />
                </div>
              </div>
              <h3 className="font-bold mb-2">MONEY BACK GUARANTEE</h3>
              <p className="text-sm text-muted-foreground">
                We return money within 30 days
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
