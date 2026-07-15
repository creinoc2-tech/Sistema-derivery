import { cn } from "@/lib/utils";

interface FeatureGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  className?: string;
}

export default function FeatureGridItem({
  title,
  description,
  icon,
  image,
  className,
}: FeatureGridItemProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl aspect-square @4xl:aspect-[4/3.7] ",
        className,
      )}
    >
      {/* Imagen de fondo */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Ícono circular */}
      <div className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-black/50 text-primary backdrop-blur-sm">
        {icon}
      </div>

      {/* Título + descripción */}
      <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4">
        <h4 className="text-base font-semibold text-white @4xl:text-lg">
          {title}
        </h4>
        <p className="text-xs text-white/80 @4xl:text-sm">{description}</p>
      </div>
    </div>
  );
}