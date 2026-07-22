import type { StoreReview } from '#/types/store-types'
import { Star, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '#/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StoreReviewsProps {
  shopId: string
  rating: number
  reviewCount: number
}

// Mock reviews data
const mockReviews: StoreReview[] = [
  {
    id: 'rev-1',
    storeId: 'store-101',
    userName: 'Alex Morgan',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    rating: 5,
    comment:
      'Excelente servicio y productos de altísima calidad. El envío llegó antes de lo esperado.',
    date: '2026-07-01',
    helpful: 12,
  },
  {
    id: 'rev-2',
    storeId: 'store-101',
    userName: 'Sofia Rodríguez',
    rating: 4,
    comment:
      'Muy buena atención en la tienda, el producto cumple con todo lo especificado.',
    date: '2026-06-28',
    helpful: 8,
  },
  {
    id: 'rev-3',
    storeId: 'store-101',
    userName: 'Carlos Mendoza',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    rating: 5,
    comment:
      'Totalmente recomendado, una de las mejores experiencias de compra online que he tenido.',
    date: '2026-06-15',
    helpful: 24,
  },
  {
    id: 'rev-4',
    storeId: 'store-101',
    userName: 'Mariana Silva',
    rating: 3,
    comment:
      'El artículo es bueno, pero el empaque llegó un poco dañado y la entrega se retrasó un par de días.',
    date: '2026-05-20',
    helpful: 3,
  },
  {
    id: 'rev-5',
    storeId: 'store-101',
    userName: 'Lucas Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    rating: 2,
    comment:
      'No cumplió del todo mis expectativas. El material se siente un poco frágil para el precio que tiene.',
    date: '2026-05-11',
    helpful: 5,
  },
]

export function StoreReviews({
  shopId,
  rating,
  reviewCount,
}: StoreReviewsProps) {
  const [reviews] = useState<StoreReview[]>(mockReviews)

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { star, count, percentage }
  })
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid @2xl:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="flex flex-col items-center justify-center space-y-2 border-muted @2xl:border-r p-6">
              <div className="font-bold text-5xl">{rating.toFixed(1)}</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Based on 10 reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex w-12 items-center gap-1">
                    <span className="text-sm">{star}</span>
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="w-12 text-muted-foreground text-sm">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

       {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Customer Reviews</h3>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={review.userAvatar ?? ""}
                        alt={review.userName}
                      />
                      <AvatarFallback>
                        {review.userName
                          .split(" ")
                          .map((n : any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Review Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`size-3.5 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-muted-foreground text-xs">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {review.comment}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                          
                        >
                          <ThumbsUp className="size-3.5" />
                          <span className="text-xs">
                            Helpful ({review.helpfulCount})
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">No reviews yet</h3>
            <p className="text-muted-foreground text-sm">
              This store hasn't received any reviews yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
