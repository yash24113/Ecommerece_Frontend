import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const CategoryCard = ({ icon: Icon, label, active }: CategoryCardProps) => {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className={`flex flex-col items-center justify-center h-32 w-full gap-3 ${
        active ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
      }`}
    >
      <Icon className="h-8 w-8" />
      <span className="text-sm">{label}</span>
    </Button>
  );
};

export default CategoryCard;
