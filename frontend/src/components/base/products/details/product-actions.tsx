import { GitCompare, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleWishlist: () => void;
  onToggleCompare: () => void;
  isWishlisted?: boolean;
  isCompareListed?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ProductActions({
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onToggleCompare,
  isWishlisted,
  isCompareListed,
  isLoading,
  disabled,
  className,
}: ProductActionsProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className=" min-h-12  flex-1 gap-2"
          onClick={onAddToCart}
         
        >
          <ShoppingCart className="h-5 w-5" />
          Add to cart
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className=" min-h-12  flex-1"
          onClick={onBuyNow}
         >
          Buy Now
        </Button>
      </div>

      <div className="flex w-full gap-3 ">
        <Button
          variant="outline"
          size="default"
          className={cn(
            "flex-1 gap-2",
            isCompareListed && "border-primary bg-primary/5 text-primary"
          )}
          onClick={onToggleCompare}
        >
          <GitCompare className="h-4 w-4" />
          Compare
        </Button>
        <Button
          variant="outline"
          size="default"
          className={cn(
            "flex-1 gap-2",
            isWishlisted &&
              "border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
          )}
          onClick={onToggleWishlist}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
          Wishlist
        </Button>
      </div>
    </div>
  );
}
