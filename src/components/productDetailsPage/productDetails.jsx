import { useLocation } from "react-router-dom"
import Navbar from "../homePageComps/navBar";
const ProductDetails = () => {
    const location = useLocation();
    const {product} = location.state || {};
    console.log(product)
    return(
        <>
        <Navbar />
        <section className="container min-vh-100" style={{border: "2px solid red"}}>
            <div className="row" style={{ padding: "5px"}}>
                <div className="col-md-4" style={{ padding: "0"}}>
                    <img src={product.images[0]} className="img-fluid rounded" style={{height: "350px", width: "400px"}}/>
                </div>
                <div className="col-md-8" >
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
                        <p className="card-text">Stock: {product.stock}</p>
                        <div className="d-flex">
                          <button className="btn btn-primary">
                            Add to Cart
                          </button>
                          <button className="btn btn-info mx-3">
                            Buy Now
                          </button>
                        </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default ProductDetails