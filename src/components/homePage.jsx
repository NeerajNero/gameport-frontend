import Category from "./homePageComps/category"
import Footer from "./homePageComps/footer"
import Delivery from "./homePageComps/freeDelivery"
import GameCarousel from "./homePageComps/gameCarousel"
import Navbar from "./homePageComps/navBar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
const HomePage = () => {
    const userState = useSelector((state)=> state.user)
  const userData = userState?.user?.user || null
  console.log(userData)

  useEffect(() => {
    if(userData){
        console.log("local storage")
        localStorage.setItem("userName", JSON.stringify(userData.userName))
    }
  },[userData])
 
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