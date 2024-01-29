interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  order: OrderItem[];
}
