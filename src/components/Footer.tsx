import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Subscribe */}
          <div>
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <p className="mb-4">Subscribe</p>
            <p className="text-sm mb-4">Get 10% off your first order</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-background text-background placeholder:text-background/60 rounded-r-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-l-none border border-background border-l-0 hover:bg-background/10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm">
              <p>111 Bijoy sarani, Dhaka,</p>
              <p>DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-4">Download App</h3>
            <p className="text-xs text-background/60 mb-2">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-2 mb-4">
              <div className="bg-background p-2 rounded">
                <div className="h-16 w-16 bg-foreground"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-background px-4 py-2 rounded text-xs text-foreground">
                  Get it on Google Play
                </div>
                <div className="bg-background px-4 py-2 rounded text-xs text-foreground">
                  Download on App Store
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-background/80">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-background/80">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-background/80">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-background/80">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-6 text-center text-sm text-background/60">
          <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
