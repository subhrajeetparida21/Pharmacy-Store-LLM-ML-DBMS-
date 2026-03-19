export default function Orders({ orders }) {
  return (
    <div className="container" style={{maxWidth: 700, margin: '32px auto', background: '#f7fafd', borderRadius: 18, boxShadow: '2px 2px 12px #e0e5ec', padding: 32}}>
      <h2 style={{color: '#0F4454', marginBottom: 18}}>Your Orders</h2>
      {orders && orders.length > 0 ? (
        <ul style={{listStyle: 'none', padding: 0}}>
          {orders.map((o, i) => (
            <li key={i} style={{background: '#fff', borderRadius: 12, boxShadow: '2px 2px 8px #e0e5ec', marginBottom: 16, padding: 18, display: 'flex', flexDirection: 'column', gap: 6}}>
              <div><b>Medicine:</b> {o.item.name}</div>
              <div><b>Status:</b> {o.status}</div>
              {o.delivery && <div><b>Delivery:</b> {o.delivery.name} ({o.delivery.phone})</div>}
              {o.address && <div><b>Address:</b> {o.address.details}</div>}
            </li>
          ))}
        </ul>
      ) : (
        <div style={{color: '#888'}}>No orders yet.</div>
      )}
    </div>
  );
}