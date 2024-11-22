import Category from "./homePageComps/category"
import Footer from "./homePageComps/footer"
import Delivery from "./homePageComps/freeDelivery"
import GameCarousel from "./homePageComps/gameCarousel"
import Navbar from "./homePageComps/navBar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUser } from "../features/userSlice"
const HomePage = () => {
    const dispatch = useDispatch()
    const userState = useSelector((state)=> state.user)
  const userData = userState ? userState.user.user : []
  console.log(userData)

  useEffect(() => {
    if(!userData || userData.length === 0){
      dispatch(getUser())
    }
  },[userData,dispatch])

  useEffect(() => {
    if(userData?.user){
        console.log("session storage")
        sessionStorage.setItem("userName", userData.user.userName)
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