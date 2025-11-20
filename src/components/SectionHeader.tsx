import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  showNavigation?: boolean;
  action?: React.ReactNode;
}

const SectionHeader = ({
  subtitle,
  title,
  showNavigation,
  action,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {subtitle && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-10 bg-primary rounded" />
            <span className="text-primary font-semibold">{subtitle}</span>
          </div>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      
      {showNavigation && (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionHeader;
