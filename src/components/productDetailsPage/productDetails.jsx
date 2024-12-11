import { useLocation } from "react-router-dom";
import Navbar from "../homePageComps/navBar";
import Footer from "../homePageComps/footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector((state) => state.products);
  const cartData = cart?.products || null;
  let cartToBeModified = [...cartData];
  let randomizeCart = cartData
    ? cartToBeModified.sort(() => Math.random() - 0.5).slice(0, 4)
    : [];
  const { product } = location.state || {};
  const handleBuyNow = (e, product) => {
    e.preventDefault();
    navigate("/checkout", { state: product });
  };
  return (
    <>
      <Navbar />
      <section className="container min-vh-100">
        <div className="row my-3" style={{ padding: "5px" }}>
          <div className="col-md-3" style={{ padding: "0", height: "300px"}}>
            <img
              src={product.images[0]}
              className="img-fluid rounded"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <h3>Title: {product.productName}</h3>
            <p className="card-text">About Game: {product.description}</p>
            <p className="card-text">
              Platform: {product.platform} - Genre: {product.genre} - Release
              Date: {product.releaseDate}
            </p>
            <p className="card-text">
              Condition: {product.condition} -{" "}
              <strong>Price: Rs.{product.price}</strong>
            </p>
            <p className="card-text">Rating: {product.rating}/5</p>
            <p className="card-text">Delivery: Free</p>
            <div className="d-flex">
              <button className="btn btn-secondary">Add to Cart</button>
              <button
                onClick={(e) => handleBuyNow(e, product)}
                className="btn btn-dark mx-3"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <h3>Products You May Like</h3>
          <div className="row">
            {randomizeCart ? (
              randomizeCart.map((cart, i) => (
                <div className="col-md-3" key={i} >
                  <div className="card" style={{ pointerEvents: "none" }}>
                    <img
                      className="card-img-top img-fluid"
                      src={cart.images[0]}
                      style={{ width: "260px", height: "250px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{cart.productName}</h5>
                      <p className="card-text">Price: Rs. {cart.price}</p>
                      <p className="card-text">Platform: Rs. {cart.platform}</p>
                      <a href="#" className="btn btn-primary">
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Data Available</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default ProductDetails;
