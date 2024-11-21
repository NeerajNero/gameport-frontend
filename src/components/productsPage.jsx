import Navbar from "./homePageComps/navBar"
import Delivery from "./homePageComps/freeDelivery"
import ProductListing from "./productsPageComps/productListing"
import Footer from "./homePageComps/footer"
const ProductsPage = () => {

    return (
        <>
        <Navbar />
        <Delivery />
        <ProductListing />
        <Footer />
        </>
    )
}
export default ProductsPage