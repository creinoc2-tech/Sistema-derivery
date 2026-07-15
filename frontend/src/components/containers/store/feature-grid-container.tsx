import FeatureGridItem from "#/components/base/common/feature-grid-item";
import { features } from "#/components/ui/data/feature";

export default function FeatureGridContainer() {
  return (
    <div className="grid grid-cols-1 gap-4 @4xl:grid-cols-2 @6xl:grid-cols-3 px-10 py-4">
      {features.map((feature) => (
        <FeatureGridItem
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={<feature.icon className="size-6" />}
          image={feature.image}
        />
      ))}
    </div>
  );
}