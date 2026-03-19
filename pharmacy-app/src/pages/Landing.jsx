import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0e5ec 0%, #f7fafd 100%)'}}>
      <div style={{background: '#f7fafd', borderRadius: 32, boxShadow: '8px 8px 32px #d1d9e6, -8px -8px 32px #fff', padding: 48, width: 400, maxWidth: '95vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{fontSize: '2.3rem', color: '#0F4454', marginBottom: 24}}>Welcome to PharmaCare</h1>
        <p style={{fontSize: '1.1rem', color: '#519FAD', marginBottom: 32}}>Choose your login type</p>
        <div style={{display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center'}}>
          <div className="login-card" style={{background: 'white', color: '#0F4454', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, minWidth: 180, cursor: 'pointer', transition: 'transform 0.2s', border: '2px solid #519FAD', textAlign: 'center'}} onClick={()=>navigate('/login/customer')}>
            <h2 style={{margin: 0, fontSize: '1.3rem'}}>Customer Login</h2>
            <p style={{fontSize: '0.95rem', color: '#519FAD'}}>Shop medicines, view orders</p>
          </div>
          <div className="login-card" style={{background: 'white', color: '#0F4454', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, minWidth: 180, cursor: 'pointer', transition: 'transform 0.2s', border: '2px solid #519FAD', textAlign: 'center'}} onClick={()=>navigate('/login/admin')}>
            <h2 style={{margin: 0, fontSize: '1.3rem'}}>Admin Login</h2>
            <p style={{fontSize: '0.95rem', color: '#519FAD'}}>Manage inventory & orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
