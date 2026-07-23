import type { Order } from "#/components/base/store/order/columns";

// Mock data
const data: Order[] = [
  {
    id: "ORD-001",
    date: "2023-10-25",
    status: "Delivered",
    total: 120.5,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2023-11-02",
    status: "Processing",
    total: 45.0,
    items: 1,
  },
  {
    id: "ORD-003",
    date: "2023-11-10",
    status: "Cancelled",
    total: 89.99,
    items: 2,
  },
  {
    id: "ORD-004",
    date: "2023-11-15",
    status: "Delivered",
    total: 250.0,
    items: 5,
  },
  {
    id: "ORD-005",
    date: "2023-11-20",
    status: "Processing",
    total: 35.5,
    items: 1,
  },
];


export default function OrdersTable() {
     return (
        <div>

        </div>
     )
}