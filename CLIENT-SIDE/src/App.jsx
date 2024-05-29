import {Route,Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import {About} from './components/About';
import {Order} from './components/Order';
import {Login} from './components/Login';
import { Navbar } from './components/navbar';
import { Cart } from './components/Cart';
import {Signup} from './components/Signup';
import {Footer} from './components/Footer';
import {store} from './store';
import {Provider} from 'react-redux';
function App() {
  return (
    <>
    <Provider store={store}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='order' element={<Order/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='cart' element={<Cart/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
      </Routes>
      <Footer/>
      </Provider>
    </>
  )
}

export default App
