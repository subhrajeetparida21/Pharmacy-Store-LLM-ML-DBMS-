import { useState } from "react";

function Order() {
  const [medicine, setMedicine] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = (e) => {
    e.preventDefault();
    alert(`Ordered ${quantity} of ${medicine}`);
  };

  return (
    <form onSubmit={handleOrder}>
      <h2>Place Order</h2>

      <input
        placeholder="Medicine"
        onChange={(e) => setMedicine(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">Order</button>
    </form>
  );
}

export default Order;