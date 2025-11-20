import { Heart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
}

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
  isNew,
}: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-none bg-secondary">
      {/* Image container */}
      <div className="relative aspect-square bg-secondary p-8 flex items-center justify-center">
        {discount && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">
            -{discount}%
          </div>
        )}
        {isNew && (
          <div className="absolute top-3 left-3 bg-success text-white px-3 py-1 rounded text-xs font-medium">
            NEW
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background hover:bg-background/90"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background hover:bg-background/90"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />

        <Button className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background hover:bg-foreground/90 rounded-none">
          Add To Cart
        </Button>
      </div>

      {/* Product info */}
      <div className="p-4 bg-background">
        <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary font-medium">${price}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-warning text-warning"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">({reviews})</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
