import React, { useState, useEffect } from 'react';
import './EmergencyOrder.css';

export default function EmergencyOrder() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [urgency, setUrgency] = useState('high');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load available medicines
    const medicineList = [
      { id: 1, name: 'Paracetamol 500mg', price: 25, stock: 500, category: 'Pain Relief' },
      { id: 2, name: 'Amoxicillin 250mg', price: 45, stock: 300, category: 'Antibiotics' },
      { id: 3, name: 'Vitamin C Tablets', price: 120, stock: 1000, category: 'Vitamins' },
      { id: 4, name: 'Ibuprofen 400mg', price: 35, stock: 450, category: 'Pain Relief' },
      { id: 5, name: 'Cough Syrup', price: 85, stock: 200, category: 'Cough & Cold' },
      { id: 6, name: 'Antibiotic Cream', price: 65, stock: 150, category: 'First Aid' },
      { id: 7, name: 'Insulin Pen', price: 450, stock: 80, category: 'Diabetes Care' },
      { id: 8, name: 'Oxygen Cylinder', price: 2500, stock: 25, category: 'Medical Equipment' },
    ];
    setMedicines(medicineList);
  }, []);

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(cart.map(item =>
        item.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeEmergencyOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your emergency order');
      return;
    }

    const order = {
      id: 'EMERGENCY-' + Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: calculateTotal(),
      urgency: urgency,
      specialInstructions: specialInstructions,
      status: 'Critical',
      estimatedDelivery: urgency === 'high' ? '2 hours' : urgency === 'medium' ? '4 hours' : '6 hours'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('emergencyOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('emergencyOrders', JSON.stringify(existingOrders));

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setSpecialInstructions('');
    }, 3000);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="emergency-order-container">
      <div className="emergency-header">
        <h1>🚨 Emergency Order</h1>
        <p>Place urgent orders for critical medicines with priority delivery</p>
      </div>

      {orderPlaced && (
        <div className="success-message">
          ✅ Emergency order placed! Your order will be delivered urgently.
        </div>
      )}

      <div className="emergency-content">
        <div className="medicines-section">
          <h2>📋 Available Medicines</h2>
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="medicines-grid">
            {filteredMedicines.map(medicine => (
              <div key={medicine.id} className="medicine-card">
                <div className="medicine-info">
                  <h4>{medicine.name}</h4>
                  <p className="category">{medicine.category}</p>
                  <p className="price">₹{medicine.price}</p>
                  <p className="stock">Stock: {medicine.stock} units</p>
                </div>
                <button
                  onClick={() => addToCart(medicine)}
                  className="add-btn"
                >
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="order-section">
          <h2>🛒 Emergency Order Cart</h2>
          
          <div className="urgency-section">
            <label>Priority Level:</label>
            <div className="urgency-buttons">
              <button
                className={`urgency-btn ${urgency === 'high' ? 'active high' : ''}`}
                onClick={() => setUrgency('high')}
              >
                🔴 High (2hrs)
              </button>
              <button
                className={`urgency-btn ${urgency === 'medium' ? 'active medium' : ''}`}
                onClick={() => setUrgency('medium')}
              >
                🟡 Medium (4hrs)
              </button>
              <button
                className={`urgency-btn ${urgency === 'low' ? 'active low' : ''}`}
                onClick={() => setUrgency('low')}
              >
                🟢 Low (6hrs)
              </button>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>No items in emergency order</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} each</p>
                    </div>
                    <div className="item-controls">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                        className="quantity-input"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <strong>Total Amount:</strong>
                <strong>₹{calculateTotal()}</strong>
              </div>
            </>
          )}

          <div className="instructions-section">
            <label>Special Instructions:</label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Add any special instructions (e.g., urgent delivery, call before delivery, etc.)"
              rows="3"
            />
          </div>

          <button
            onClick={placeEmergencyOrder}
            className="place-order-btn"
            disabled={cart.length === 0}
          >
            Place Emergency Order
          </button>
        </div>
      </div>
    </div>
  );
}