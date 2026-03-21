import React, { useState, useEffect } from 'react';
import './OrderFromSeller.css';

export default function OrderFromSeller() {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderNotes, setOrderNotes] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Sample sellers data
  useEffect(() => {
    const sampleSellers = [
      { id: 1, name: 'MediSupply Co.', location: 'Mumbai', rating: 4.5 },
      { id: 2, name: 'PharmaDistributors Ltd.', location: 'Delhi', rating: 4.8 },
      { id: 3, name: 'HealthCare Wholesale', location: 'Bangalore', rating: 4.3 },
      { id: 4, name: 'Global Pharma Solutions', location: 'Chennai', rating: 4.7 },
    ];
    setSellers(sampleSellers);
  }, []);

  // Sample medicines data
  useEffect(() => {
    const sampleMedicines = [
      { id: 1, name: 'Paracetamol 500mg', price: 25, stock: 500, manufacturer: 'Cipla' },
      { id: 2, name: 'Amoxicillin 250mg', price: 45, stock: 300, manufacturer: 'GSK' },
      { id: 3, name: 'Vitamin C Tablets', price: 120, stock: 1000, manufacturer: 'Abbott' },
      { id: 4, name: 'Ibuprofen 400mg', price: 35, stock: 450, manufacturer: 'Sun Pharma' },
      { id: 5, name: 'Cough Syrup', price: 85, stock: 200, manufacturer: 'Pfizer' },
      { id: 6, name: 'Antibiotic Cream', price: 65, stock: 150, manufacturer: 'Johnson & Johnson' },
      { id: 7, name: 'Insulin Pen', price: 450, stock: 80, manufacturer: 'Novo Nordisk' },
      { id: 8, name: 'Blood Pressure Monitor', price: 1200, stock: 45, manufacturer: 'Omron' },
    ];
    setMedicines(sampleMedicines);
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

  const placeOrder = () => {
    if (!selectedSeller) {
      alert('Please select a seller');
      return;
    }
    if (cart.length === 0) {
      alert('Please add items to your order');
      return;
    }

    const order = {
      id: Date.now(),
      seller: sellers.find(s => s.id === parseInt(selectedSeller)),
      items: cart,
      total: calculateTotal(),
      notes: orderNotes,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('sellerOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('sellerOrders', JSON.stringify(existingOrders));

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setSelectedSeller('');
      setOrderNotes('');
    }, 3000);
  };

  return (
    <div className="order-from-seller-container">
      <div className="order-header">
        <h1>📦 Order Medicine from Seller</h1>
        <p>Place bulk orders directly from pharmaceutical distributors</p>
      </div>

      {orderPlaced && (
        <div className="success-message">
          ✅ Order placed successfully! Your order has been sent to the seller.
        </div>
      )}

      <div className="order-content">
        {/* Left Side - Sellers and Order Form */}
        <div className="order-left">
          {/* Seller Selection */}
          <div className="seller-section">
            <h3>Select Seller/Distributor</h3>
            <div className="seller-list">
              {sellers.map(seller => (
                <div
                  key={seller.id}
                  className={`seller-card ${selectedSeller === seller.id.toString() ? 'selected' : ''}`}
                  onClick={() => setSelectedSeller(seller.id.toString())}
                >
                  <div className="seller-info">
                    <h4>{seller.name}</h4>
                    <p>📍 {seller.location}</p>
                    <div className="rating">⭐ {seller.rating} / 5</div>
                  </div>
                  {selectedSeller === seller.id.toString() && (
                    <div className="selected-badge">✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Notes */}
          <div className="notes-section">
            <h3>Order Notes</h3>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Add any special instructions for the seller..."
              rows="3"
            />
          </div>
        </div>

        {/* Right Side - Medicines List */}
        <div className="order-right">
          <div className="medicines-section">
            <h3>Available Medicines</h3>
            <div className="medicines-grid">
              {medicines.map(medicine => (
                <div key={medicine.id} className="medicine-card">
                  <div className="medicine-info">
                    <h4>{medicine.name}</h4>
                    <p className="manufacturer">{medicine.manufacturer}</p>
                    <p className="price">₹{medicine.price}</p>
                    <p className="stock">In Stock: {medicine.stock} units</p>
                  </div>
                  <button
                    onClick={() => addToCart(medicine)}
                    className="add-to-cart-btn"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="cart-section">
          <h3>Order Cart</h3>
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Manufacturer</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.manufacturer}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                        className="quantity-input"
                      />
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="total-label">Total Amount:</td>
                  <td className="total-amount">₹{calculateTotal()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}