import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CategoryTagItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface TagsProps {
  items: CategoryTagItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export default function Tags({ items, activeId, onSelect, className }: TagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-12 items-center", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <span
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-muted/70",
              )}
            >
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}