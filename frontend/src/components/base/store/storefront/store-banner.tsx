import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RestaurantModel } from "#/model/restaurants.model";
import { useStoreFront } from "#/lib/helper/store";

interface StoreBannerProps {
  store: RestaurantModel;
  className?: string;
}

export default function StoreBanner({ store, className }: StoreBannerProps) {
  const { isFollowing, toggleFollow } = useStoreFront();
  const following = isFollowing(store.id);

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Banner Image */}
      <div className="relative @2xl:h-64 h-48 overflow-hidden bg-muted">
        <img
          src={store.imageUrl ?? "https://placehold.co/1200x400"}
          alt={`${store.name} banner`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Store Info Overlay */}
      <div className="absolute right-0 bottom-0 left-0 p-6">
        <div className="flex @2xl:flex-row flex-col items-start @2xl:items-end gap-4">
          <Avatar className="-mb-8 @2xl:h-32 h-24 @2xl:w-32 w-24 border-4 border-background shadow-xl">
            <AvatarImage src={store.imageUrl} alt={store.name} />
            <AvatarFallback className="bg-primary/10 font-bold text-2xl text-primary">
              {store.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-white">
            <h1 className="font-bold @2xl:text-3xl text-2xl">{store.name}</h1>
            {store.description && (
              <p className="text-sm text-white/80">{store.description}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant={following ? "secondary" : "default"}
              size="lg"
              onClick={() => toggleFollow(store.id)}
              className="gap-2"
            >
              <Heart className={cn("size-4", following && "fill-current")} />
              {following ? "Siguiendo" : "Seguir"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}