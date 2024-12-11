import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/productSlice";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { addToWishlist } from "../../features/wishlistSlice";

const ProductListing = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {genre} = location.state || ""
  const [priceRange, setPriceRange] = useState(10000); 
  const [selectedGenres, setSelectedGenres] = useState(genre ? [genre] : []);
  const [sortOrder, setSortOrder] = useState(""); 
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.products);
  const cartData = useSelector((state) => state.cart.cart)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const userState = useSelector((state)=> state.user)
  const userData = userState ? userState.user.user : []

  const data = productsData || [];

  // Handle genre selection
  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre] 
    );
  };
  const filteredData = data.filter((product) => product.price <= priceRange).filter((product) =>
        selectedGenres.length === 0 || selectedGenres.includes(product.genre)).sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : sortOrder === "desc" ? b.price - a.price : 0);

  const topRatedProducts = [...data]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

    const handleAddToCart = (e,product) => {
      e.preventDefault()
      if(!userData){
        toast.error("login to proceed")
        navigate('/login')
      }
      const data = {
        userId: userData.userId,
        items: [
          {
            product: product._id
          }
        ]
      }
      dispatch(addToCart({data})).unwrap().then(() => {
        toast.success("Item added to cart successfully.")
      }).catch((error) => {
        toast.error("unable to add item to cart")
      })
    }
    const handleAddToWishlist = (e,product) => {
      e.preventDefault()
      if(!userData){
        toast.error("login to proceed")
        navigate('/login')
      }
      dispatch(addToWishlist({product})).unwrap().then(() => {
        toast.success("Item added to Wishlist successfully.")
      }).catch((error) => {
        toast.error("unable to add item to wishlist")
      })
    }
  return (
    <>
      <div className="container-fluid min-vh-100 d-flex container pe-0 pt-3">
        <div className="row w-100">
          {/* Sidebar */}
          <div
            className="col-md-3 d-flex flex-column d-none d-md-block"
          >
            <h5>Top Rated Products</h5>
            <ul style={{listStyleType: "none", margin: "0", padding: "0"}}>
              {topRatedProducts.map((product) => (
                <li key={product._id}>
                  <Link id="links topRated" to="/products/productDetails" state={{product}} className="d-flex flex-column link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{textDecoration: "none"}}>
                  {product.productName}
                  <img
                    src={product.images[0]}
                    className="img-fluid"
                    style={{ height: "100px", width: "100px" }}
                    alt={product.productName}
                  />
                  <strong>Price: Rs.{product.price}</strong>
                  </Link>
                  <hr />
                </li>
              ))}
            </ul>
            {/* Filters */}
            <div>
              <label>Filter By Price</label>
              <br />
              <input className="text-dark"
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <p>Up to: Rs.{priceRange}</p>
            </div>
            <hr />
            <div>
              <label>Filter by Genre</label>
              <br />
              {["Action", "Adventure", "Sports", "RPG", "Simulation", "Strategy"].map(
                (genre) => (
                  <div key={genre}>
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />{" "}
                    {genre}
                  </div>
                )
              )}
            </div>
            <hr />
            <div>
              <label>Sort by Price</label>
              <br />
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  value="asc"
                  checked={sortOrder === "asc"}
                  onChange={() => setSortOrder("asc")}
                />{" "}
                Price Low to High
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  value="desc"
                  checked={sortOrder === "desc"}
                  onChange={() => setSortOrder("desc")}
                />{" "}
                Price High to Low
              </label>
            </div>
          </div>
          {/* Main Content */}
          <div className="col-md-9">
            <div>
              {filteredData.map((product) => (
                <div key={product._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4" id="card-img-container">  
                      <img
                        src={product.images[0]}
                        className="img-fluid rounded-start"
                        id="card-img"
                        alt="Product Image"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <Link id="links" className="card-title" to="/products/productDetails" state={{product}}>Title: {product.productName}</Link>
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
                        <div className="d-flex">
                          <button onClick={(e) => handleAddToCart(e,product)} className="btn btn-secondary">
                            Add to Cart
                          </button>
                          <button onClick={(e) => handleAddToWishlist(e,product._id)} className="btn btn-secondary mx-3">
                            Add to Wishlist
                          </button>
                          <button className="btn btn-dark">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <p className="text-center">No products match the filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
