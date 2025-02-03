import React from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import { AlertCircle, Utensils, DollarSign } from 'lucide-react';

function Dashboard() {
  const { tables, orders } = useRestaurantStore();

  const getTableColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-green-100 border-green-500';
      case 'occupied': return 'bg-yellow-100 border-yellow-500';
      case 'waiting-payment': return 'bg-red-100 border-red-500';
      case 'paid': return 'bg-blue-100 border-blue-500';
      default: return 'bg-gray-100 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Restaurant Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tables Status</h2>
          <div className="grid grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-lg border-2 ${getTableColor(table.status)} relative`}
              >
                <span className="text-lg font-medium">Table {table.id}</span>
                {table.needsWaiter && (
                  <AlertCircle className="absolute top-2 right-2 text-red-500" />
                )}
                <p className="capitalize">{table.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
          <div className="space-y-4">
            {orders
              .filter((order) => order.status !== 'delivered')
              .map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Table {order.tableId}</span>
                    <span className={`capitalize text-sm px-2 py-1 rounded ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <ul className="mt-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-sm text-gray-600">
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;