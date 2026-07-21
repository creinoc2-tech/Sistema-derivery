import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  isAvailable: boolean;
  className?: string;
}

export default function ProductPrice({
  price,
  isAvailable,
  className,
}: ProductPriceProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline gap-3">
        <span className="font-bold text-3xl text-foreground">
          ${price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant={isAvailable ? "outline" : "destructive"}
          className={cn(isAvailable && "border-green-500 text-green-600")}
        >
          {isAvailable ? "Disponible" : "No disponible"}
        </Badge>
      </div>
    </div>
  );
}