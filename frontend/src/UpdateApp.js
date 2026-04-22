import React, { useState } from 'react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserLogin';

function App(){
  const [view, setView] = useState('home');
  const [adminToken, setAdminToken] = useState('');
  const [userToken, setUserToken] = useState('');

  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h1>Traffic Challan System (Demo)</h1>
      <div style={{marginBottom:20}}>
        <button onClick={()=>setView('home')}>Home</button>
        <button onClick={()=>setView('adminLogin')}>Admin Login</button>
        <button onClick={()=>setView('admin')}>Admin Panel</button>
        <button onClick={()=>setView('user')}>User Panel</button>
      </div>

      {view==='home' && <Home />}
      {view==='adminLogin' && <AdminLogin onLoginSuccess={(token)=>{ setAdminToken(token); setView('admin'); }} />}
      {view==='admin' && <AdminPanel adminToken={adminToken} />}
      {view==='user' && <UserPanel setUserToken={setUserToken} userToken={userToken} />}
    </div>
  );
}

export default App;