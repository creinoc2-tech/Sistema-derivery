// shipping-info-section.tsx
import { Clock, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import ShippingInfoItem from './shipping-info-item'

interface ShippingInfoSectionProps {
  className?: string
}

export default function ShippingInfoSection({
  className,
}: ShippingInfoSectionProps) {
  return (
    <div className={cn('space-y-4 border-t pt-4', className)}>
      <ShippingInfoItem
        icon={Clock}
        label="Tiempo de entrega"
        value="Estimado: 30-45 minutos"
      />

      <ShippingInfoItem
        icon={Info}
        label="Política de pedidos"
        value="Los pedidos se preparan al momento de confirmarse"
      />
    </div>
  )
}
