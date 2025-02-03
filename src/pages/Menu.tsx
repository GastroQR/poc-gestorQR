import React, { useState } from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import { ChevronLeft, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  tableId?: string;
}

function Menu({ tableId: propTableId }: MenuProps) {
  const { menu, cart, addToCart, removeFromCart, submitOrder } = useRestaurantStore();
  const navigate = useNavigate();
  const tableId = propTableId || "1";
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const tableCart = cart[tableId] || [];
  const cartTotal = tableCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (menuItem: any) => {
    addToCart(tableId, menuItem, quantity);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleSubmitOrder = () => {
    submitOrder(tableId);
    navigate(window.location.pathname.includes('/demo') ? '/demo' : `/table/${tableId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button
        onClick={() => navigate(window.location.pathname.includes('/demo') ? '/demo' : `/table/${tableId}`)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft size={20} />
        <span>Back to Table</span>
      </button>

      <h1 className="text-3xl font-bold mb-8">Menu</h1>

      <div className="grid grid-cols-1 gap-6 mb-24">
        {menu.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-lg font-medium text-green-600">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              {selectedItem === item.id ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedItem(item.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {tableCart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Order</h3>
              <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="space-y-2 mb-4">
              {tableCart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{item.quantity}x </span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(tableId, item.menuItemId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitOrder}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;