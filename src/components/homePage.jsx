import Category from "./homePageComps/category"
import Footer from "./homePageComps/footer"
import Delivery from "./homePageComps/freeDelivery"
import GameCarousel from "./homePageComps/gameCarousel"
import Navbar from "./homePageComps/navBar"
const HomePage = () => {
    return (
        <>
        <Navbar />
        <Delivery />
        <GameCarousel />
        <Category />
        <Footer />
        </>
    )
}
export default HomePage