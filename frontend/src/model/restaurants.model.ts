export interface RestaurantModel {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  stripeAccountId?: string;
  createdAt: string;

}