import { useState } from "react";
import { medicines } from "../data/data";

function Inventory({ addToCart }) {
  const [search, setSearch] = useState("");

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        className="search-bar"
        placeholder="Search medicines..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map(med => (
          <div className="card" key={med.id}>
            <h3>{med.name}</h3>
            <p>₹{med.price}</p>
            <p>Stock: {med.stock}</p>

            {med.stock < 10 && (
              <div className="alert">Low Stock ⚠</div>
            )}

            <button onClick={() => addToCart(med)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;