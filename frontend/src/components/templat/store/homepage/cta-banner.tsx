import CtaContainer from "#/components/containers/store/cta-container";
import Section from "@/components/base/common/section";
import BallCircleIcon from "@/components/ui/icons/ball-circle";

export default function CtaBanner() {
  return (
    <Section
      title="Tu ciudad, en tus manos."
      description="Descarga la app y obtén descuentos exclusivos, seguimiento en tiempo real y soporte 24/7. El futuro del delivery ya está aquí."
      containerClassName="bg-primary-70 border-transparent"
      rightAsset={
        <BallCircleIcon className="@5xl:h-[316px] @6xl:h-[386px] h-24 @5xl:w-[301px] @6xl:w-[506px] opacity-30" />
      }
      rightAssetClassName="@5xl:translate-x-4 @6xl:translate-x-10"
      rightAction={<CtaContainer inline />}
      headingClassName="text-background"
      descriptionClassName="text-dark-12  text-lg "
    >
      <div />
    </Section>
  );
}