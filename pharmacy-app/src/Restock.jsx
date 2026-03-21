import React, { useState, useEffect } from 'react';
import './Restock.css';

export default function Restock() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [restockQuantity, setRestockQuantity] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Load low stock items
    const items = [
      { id: 1, name: 'Paracetamol 500mg', currentStock: 25, minStock: 50, price: 25, supplier: 'Cipla' },
      { id: 2, name: 'Amoxicillin 250mg', currentStock: 30, minStock: 100, price: 45, supplier: 'GSK' },
      { id: 3, name: 'Vitamin C Tablets', currentStock: 45, minStock: 100, price: 120, supplier: 'Abbott' },
      { id: 4, name: 'Ibuprofen 400mg', currentStock: 15, minStock: 50, price: 35, supplier: 'Sun Pharma' },
      { id: 5, name: 'Cough Syrup', currentStock: 20, minStock: 80, price: 85, supplier: 'Pfizer' },
      { id: 6, name: 'Antibiotic Cream', currentStock: 10, minStock: 40, price: 65, supplier: 'Johnson & Johnson' },
      { id: 7, name: 'Insulin Pen', currentStock: 8, minStock: 30, price: 450, supplier: 'Novo Nordisk' },
    ];
    setLowStockItems(items);

    // Load suppliers
    const supplierList = [
      { id: 1, name: 'Cipla', contact: '9876543210', location: 'Mumbai' },
      { id: 2, name: 'GSK', contact: '9876543211', location: 'Delhi' },
      { id: 3, name: 'Abbott', contact: '9876543212', location: 'Bangalore' },
      { id: 4, name: 'Sun Pharma', contact: '9876543213', location: 'Mumbai' },
      { id: 5, name: 'Pfizer', contact: '9876543214', location: 'Chennai' },
    ];
    setSuppliers(supplierList);

    // Initialize restock quantities
    const initialQuantities = {};
    items.forEach(item => {
      initialQuantities[item.id] = item.minStock - item.currentStock;
    });
    setRestockQuantity(initialQuantities);
  }, []);

  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const updateQuantity = (itemId, value) => {
    setRestockQuantity({
      ...restockQuantity,
      [itemId]: parseInt(value) || 0
    });
  };

  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach(itemId => {
      const item = lowStockItems.find(i => i.id === itemId);
      const quantity = restockQuantity[itemId] || 0;
      total += item.price * quantity;
    });
    return total;
  };

  const placeRestockOrder = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to restock');
      return;
    }
    if (!selectedSupplier) {
      alert('Please select a supplier');
      return;
    }

    const order = {
      id: 'RESTOCK-' + Date.now(),
      date: new Date().toISOString(),
      supplier: suppliers.find(s => s.id === parseInt(selectedSupplier)),
      items: selectedItems.map(itemId => {
        const item = lowStockItems.find(i => i.id === itemId);
        return {
          ...item,
          quantity: restockQuantity[itemId]
        };
      }),
      total: calculateTotal(),
      status: 'Pending'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('restockOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('restockOrders', JSON.stringify(existingOrders));

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setSelectedItems([]);
      setSelectedSupplier('');
    }, 3000);
  };

  return (
    <div className="restock-container">
      <div className="restock-header">
        <h1>🔄 Restock Low Inventory Items</h1>
        <p>Manage and order low stock items from suppliers</p>
      </div>

      {orderPlaced && (
        <div className="success-message">
          ✅ Restock order placed successfully!
        </div>
      )}

      <div className="restock-content">
        <div className="low-stock-section">
          <h2>⚠️ Low Stock Items</h2>
          <div className="items-table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Medicine</th>
                  <th>Supplier</th>
                  <th>Current Stock</th>
                  <th>Min Stock</th>
                  <th>Shortage</th>
                  <th>Price</th>
                  <th>Restock Qty</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map(item => {
                  const shortage = item.minStock - item.currentStock;
                  const quantity = restockQuantity[item.id] || 0;
                  const totalCost = item.price * quantity;
                  
                  return (
                    <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                        />
                      </td>
                      <td className="medicine-name">{item.name}</td>
                      <td>{item.supplier}</td>
                      <td className={item.currentStock < item.minStock ? 'low-stock' : ''}>
                        {item.currentStock} units
                      </td>
                      <td>{item.minStock} units</td>
                      <td className="shortage">{shortage} units</td>
                      <td>₹{item.price}</td>
                      <td>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          min="0"
                          max="1000"
                          className="quantity-input"
                          disabled={!selectedItems.includes(item.id)}
                        />
                      </td>
                      <td className="total-cost">₹{totalCost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="order-summary-section">
          <h2>📋 Order Summary</h2>
          
          <div className="supplier-selection">
            <label>Select Supplier:</label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="supplier-select"
            >
              <option value="">Choose a supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} - {supplier.location}
                </option>
              ))}
            </select>
          </div>

          {selectedItems.length > 0 && (
            <div className="order-items">
              <h3>Items to Restock:</h3>
              {selectedItems.map(itemId => {
                const item = lowStockItems.find(i => i.id === itemId);
                const quantity = restockQuantity[itemId] || 0;
                return (
                  <div key={itemId} className="order-item">
                    <span>{item.name}</span>
                    <span>{quantity} units</span>
                    <span>₹{item.price * quantity}</span>
                  </div>
                );
              })}
              <div className="order-total">
                <strong>Total Amount:</strong>
                <strong>₹{calculateTotal()}</strong>
              </div>
            </div>
          )}

          <button
            onClick={placeRestockOrder}
            className="place-order-btn"
            disabled={selectedItems.length === 0 || !selectedSupplier}
          >
            Place Restock Order
          </button>
        </div>
      </div>
    </div>
  );
}