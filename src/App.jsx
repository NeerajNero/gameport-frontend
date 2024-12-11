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
import ProfilePage from './components/profilePage';
import Wishlist from './components/wishlist';
import Checkout from './components/checkoutComps/checkout';
import AboutUs from './components/aboutUsAndContactUs/aboutUs';
import ContactUs from './components/aboutUsAndContactUs/contactUs';

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
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
