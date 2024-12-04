import Navbar from "./homePageComps/navBar"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Footer from "./homePageComps/footer"
const Wishlist = () => {
    const navigate = useNavigate()
    const userState = useSelector((state)=> state.user)
    const userData = userState?.user?.user || null;
    const userStatus = useSelector((state) => state.user.status)
    const wishlistState = useSelector((state) => state.wishlist)
    useEffect(() => {
      const userName = localStorage.getItem('userName') || null
      if(!userName){
        toast.error("login to view cart")
          navigate('/login')
      }
    },[])
    const wishlistData = wishlistState?.wishlist?.items || []
    const dispatch = useDispatch()
    const handleRemove = (e,productId) => {
      e.preventDefault();
    }
    return(
        <>
        <Navbar />
        <h2 className="my-2 container">My Wishlist</h2>
        <section className="container pt-3">  
            <div className="row min-vh-100" >
                <div className="col-md-8" >
                <div className="col-md-12">
            <div>
              {wishlistData.map((product) => (
                <div key={product.product._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4" id="card-img-container">
                      <img
                        src={product.product.images[0]}
                        className="img-fluid rounded-start"
                        id="card-img"
                        alt="Product Image"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                      <Link id="links" to="/products/productDetails" state={{product: product.product}}>Title: {product.product.productName}</Link>
                          <p>Quantity: {product.quantity}</p>
                          <p><strong>Price: Rs.{product.product.price}</strong></p>
                          <p>Free Delivery</p>
                        <div className="d-flex">
                          <button className="btn btn-info ">
                            Move to Cart
                          </button>
                          <button className="btn btn-info mx-3">
                            Buy Now
                          </button>
                          <button onClick={(e) => handleRemove(e,product.product._id)} className="btn btn-danger">
                            Remove from Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {wishlistData.length === 0 && (
                <p className="text-center">No Items in cart.</p>
              )}
            </div>
          </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    )
}
export default Wishlist