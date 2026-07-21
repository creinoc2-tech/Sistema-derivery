import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RestaurantModel } from "#/model/restaurants.model";

interface StoreCardProps {
  store: RestaurantModel;
  className?: string;
}

const statusConfig = {
  approved: {
    label: "Verificado",
    icon: CheckCircle2,
    className: "border-blue-500/20 bg-blue-500/90 text-white",
  },
  pending: {
    label: "Pendiente",
    icon: Clock,
    className: "border-yellow-500/20 bg-yellow-500/90 text-white",
  },
  rejected: {
    label: "Rechazado",
    icon: XCircle,
    className: "border-red-500/20 bg-red-500/90 text-white",
  },
};

export default function StoreCard({ store, className }: StoreCardProps) {
  const status = statusConfig[store.status];
  const StatusIcon = status.icon;

  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden bg-card py-0 transition-all hover:shadow-primary/5 hover:shadow-xl",
        className
      )}
    >
      {/* Banner / Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {store.imageUrl ? (
          <img
            src={store.imageUrl}
            alt={`${store.name} imagen`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Sin imagen</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Status Badge */}
        <Badge
          className={cn(
            "absolute top-4 right-4 gap-1 backdrop-blur-sm",
            status.className
          )}
        >
          <StatusIcon className="size-3" />
          {status.label}
        </Badge>
      </div>

      <CardContent className="space-y-5 p-6">
        {/* Logo y nombre */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 border-2 border-border shadow-md ring-2 ring-background">
            <AvatarImage src={store.imageUrl} alt={store.name} />
            <AvatarFallback className="bg-primary/10 font-bold text-lg text-primary">
              {store.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-2">
            <Link
              to="/store/$slug"
              params={{ slug: store.slug }}
              className="line-clamp-1 block font-bold text-xl leading-tight transition-colors hover:text-primary"
            >
              {store.name}
            </Link>
            <span className="text-muted-foreground text-xs">
              Desde {new Date(store.createdAt).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>

        {/* Descripción */}
        {store.description && (
          <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
            {store.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-muted border-t pt-5">
          <span className="text-muted-foreground text-xs truncate">
            ID: {store.id}
          </span>
          <Button size="sm" className="shrink-0" asChild>
            <Link to="/store/$slug" params={{ slug: store.slug }}>
              Ver restaurante
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}