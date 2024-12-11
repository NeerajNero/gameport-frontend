import { useSelector } from "react-redux"
import Footer from "./homePageComps/footer"
import Navbar from "./homePageComps/navBar"
import { getFullUserDetails } from "../features/userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAddress, deleteAddress, addAddress } from "../features/addressSlice"
import { useState } from "react"

const ProfilePage = () => {
    const [displayStatus, setDisplayStatus] = useState(false)
    const [address, setAddress] = useState("")
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.user)
    const storedUserDetails = userDetails?.userDetails || null
    const userAddress = useSelector((state) => state.address)
    const storedUserAddress = userAddress?.address || null
    useEffect(() => {
            dispatch(getFullUserDetails())
    },[])
    useEffect(() => {
        dispatch(getAddress())
    },[])

    const handleDelete = (e, addressId) => {
        e.preventDefault()
        dispatch(deleteAddress({addressId}))
    }
    const handleAddresSection = (e) => {
        e.preventDefault()
        setDisplayStatus(!displayStatus)
    }
    const handleAddAddress = (e) => {
        e.preventDefault()
        dispatch(addAddress({address}))
    }
    return(
        <>
            <Navbar/>
                <section className="container py-3 min-vh-100">
                    <h3>Profile Details</h3>
                    <hr/>
                    <p>Name: {storedUserDetails.userName}</p>
                    <p>Email: {storedUserDetails.email}</p>
                    <div>
                        <p>Addresses: </p> <button onClick={handleAddresSection} className="btn btn-dark">Add New Address {!displayStatus ? "(Expand)" : "(Collapse)"}</button>
                        {displayStatus && <form className="my-2" onSubmit={handleAddAddress}>
                            <label>Add Full Address Below</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>
                            <button className="btn btn-primary my-2">Add</button>
                        </form>}
                        <ul className="list-group">
                            {storedUserAddress? storedUserAddress.map((address, index) => (<li className="my-2 list-group-item" key={index}>Address-{index + 1}: {address.address} <button onClick={(e) => handleDelete(e, address._id)} className="btn btn-danger">Delete</button></li>)) : ""}
                        </ul>
                    </div>
                </section>
            <Footer/>
        </>
    )
}
export default ProfilePage