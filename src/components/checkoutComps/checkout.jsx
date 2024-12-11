import { Link, useLocation } from "react-router-dom";
import Footer from "../homePageComps/footer";
import Navbar from "../homePageComps/navBar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { totalCartPrice } from "../../features/cartSlice";
import { getAddress } from "../../features/addressSlice";
import { toast } from "react-toastify";
const Checkout = () => {
  const [status, setStatus] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [terms, setTerms] = useState(false)
  const [display,setDisplay] = useState("auto")
  const dispatch = useDispatch();
  const location = useLocation();
  const product = location?.state || null;
  const cartData = useSelector((state) => state.cart);
  const totalPriceCart = useSelector((state) => state.cart.totalPrice);
  const address = useSelector((state) => state?.address?.address) || null;
  const totalPrice = cartData?.totalPrice || 0;
  const storedCartData = cartData?.cart || null;
  let storedProduct =
    product === "cart" ? storedCartData : [{ product: product }];
  useEffect(
    () => {
      if (product === "cart") {
        if (totalPrice === 0) {
          dispatch(totalCartPrice());
        }
        setStatus("cart");
        storedProduct = storedCartData;
      } else {
        setStatus("product");
      }
      if (address.length === 0) {
        dispatch(getAddress());
      }
    },
    [totalPriceCart],
    [cartData]
  );
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if(selectedAddress && paymentMode && terms){
        setDisplay("none");
    }else{
        toast.error("please select all fields")
    }
  }
  console.log(storedProduct)
  return (
    <>
      <Navbar />
      <section className="container min-vh-100" style={{display: display}}>
        <div className="row">
          <div className="col-md-8 my-3">
            <h3>Your Items</h3>
            <ul className="list-group">
              {storedProduct.map((product) => (
                <li key={product.product._id} className="list-group-item">
                  <p>Title: {product.product.productName}</p>
                  <p>Qty: {status === "cart" ? product.quantity : 1}</p>
                  <p>Price: {product.product.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4 my-3">
            <h3>Product Price Details</h3>
            <div className="card" style={{pointerEvents: "none"}}>
                <div className="card-body">
                <p>
              Total Price: Rs.{" "}
              {status === "product" && storedProduct[0]?.product?.price
                ? storedProduct[0].product.price
                : totalPrice}
            </p>
            <p>Delivery: Free Delivery</p>
            <p>
              <strong>
                Final Price:{" "}
                {status === "product" && storedProduct[0]?.product?.price
                  ? storedProduct[0].product.price
                  : totalPrice}
              </strong>
            </p>
                </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          <h3>Select Address </h3>
          <ul className="list-group">
            {address.length > 0 ? (
              address.map((userAddress) => (
                <li className="list-group-item" key={userAddress._id}>
                  {" "}
                  <input
                    type="radio"
                    name="address"
                    onClick={(e) => setSelectedAddress(userAddress.address)}
                  />{" "}
                  {userAddress.address}
                </li>
              ))
            ) : (
              <p>No address found</p>
            )}
          </ul>
        </div>
        <div className="my-3">
          <h3>Select Payment Mode </h3>
          <div className="list-group">
            <div className="list-group-item">
              <label>
                <input
                  type="radio"
                  name="payment"
                  onClick={(e) => setPaymentMode("COD")}
                />{" "}
                Cash On Delivery
              </label>
            </div>
          </div>
        </div>
            <label className="ms-3"><input type="checkbox" checked={terms ? true: false} value="agree" onChange={(e) => setTerms(!terms)}/> I agree to all terms and conditions..</label> <br/>
            <button onClick={handlePlaceOrder} className="btn btn-success my-3 ms-3">Place Order</button>
      </section>
      {display === "none" ? <section className="container min-vh-100 text-center"><h1 className="my-3">Order Placed Successfully.</h1><p>Thank You for Shopping with us.</p> <Link to='/products'>Continue Shopping</Link></section> : ""}
      <Footer />
    </>
  );
};
export default Checkout;
