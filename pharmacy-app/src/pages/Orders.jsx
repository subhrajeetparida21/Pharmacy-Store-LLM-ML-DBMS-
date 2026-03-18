export default function Cart({
  cart, medicines, setMedicines,
  setOrders, deliveryPeople, setDeliveryPeople
}) {

  const placeOrder = () => {

    const assigned = deliveryPeople.sort((a,b)=>a.orders-b.orders)[0];
    assigned.orders++;

    cart.forEach(item=>{
      const med = medicines.find(m=>m.id===item.id);

      if (med.stock <= 0) {
        alert("Admin notified: Out of stock");
        return;
      }

      med.stock--;

      setOrders(prev=>[...prev,{
        item,
        status:"Processing",
        delivery:assigned
      }]);
    });

    setDeliveryPeople([...deliveryPeople]);
    setMedicines([...medicines]);

    alert(`Assigned to ${assigned.name}`);
  };

  return (
    <div className="container">
      {cart.map((c,i)=><div key={i} className="card">{c.name}</div>)}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}