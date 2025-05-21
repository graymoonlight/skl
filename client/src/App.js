import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import AdminAuth from './pages/admin/AdminAuth';
import Admin from './pages/admin/Admin';
import Auth from './pages/auth/Auth'
import Recovery from './pages/auth/Recovery';
import Register from './pages/auth/Register';
import Booking from './pages/Booking';
import Order from './pages/Order';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/AjP3RmL3RkpPjlps/Aopdjmco1ji3i4h9fhjkn/Auth' element={<AdminAuth/>}/>
      <Route path='/AjP3RmL3RkpPjlps/Aopdjmco1ji3i4h9fhjkn' element={<Admin/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/recovery' element={<Recovery/>}/>
      <Route path='/booking' element={<Booking/>}/>
      <Route path='/order' element={<Order/>}/>
    </Routes>
  );
}