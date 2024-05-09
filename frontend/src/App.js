import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
