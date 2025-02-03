import { create } from 'zustand';
import { Table, Order, MenuItem, OrderItem } from '../types';

interface CartItem extends OrderItem {
  menuItemId: number;
}

interface RestaurantState {
  tables: Table[];
  menu: MenuItem[];
  orders: Order[];
  cart: { [tableId: string]: CartItem[] };
  setTableStatus: (tableId: number, status: Table['status']) => void;
  toggleWaiter: (tableId: number) => void;
  addToCart: (tableId: string, menuItem: MenuItem, quantity: number) => void;
  removeFromCart: (tableId: string, menuItemId: number) => void;
  submitOrder: (tableId: string) => void;
  processPayment: (tableId: number) => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  tables: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    status: 'free',
    orders: [],
    needsWaiter: false,
  })),
  menu: [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, and cheese',
      price: 12.99,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, and basil',
      price: 14.99,
      category: 'Main',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, parmesan, and Caesar dressing',
      price: 9.99,
      category: 'Starter',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500',
    },
  ],
  orders: [],
  cart: {},

  setTableStatus: (tableId, status) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      ),
    })),

  toggleWaiter: (tableId) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, needsWaiter: !table.needsWaiter } : table
      ),
    })),

  addToCart: (tableId, menuItem, quantity) =>
    set((state) => {
      const tableCart = state.cart[tableId] || [];
      const existingItem = tableCart.find(item => item.menuItemId === menuItem.id);

      if (existingItem) {
        return {
          cart: {
            ...state.cart,
            [tableId]: tableCart.map(item =>
              item.menuItemId === menuItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          },
        };
      }

      return {
        cart: {
          ...state.cart,
          [tableId]: [
            ...tableCart,
            {
              id: Date.now(),
              menuItemId: menuItem.id,
              name: menuItem.name,
              quantity,
              price: menuItem.price,
            },
          ],
        },
      };
    }),

  removeFromCart: (tableId, menuItemId) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [tableId]: (state.cart[tableId] || []).filter(
          (item) => item.menuItemId !== menuItemId
        ),
      },
    })),

  submitOrder: (tableId) =>
    set((state) => {
      const cartItems = state.cart[tableId] || [];
      if (cartItems.length === 0) return state;

      const newOrder = {
        id: Date.now(),
        tableId: parseInt(tableId),
        items: cartItems,
        status: 'pending' as const,
        timestamp: new Date(),
      };

      return {
        orders: [...state.orders, newOrder],
        cart: {
          ...state.cart,
          [tableId]: [],
        },
        tables: state.tables.map((table) =>
          table.id === parseInt(tableId)
            ? { ...table, status: 'occupied' as const }
            : table
        ),
      };
    }),

  processPayment: (tableId) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status: 'paid' } : table
      ),
    })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
}));