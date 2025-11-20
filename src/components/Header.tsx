import { Search, Heart, ShoppingCart, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top banner */}
      <div className="bg-foreground text-background py-2 text-center text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <a href="#" className="font-semibold underline ml-2">
          ShopNow
        </a>
      </div>

      {/* Main header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="text-2xl font-bold">Exclusive</div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="/login" className="hover:underline">
                Sign Up
              </a>
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center bg-secondary rounded-md px-3 py-2">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-64"
                />
                <Search className="h-5 w-5 text-foreground" />
              </div>

              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-4">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Sign Up
              </a>
              <div className="flex items-center bg-secondary rounded-md px-3 py-2">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Search className="h-5 w-5 text-foreground" />
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
