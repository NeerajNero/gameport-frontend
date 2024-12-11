import Footer from "../homePageComps/footer"
import Navbar from "../homePageComps/navBar"

const AboutUs = () => {
    return (
        <>
        <Navbar />
            <section className="container min-vh-100">
                <h2 className="my-3">About Us</h2>
                <p className="my-2">Welcome to GamePort, your one-stop destination for buying gaming discs for platforms like PS5 and Xbox. We are passionate gamers who understand the excitement of exploring new worlds and the thrill of immersive gaming experiences.</p>
                <p className="my-2">Our platform is designed to connect gaming enthusiasts, offering a seamless way to buy or sell pre-owned and new gaming discs. With an intuitive interface, secure transactions, and a wide selection of titles, we aim to make gaming more accessible and affordable for everyone.</p>
                <p className="my-2">Whether you’re a casual player or a hardcore gamer, GamePort is here to keep your gaming journey alive and exciting. Join us and experience the joy of gaming like never before!</p>
                <img src="https://assets.gqindia.com/photos/645c750df0141edcb0cc1771/16:9/w_2560%2Cc_limit/100-best-games-hp-b.jpg" className="img-fluid my-3 rounded" style={{width: "900px", height: "480px"}}/>
            </section>
        <Footer />
        </>
    )
}
export default AboutUs