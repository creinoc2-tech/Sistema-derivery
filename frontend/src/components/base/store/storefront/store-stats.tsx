import { format } from "date-fns";
import { Calendar, CheckCircle2 } from "lucide-react";
import type { RestaurantModel } from "#/model/restaurants.model";

interface StoreStatsProps {
  restaurant: RestaurantModel;
  className?: string;
}

export function StoreStats({ restaurant, className }: StoreStatsProps) {
  const formattedDate = format(new Date(restaurant.createdAt), "MMMM yyyy");

  const statsData = [
    {
      icon: Calendar,
      label: "En Derivery desde",
      value: formattedDate,
      color: "text-purple-500",
    },
    {
      icon: CheckCircle2,
      label: "Estado",
      value: restaurant.status === "approved" ? "Verificado" : "Pendiente",
      color: "text-green-500",
    },
  ];

  return (
    <div className={className}>
      <div className="grid @2xl:grid-cols-2 grid-cols-2 gap-4">
        {statsData.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className={`rounded-full bg-muted p-2.5 ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-lg leading-none">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}