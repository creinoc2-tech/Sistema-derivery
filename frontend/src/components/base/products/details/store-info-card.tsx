import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RestaurantModel } from "#/model/restaurants.model";

interface RestaurantInfoCardProps {
  restaurant: RestaurantModel;
  className?: string;
}

export default function RestaurantInfoCard({
  restaurant,
  className,
}: RestaurantInfoCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-muted/30 py-0", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-background">
            <AvatarFallback className="bg-primary/10 text-primary">
              {restaurant.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <Link
              to="/store/$slug"
              params={{ slug: restaurant.slug }}
              className="font-semibold hover:underline"
            >
              {restaurant.name}
            </Link>

            {restaurant.description && (
              <p className="text-muted-foreground text-sm line-clamp-1">
                {restaurant.description}
              </p>
            )}
          </div>

          <Button variant="ghost" size="default" asChild>
            <Link to="/store/$slug" params={{ slug: restaurant.slug }}>
              Ver Restaurante
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}