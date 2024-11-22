import Navbar from "./homePageComps/navBar"
import { useDispatch,useSelector } from "react-redux"
import { getCart } from "../features/cartSlice"
import { useEffect } from "react"
const Cart = () => {
    const cartState = useSelector((state) => state.cart.cart)
    const cartData = cartState ? cartState : []
    const dispatch = useDispatch()
    console.log(cartData)
    useEffect(() => {
        if(!cartData || cartData.length === 0)
        {
           dispatch(getCart())
        }
    },[cartData,dispatch])
    return(
        <>
        <Navbar />
        <section className="container">  
            <div className="row vh-100" style={{border: "2px solid black"}}>
                <div className="col-md-8" style={{border: "2px solid red"}}>

                </div>
                <div className="col-md-4" style={{border: "2px solid green"}}>

                </div>
            </div>
        </section>
        </>
    )
}
export default Cart