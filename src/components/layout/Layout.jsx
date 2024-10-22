import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

/* eslint-disable react/prop-types */
const Layout = ({ children }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="main-content bg-gray-800 min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
