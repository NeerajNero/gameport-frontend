import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from '../features/userSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault();
                const user = {
                    userName,
                    email,
                    password
                }
                dispatch(userRegistration({user})).unwrap().then(() => {
                    toast.success("Registration Successful")
                    setTimeout(() => navigate('/login'), 2000)
                }).catch((error) => {
                toast.error("Registration failed. Please try again later.")
                console.error(error)
                    })}

    return(
        <div className='container-fluid vh-100 d-flex align-items-center login-container'> {/* main div */}
            <div className='row w-100'>
                {/*left side of the page, our info section */}
                <div className='col-md-6 info-section text-white p-5 d-flex flex-column justify-content-center'>
                <h1>Welcome to GamePort</h1>
                    <p>
                        Discover the best PS5 and Xbox game discs, both new and pre-owned.
                        Find your favorite titles and connect with other gamers.
                    </p>
                    <p>Fast shipping, secure payments, and quality assurance on all purchases.</p>
                </div>
                {/*right side of the page, our login box section */}
                <div className='col-md-6 d-flex align-items-center justify-content-center' id='loginBoxMargin'> 
                    <div className='login-box p-4 shadow rounded'>
                        <h3 className="text-center mb-4">Sign Up</h3>
                    <form onSubmit={handleForm}>
                    <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="username" placeholder="Enter your username" />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter your password" />
                            </div>
                            
                            <button type="submit" className="btn btn-dark w-100 mb-3">Signup</button>
                            <div className="text-center">
                                <Link to="/login" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Already a User? Log In</Link>
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupPage