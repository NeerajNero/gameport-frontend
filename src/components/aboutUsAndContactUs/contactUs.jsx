import Footer from "../homePageComps/footer"
import Navbar from "../homePageComps/navBar"

const ContactUs = () => {
    return(
        <>
        <Navbar />
            <section className="container min-vh-100">
                <h2 className="my-3">Contact Us</h2>
                <p>We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help.</p>
                <h4 className="my-2">Get in Touch</h4>
                <ul className="my-3">
                   <li><strong>Email: </strong>Support@gameport.com <p>Reach out to us for any inquiries or support needs. We strive to respond to all emails within 24 hours.</p></li> 
                   <li><strong>Phone: </strong>+1 (123) 456-7890 <p>Call us during our business hours (Monday to Friday, 9:00 AM - 5:00 PM) for immediate assistance.</p></li>
                   <li><strong>Address: </strong>GamePort <p>123 Game Street, Suite 456
                   City, State, ZIP Code: 123456</p></li>
                </ul>
                <h4 className="my-3">Connect with Us on Social Media</h4>
                <p>Follow us on our social media channels to stay up-to-date with new releases, promotions, and news.</p>
                <ul>
                    <li><strong>Facebook: </strong>facebook.com/gameport</li>
                    <li><strong>Twitter (x): </strong>x.com/gameport</li>
                    <li><strong>Instagram: </strong>instagaram.com/gameport</li>
                    <li><strong>Linkedin: </strong>linkedin.com/gameport</li>
                </ul>
                <strong>Our Support Commitment
                Your satisfaction is our top priority. We’re dedicated to providing timely and helpful support for any questions or issues you may have. Thank you for choosing GamePort!</strong>
            </section>
        <Footer />
        </>
    )
}
export default ContactUs