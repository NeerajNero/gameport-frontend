import { Link } from "react-router-dom"
import { getUser,logout } from "../../features/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCart } from "../../features/cartSlice"
import { toast } from "react-toastify"
import { getWishlist } from "../../features/wishlistSlice"
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userState = useSelector((state)=> state.user)
  const cartState = useSelector((state) => state.cart.cart)
  const userStatus = useSelector((state) => state.cart.status)
  const userData = userState?.user?.user || null;
  const cartData = cartState || [];
  const wishlistState = useSelector((state) => state.wishlist)
  const wishlistData = wishlistState?.wishlist?.items || null

  useEffect(() => {
    if(!userData || userData.length === 0){
      dispatch(getUser())
    }
  },[dispatch, userData])
  useEffect(() => {
    if(!cartData || cartData.length === 0)
    {
       dispatch(getCart())
    }
},[cartData,dispatch])
  useEffect(() => {
    if(!wishlistData || wishlistData.length === 0)
      {
         dispatch(getWishlist())
      }
  },[wishlistData,dispatch])

    const handleCartCheck = async(e) => {
      e.preventDefault()
      if(userData){
        navigate('/cart')
      }else{
        await toast.promise(
          new Promise((resolve) => setTimeout(resolve, 1000)), 
          {
            pending: "Redirecting to login...",
            error: "Please login to view cart",
          }
        );
        navigate('/login');
      }
    }
    const handleWishlistCheck = async(e) => {
      e.preventDefault()
      if(userData){
        navigate('/wishlist')
      }else{
        await toast.promise(
          new Promise((resolve) => setTimeout(resolve, 1000)), 
          {
            pending: "Redirecting to login...",
            error: "Please login to view cart",
          }
        );
        navigate('/login');
      }
    } 
    const handleLogout = (e) => {
      e.preventDefault()
      dispatch(logout()).unwrap().then(() => {
        localStorage.clear()
        toast.success("Logged out successfully")
        setTimeout(() => {navigate('/login')},500)
      })
    }
    const handleProfile = (e) => {
      e.preventDefault()
      if(userData){
        navigate('/profile')
      }else{
        toast.error("login to view profile")
        navigate('/login')
      }
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3" data-bs-theme="dark">
  <div className="container-fluid container">
    <Link className="navbar-brand" to="/">GamePort</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div className="mx-3">
  {userData ? <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {userStatus === "idle" || userStatus === "loading" ? "Loading" : userData.userName || userData.user.userName} 
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" onClick={handleProfile}>Profile</button></li>
    <li><button className="dropdown-item" onClick={handleCartCheck}>Cart</button></li>
    <li><button className="dropdown-item" onClick={handleWishlistCheck}>Wishlist</button></li>
    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
  </ul>
</div> : <Link className="btn btn-outline-success" to="/login">Login</Link>}
  </div>
  </div>
  
</nav>
    )
}

export default Navbar