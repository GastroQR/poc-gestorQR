export interface Table {
  id: number;
  status: 'free' | 'occupied' | 'waiting-payment' | 'paid';
  orders: Order[];
  needsWaiter: boolean;
}

export interface Order {
  id: number;
  tableId: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  timestamp: Date;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}