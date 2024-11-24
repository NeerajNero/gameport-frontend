import Navbar from "./homePageComps/navBar"
import { useDispatch,useSelector } from "react-redux"
import { getCart } from "../features/cartSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Cart = () => {
    const navigate = useNavigate()
    const userState = useSelector((state)=> state.user)
    const userData = userState ? userState.user.user : []
    console.log(userData)
    const cartState = useSelector((state) => state.cart.cart)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    useEffect(() => {
      if(!userData){
        toast.error("login to view cart")
          navigate('/login')
      }
    },[])
    console.log(totalPrice)
    const cartData = cartState ? cartState : []
    const dispatch = useDispatch()
    console.log(cartData)
    return(
        <>
        <Navbar />
        <section className="container">  
            <div className="row min-vh-100" style={{border: "2px solid black"}}>
                <div className="col-md-8" style={{border: "2px solid red"}}>
                <div className="col-md-12">
            <div>
              {cartData.map((product) => (
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
                        <h3 className="card-title" to="/products/productDetails">Title: {product.product.productName}</h3>
                          <p>Quantity: {product.quantity}</p>
                          <p><strong>Price: Rs.{product.product.price}</strong></p>
                          <p>Free Delivery</p>
                        <div className="d-flex">
                          <button className="btn btn-info ">
                            Move to Wishlist
                          </button>
                          <button className="btn btn-info mx-3">
                            Buy Now
                          </button>
                          <button className="btn btn-danger">
                            Remove from Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {cartData.length === 0 && (
                <p className="text-center">No Items in cart.</p>
              )}
            </div>
          </div>
                </div>
                <div className="col-md-4" style={{border: "2px solid green"}}>
                <h3>Price Details</h3>
                <hr/>
                <p>Price: Rs.{totalPrice}</p>
                <p>Delivery Charge: Free</p>
                <hr/>
                <p>Total Price: Rs.{totalPrice}</p>
                <hr/>
                <button className="btn btn-dark">Place Order</button>
                </div>
            </div>
        </section>
        </>
    )
}
export default Cart