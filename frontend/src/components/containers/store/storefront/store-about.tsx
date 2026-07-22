import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RestaurantModel } from "#/model/restaurants.model";

interface StoreAboutProps {
  store: RestaurantModel;
  className?: string;
}

export function StoreAbout({ store, className }: StoreAboutProps) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Acerca de {store.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="mb-2 font-semibold">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {store.description ?? "Este restaurante todavía no agregó una descripción."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}