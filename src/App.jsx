import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';
import HomePage from './components/homePage';
import ProductsPage from './components/productsPage';
import ProductDetails from './components/productDetailsPage/productDetails';
import Cart from './components/cart';

function App() {
  
  return (
    <>
      <Router>
      <ToastContainer position="top-center" autoClose={2000} />
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path="/products/productDetails" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
