import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

import { useLocationStore } from '#/lib/store/store/location/location'
import { useState, useEffect } from 'react'
import L from 'leaflet'
import { LocateFixed } from 'lucide-react'

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

export default function LocationSheet() {
  const { isOpen, setIsOpen, addItem } = useLocationStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState<boolean>(false)

  const [addressData, setAddressData] = useState<{
    street: string
    city: string
  } | null>(null)

  const [position, setPosition] = useState<[number, number] | null>(null)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setPosition([latitude, longitude])
        },
        (err) => {
          console.error('Error getting location', err)
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      )
    }
  }, [isOpen])

  useEffect(() => {
  const fetchAddress = async () => {
    try {
      if (!position) return
      const result = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
      )
      const address = result.data.address || {}

      setAddressData({
        street: address.road || result.data.display_name || 'Dirección sin nombre',
        city: address.city || address.county || address.state || '',
      })
    } catch (error) {
      console.error('Error fetching address info: ', error)
    }
  }
  fetchAddress()

  
}, [position])
  const DraggableMarker: React.FC<{ position: [number, number] }> = ({
    position,
  }) => {
    const map = useMap()
    useEffect(() => {
      map.setView(position, 15, { animate: true })
    }, [map, position])

    return (
      <Marker
        position={position}
        icon={markerIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker
            const { lat, lng } = marker.getLatLng()
            setPosition([lat, lng])
          },
        }}
      ></Marker>
    )
  }

  const handleCurrentLocation = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setPosition([latitude, longitude])
          setSearchQuery('')
        },
        (err) => {
          console.error('Error getting location', err)
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      )
    }
  }

  const handleSearchQuery = async () => {
    setSearchLocation(true)
    const provider = new OpenStreetMapProvider()
    const results = await provider.search({ query: searchQuery })
    if (results && results.length > 0) {
      setSearchLocation(false)
      setPosition([results[0].y, results[0].x])
      const address = (results[0].raw as any).address || {}
      
    }
  }

  const handleConfirmLocation = () => {
    if (!position || !addressData) return

    addItem({
      street: addressData.street,
      city: addressData.city,
      latitude: position[0],
      longitude: position[1],
      isDefault: true,
      createdAt: new Date().toISOString(),
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Location</DialogTitle>
          <DialogDescription>
            Set your location to find nearby stores.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 ">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search city or area..."
            className="flex-1 border rounded-lg px-3 py-4
            text-sm focus:ring-2 focus:ring-green-500 outline-none"
            style={{ color: 'rgba(130, 130, 130, 1)' }}
          />
          <Button
            onClick={handleSearchQuery}
            className="bg-green-600 text-white  px-5 py-4 rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            Search
          </Button>
        </div>
        <div
          style={{ height: '330px', width: '630px' }}
          className="relative mt-6  rounded-xl overflow-hidden border border-gray-200 shadow-inner"
        >
          {position && (
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: '430px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker position={position} />
            </MapContainer>
          )}

          <Button
            className="absolute bottom-4 right-4 bg-green-600
                             text-white shadow-lg rounded-full p-3 hover:bg-green-700 
                             transition-all flex items-center justify-center z-999"
            onClick={handleCurrentLocation}
          >
            <LocateFixed size={20} />
          </Button>
        </div>

        {addressData && (
          <p className="mt-3 text-sm text-muted-foreground">
            📍 {addressData.street}
            {addressData.city ? `, ${addressData.city}` : ''}
          </p>
        )}

        <Button
          onClick={handleConfirmLocation}
          disabled={!position || !addressData}
          className="mt-3 w-full bg-green-600 text-white py-5 rounded-lg hover:bg-green-700 transition-all font-medium disabled:opacity-50"
        >
          Confirmar ubicación
        </Button>
      </DialogContent>
    </Dialog>
  )
}
