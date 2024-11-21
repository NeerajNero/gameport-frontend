import { Link } from "react-router-dom";
const Category = () => {
    const genres = ["Action", "Adventure", "Sports", "RPG", "Simulation", "Strategy"];
    return(
        <>
        <section className="container my-5">
      <h2 className="text-center mb-4">Explore by Genre</h2>
      <div className="row">
        {genres.map((genre, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Link id="links" to="/products" state={{genre}} className="card">
              <img id="category-image" src={`/category/${genre.toLowerCase()}.jpg`} className="card-img-top" alt={`${genre} Genre`} style={{objectFit: "cover"}}/>
              <div className="card-body">
                <h5 className="card-title text-center">{genre}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
        </>
    )
}
export default Category