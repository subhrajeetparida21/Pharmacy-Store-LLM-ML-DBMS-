import { useState, useRef } from "react";

export default function Cart({
  cart,
  setCart,
  medicines,
  setMedicines,
  setOrders,
  deliveryPeople,
  setDeliveryPeople,
  addToCart
}) {
  const [addresses] = useState([
    { id: 1, label: "Home", details: "123 Main St, City" },
    { id: 2, label: "Work", details: "456 Office Rd, City" }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(1);
  const logRef = useRef(null);

  // --- LOGIC HELPERS ---

  const removeFromCart = (id) => {
    setCart(prev => {
      return prev
        .map(item => (item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item))
        .filter(item => item.qty > 0); // Automatically removes item if qty becomes 0
    });
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    // 1. Find the delivery person with the least orders (Balanced assignment)
    const sortedPeople = [...deliveryPeople].sort((a, b) => a.orders - b.orders);
    const assigned = { ...sortedPeople[0], orders: sortedPeople[0].orders + 1 };

    // 2. Check stock and update medicine quantities safely
    let stockError = false;
    const updatedMedicines = medicines.map(med => {
      const cartItem = cart.find(c => c.id === med.id);
      if (cartItem) {
        if (med.stock < cartItem.qty) {
          alert(`Not enough stock for ${med.name}`);
          stockError = true;
        }
        return { ...med, stock: med.stock - cartItem.qty };
      }
      return med;
    });

    if (stockError) return;

    // 3. Create a single new order object
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: totalAmount,
      status: "Processing",
      deliveryPartner: assigned.name,
      address: addresses.find(a => a.id === selectedAddress)
    };

    // 4. Update all states
    setOrders(prev => [newOrder, ...prev]);
    setMedicines(updatedMedicines);
    setDeliveryPeople(prev => 
      prev.map(p => p.id === assigned.id ? assigned : p)
    );
    setCart([]); // Clear the cart after order
    
    alert(`Order placed successfully! Assigned to ${assigned.name}`);
  };

  // --- CALCULATIONS ---
  const totalMRP = cart.reduce((sum, c) => sum + c.price * (c.qty || 1), 0);
  const totalDiscount = cart.reduce(
    (sum, c) => sum + (c.price * ((c.discount || 0) / 100)) * (c.qty || 1),
    0
  );
  const deliveryFee = cart.length > 0 ? 7 : 0;
  const totalAmount = totalMRP - totalDiscount + deliveryFee;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "32px", flexWrap: "wrap" }}>
      
      {/* LEFT SIDE: CART ITEMS */}
      <div style={{ flex: "2", minWidth: "300px" }}>
        <h2 style={{ color: "#0F4454", marginBottom: "20px" }}>🛒 Your Shopping Cart</h2>

        {cart.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "50px",
            border: "2px dashed #cbd5e1",
            borderRadius: "12px",
            backgroundColor: "#f8fafc",
            color: "#64748b"
          }}>
            <p style={{ fontSize: "1.2rem" }}>Your cart is empty.</p>
            <p style={{ fontSize: "0.9rem" }}>Add some medicines to get started!</p>
          </div>
        )}
        {cart.length > 0 && cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                marginBottom: "12px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img 
                  src={item.image || "https://via.placeholder.com/60"} 
                  alt={item.name} 
                  style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }} 
                />
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{item.name}</div>
                  <div style={{ color: "#22c55e", fontWeight: "600" }}>
                    ₹{(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}
                    {item.discount > 0 && (
                      <span style={{ textDecoration: "line-through", color: "#94a3b8", marginLeft: "8px", fontSize: "0.9rem" }}>
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", background: "#f1f5f9", borderRadius: "8px", padding: "4px" }}>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: "#ef4444", color: "#fff", border: "none", width: "30px", height: "30px", borderRadius: "6px", cursor: "pointer" }}
                  > - </button>
                  
                  <span style={{ margin: "0 12px", fontWeight: "bold" }}>{item.qty || 1}</span>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    style={{ background: "#22c55e", color: "#fff", border: "none", width: "30px", height: "30px", borderRadius: "6px", cursor: "pointer" }}
                  > + </button>
                </div>
                
                <button 
                  onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                  style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        )
      </div>

      {/* RIGHT SIDE: SUMMARY & ADDRESS */}
      <div style={{ flex: "1", minWidth: "300px" }}>
        <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "sticky", top: "20px" }}>
          <h3 style={{ marginBottom: "16px" }}>Delivery Address</h3>
          <select 
            value={selectedAddress} 
            onChange={(e) => setSelectedAddress(Number(e.target.value))}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "20px" }}
            disabled={cart.length === 0}
          >
            {addresses.map(addr => (
              <option key={addr.id} value={addr.id}>{addr.label}: {addr.details}</option>
            ))}
          </select>

          <h3 style={{ marginBottom: "16px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
            <span>Items Total</span>
            <span>₹{totalMRP.toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0", color: "#16a34a" }}>
            <span>Discount</span>
            <span>- ₹{totalDiscount.toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #eee" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "1.2rem", color: "#0F4454" }}>
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(0)}</span>
          </div>
          <button
            onClick={placeOrder}
            style={{
              marginTop: "24px",
              width: "100%",
              background: cart.length === 0 ? "#ccc" : "#0F4454",
              color: "#fff",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
              opacity: cart.length === 0 ? 0.7 : 1
            }}
            disabled={cart.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}