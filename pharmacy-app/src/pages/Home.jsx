import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockCategories = [
  { name: "Pain Relief", color: "#f7c59f" },
  { name: "Antibiotics", color: "#b5ead7" },
  { name: "Vitamins", color: "#f9e79f" },
  { name: "Cough & Cold", color: "#b2c7f7" },
];

const mockMedicines = [
  { id: 1, name: "Paracetamol", category: "Pain Relief", price: 20, discount: 10 },
  { id: 2, name: "Amoxicillin", category: "Antibiotics", price: 50, discount: 5 },
  { id: 3, name: "Vitamin C", category: "Vitamins", price: 30, discount: 0 },
  { id: 4, name: "Cough Syrup", category: "Cough & Cold", price: 40, discount: 8 },
];

export default function Home({ cart, addToCart }) {
  const [user, setUser] = useState(null);
  const [addedId, setAddedId] = useState(null); // 🔥 track which item added
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
    if (!u) navigate("/login/customer");
  }, [navigate]);

  if (!user) return null;

  // 🔥 Handle add with animation
  const handleAdd = (med) => {
    addToCart(med);
    setAddedId(med.id);

    setTimeout(() => {
      setAddedId(null);
    }, 800);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: '2.3rem', color: '#0F4454', marginBottom: 8 }}>
        Welcome to PharmaCare
      </h1>

      <p style={{ fontSize: '1.1rem', color: '#519FAD', marginBottom: 32 }}>
        Find trusted medicines by category
      </p>

      {/* Categories */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
        {mockCategories.map(cat => (
          <div
            key={cat.name}
            style={{
              background: cat.color,
              borderRadius: 16,
              padding: '18px 32px',
              fontWeight: 600,
              fontSize: 18,
              color: '#0F4454',
              boxShadow: '2px 2px 12px #e0e5ec',
              minWidth: 160
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* Medicines */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28
        }}
      >
        {mockMedicines.map(med => (
          <div
            key={med.id}
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '2px 2px 12px #e0e5ec',
              padding: 24,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 20, color: '#0F4454', marginBottom: 6 }}>
              {med.name}
            </div>

            <div style={{ fontSize: 15, color: '#519FAD', marginBottom: 8 }}>
              {med.category}
            </div>

            <div style={{ fontSize: 16, marginBottom: 8 }}>
              ₹{med.price}
              <span style={{ color: '#22c55e', fontWeight: 600 }}>
                {med.discount ? ` -${med.discount}%` : ''}
              </span>
            </div>

            {/* 🔥 IMPROVED BUTTON */}
            <button
              onClick={() => handleAdd(med)}
              style={{
                marginTop: 10,
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s ease',

                // Dynamic styling
                background: addedId === med.id ? '#22c55e' : '#0ea5e9',
                color: '#fff',
                transform: addedId === med.id ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {addedId === med.id ? " Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}