import { useSelector } from "react-redux"
import Footer from "./homePageComps/footer"
import Navbar from "./homePageComps/navBar"
import { getFullUserDetails } from "../features/userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAddress } from "../features/addressSlice"

const ProfilePage = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.user)
    const storedUserDetails = userDetails?.userDetails || null
    const userAddress = useSelector((state) => state.address)
    const storedUserAddress = userAddress?.address || null
    console.log(storedUserAddress)
    useEffect(() => {
            dispatch(getFullUserDetails())
    },[])
    useEffect(() => {
        dispatch(getAddress())
    },[])
    return(
        <>
            <Navbar/>
                <section className="container py-3 min-vh-100">
                    <h3>Profile Details</h3>
                    <hr/>
                    <p>Name: {storedUserDetails.userName}</p>
                    <p>Email: {storedUserDetails.email}</p>
                    <div>
                        <p>Addresses: </p> <button className="btn btn-primary">Add New Address</button>
                        <ul className="list-group">
                            {storedUserAddress? storedUserAddress.map((address, index) => (<li className="my-2 list-group-item" key={index}>Address-{index + 1}: {address.address} <button className="btn btn-danger">Delete</button></li>)) : ""}
                        </ul>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
export default ProfilePage