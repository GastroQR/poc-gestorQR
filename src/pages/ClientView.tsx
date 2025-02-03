import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import { Menu, Bell, CreditCard } from 'lucide-react';

interface ClientViewProps {
  tableId?: string;
}

function ClientView({ tableId: propTableId }: ClientViewProps) {
  const navigate = useNavigate();
  const { toggleWaiter, processPayment, cart, orders } = useRestaurantStore();
  const tableId = propTableId || "1";

  const tableOrders = orders.filter(
    order => order.tableId === parseInt(tableId) && order.status === 'pending'
  );
  
  const orderTotal = tableOrders.reduce((total, order) => 
    total + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), 0
  );

  const handleCallWaiter = () => {
    toggleWaiter(parseInt(tableId));
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      processPayment(parseInt(tableId));
      alert('Payment processed successfully!');
      // Update all pending orders for this table to 'delivered'
      tableOrders.forEach(order => {
        useRestaurantStore.getState().updateOrderStatus(order.id, 'delivered');
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Table {tableId}</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate(window.location.pathname.includes('/demo') ? '/demo/menu' : `/table/${tableId}/menu`)}
            className="flex items-center justify-center gap-3 bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Menu size={24} />
            <span className="text-xl">Order Food</span>
          </button>
          
          <button
            onClick={handleCallWaiter}
            className="flex items-center justify-center gap-3 bg-yellow-500 text-white p-6 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Bell size={24} />
            <span className="text-xl">Call Waiter</span>
          </button>
          
          {orderTotal > 0 && (
            <button
              onClick={handlePayment}
              className="flex flex-col items-center justify-center gap-2 bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition-colors"
            >
              <CreditCard size={24} />
              <span className="text-xl">Pay Bill</span>
              <span className="text-lg font-bold">${orderTotal.toFixed(2)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientView;