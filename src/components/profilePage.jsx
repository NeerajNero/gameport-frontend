import { useSelector } from "react-redux"
import Footer from "./homePageComps/footer"
import Navbar from "./homePageComps/navBar"
import { getFullUserDetails } from "../features/userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const ProfilePage = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.user)
    const storedUserDetails = userDetails?.userDetails || null
    console.log(storedUserDetails)
    useEffect(() => {
        
            dispatch(getFullUserDetails())
        
    },[storedUserDetails])
    return(
        <>
            <Navbar/>
                <section className="container py-3 min-vh-100">
                    <h3>Profile Details</h3>
                    <hr/>
                    <p>Name: {storedUserDetails.userName}</p>
                    <p>Email: {storedUserDetails.email}</p>
                </section>
            <Footer/>
        </>
    )
}
export default ProfilePage