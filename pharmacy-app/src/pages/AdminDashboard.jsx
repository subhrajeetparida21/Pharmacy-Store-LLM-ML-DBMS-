import { medicines } from "../data/data";

function AdminDashboard() {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {medicines.map(m => (
        <div key={m.id} className="card">
          <h3>{m.name}</h3>
          <p>Stock: {m.stock}</p>
          <p>Expiry: {m.expiry}</p>

          {m.stock < 10 && (
            <div className="alert">
              Reorder Required ⚠
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;