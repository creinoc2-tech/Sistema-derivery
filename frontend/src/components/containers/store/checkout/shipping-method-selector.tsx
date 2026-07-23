import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCartStores } from '#/lib/store/store/cart/cart.store'

export default function ShippingMethodSelector() {
  const { deliveryFee, setDeliveryFee } = useCartStores()

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">Shipping Method</h2>

      <RadioGroup
        value={deliveryFee === 9 ? 'express' : 'standard'}
        onValueChange={(value) => setDeliveryFee(value === 'express' ? 9 : 5)}
        className="grid gap-4"
      >
        <div className="relative flex items-center space-x-3 rounded-lg border border-input p-4 transition-colors hover:border-primary/50 has-data-state-checked:border-primary">
          <RadioGroupItem value="express" id="express" />
          <Label htmlFor="express" className='flex flex-1 cursor-pointer items-center
           justify-between
          '>

            <div className="space-y-1">
                <p className="font-medium text-sm">Express Shipping</p>
                <p className="text-muted-foreground text-xs">
                  1-3 Days
                </p>
              </div>
              <p className="font-semibold text-lg">
                $9
              </p>
            
          </Label>
        </div>


         <div className="relative flex items-center space-x-3 rounded-lg border border-input p-4 transition-colors hover:border-primary/50 has-data-state-checked:border-primary">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard" className='flex flex-1 cursor-pointer items-center
           justify-between
          '>

            <div className="space-y-1">
                <p className="font-medium text-sm">Standard Shipping</p>
                <p className="text-muted-foreground text-xs">
                  3-5 Days
                </p>
              </div>
              <p className="font-semibold text-lg">
                $5
              </p>
            
          </Label>
        </div>
      </RadioGroup>


      
    </div>
  )
}
