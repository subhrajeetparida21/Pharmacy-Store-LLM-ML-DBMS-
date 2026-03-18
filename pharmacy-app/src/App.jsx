import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState,useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

export default function App(){

  const [user,setUser]=useState(null);

  const [medicines,setMedicines]=useState([
    {id:1,name:"Paracetamol",price:20,stock:5}
  ]);

  const [cart,setCart]=useState([]);
  const [orders,setOrders]=useState([]);

  const [deliveryPeople,setDeliveryPeople]=useState([
    {id:1,name:"Ravi",orders:0,phone:"9876543210"}
  ]);

  useEffect(()=>{
    const u=JSON.parse(localStorage.getItem("user"));
    if(u) setUser(u);
  },[]);

  const addToCart=(m)=>setCart([...cart,m]);

  return(
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/login" element={<Login setUser={setUser}/>}/>

        <Route path="/" element={
          <ProtectedRoute user={user}>
            <Home/>
          </ProtectedRoute>
        }/>

        <Route path="/inventory" element={
          <ProtectedRoute user={user}>
            <Inventory medicines={medicines} addToCart={addToCart}/>
          </ProtectedRoute>
        }/>

        <Route path="/cart" element={
          <ProtectedRoute user={user}>
            <Cart cart={cart}
              medicines={medicines}
              setMedicines={setMedicines}
              setOrders={setOrders}
              deliveryPeople={deliveryPeople}
              setDeliveryPeople={setDeliveryPeople}/>
          </ProtectedRoute>
        }/>

        <Route path="/orders" element={
          <ProtectedRoute user={user}>
            <Orders orders={orders}/>
          </ProtectedRoute>
        }/>

        <Route path="/admin" element={
          <ProtectedRoute user={user} role="admin">
            <AdminDashboard
              medicines={medicines}
              setMedicines={setMedicines}
              deliveryPeople={deliveryPeople}
              setDeliveryPeople={setDeliveryPeople}
              orders={orders}
            />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}