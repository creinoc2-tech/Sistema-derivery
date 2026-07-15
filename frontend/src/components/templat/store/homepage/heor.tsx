import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Tags from '#/components/base/common/tags'
import Heading from '#/components/base/common/heading'
import CounterBox from '#/components/containers/store/counter-box'
import { toCategoryTagItems } from '#/lib/mappers/category-tags.mapper'

export default function Hero() {
  const counters = [
    { value: '1,500 +', label: 'Restaurants' },
    { value: '50 +', label: 'Cities' },
    { value: '30%', label: 'Discount Rate' },
    { value: '95%', label: 'Customer Satisfaction Rate' },
  ]
  return (
    <section className="@container container mx-auto space-y-8 px-4 pt-[60px]">
      <div className="relative rounded-2xl border border-dashed">
        <div className="relative h-[520px] overflow-hidden rounded-2xl rounded-b-none bg-black">
          {/* Fondo degradado */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,#2d3b00_0%,#000_70%)]" />

          {/* Contenido */}
          <div className="relative z-10 flex h-full items-center px-8 md:px-14 lg:px-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Comida, víveres y más
                <br />
                entregados a tu puerta.
              </h1>

              {/* Buscador */}
              <div className="mt-10 flex max-w-3xl flex-col overflow-hidden rounded-full bg-[#2d2d2d] p-1 shadow-xl md:flex-row">
                <div className="flex flex-1 items-center gap-4 px-8 py-5">
                  <MapPin size={22} className="text-lime-400" />

                  <input
                    type="text"
                    placeholder="Ingresa tu dirección de entrega..."
                    className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
                  />
                </div>

                <button className="rounded-full bg-lime-400 px-12 py-5 font-bold text-black transition hover:bg-lime-300">
                  Buscar Comida
                </button>
              </div>

              {/* Etiquetas */}
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-gray-600 bg-[#2d2d2d] px-5 py-2 text-sm font-semibold text-white">
                  ENVÍO GRATIS
                </span>

                <span className="rounded-full border border-orange-600 bg-orange-900/20 px-5 py-2 text-sm font-semibold text-orange-400">
                  NUEVOS USUARIOS -50%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid @4xl:grid-cols-2 grid-cols-1 gap-8">
          <div className="space-y-8 @4xl:p-12 @6xl:p-[60px] @7xl:p-20 p-3 pt-14  ">
             <Tags items={toCategoryTagItems()} />
            <Heading
              title="Delivery: Comida a Domicilio Rápida y Confiable"
              subtitle="Explora un mundo de comida a domicilio en Delivery, donde la comodidad se une a la variedad. Descubre los mejores restaurantes y promociones exclusivas."
            />
          </div>
          <CounterBox items={counters} />
        </div>
      </div>
    </section>
  )
}
