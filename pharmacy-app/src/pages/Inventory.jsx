import { useState } from "react";

export default function Inventory({ medicines, addToCart }) {
  const [search,setSearch]=useState("");

  return (
    <div className="container">
      <input className="search"
        placeholder="Search"
        onChange={e=>setSearch(e.target.value)}
      />

      <div className="grid">
        {medicines.filter(m=>m.name.toLowerCase()
          .includes(search.toLowerCase()))
          .map(m=>(
          <div className="card" key={m.id}>
            <img src="https://via.placeholder.com/150" />
            <h3>{m.name}</h3>
            <p>₹{m.price}</p>
            <button onClick={()=>addToCart(m)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}