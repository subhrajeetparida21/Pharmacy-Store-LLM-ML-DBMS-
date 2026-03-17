import { deliveryPeople } from "../data/data";

function Cart({ cart }) {

  const assignDelivery = () => {
    let min = deliveryPeople[0];

    deliveryPeople.forEach(p => {
      if (p.orders < min.orders) min = p;
    });

    return min;
  };

  const handleOrder = () => {
    const person = assignDelivery();

    alert(
      `Order placed! Delivery by ${person.name} (${person.phone})`
    );
  };

  return (
    <div className="container">
      <h2>Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="card">
          {item.name} - ₹{item.price}
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={handleOrder}>Place Order</button>
      )}
    </div>
  );
}

export default Cart;