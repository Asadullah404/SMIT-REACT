import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("users"));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);

    const logout = () => {
        localStorage.clear("users");
        navigate("/login");
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <motion.nav
            className="bg-white/10 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-gray-700"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
        >
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2">
                    <motion.h2
                        className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-gray-400 via-gray-200 to-white"
                        whileHover={{ scale: 1.1 }}
                    >
                       <img 
                        src="src/assets/logo.png" 
                        alt=" Logo" 
                        className="h-14 mr-10" // Adjust height as needed
                    />
                    </motion.h2>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <NavList user={user} cartItems={cartItems} logout={logout} />
                    <SearchBar />
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="lg:hidden p-2 text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.9 }}
                >
                    {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                </motion.button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="lg:hidden bg-white/5 backdrop-blur-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center gap-6 py-6">
                            <NavList user={user} cartItems={cartItems} logout={logout} />
                            <SearchBar />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// NavList Component
const NavList = ({ user, cartItems, logout }) => (
    <ul className="flex flex-col lg:flex-row items-center gap-6 text-gray-300 font-medium">
        <NavItem to="/" label="Home" />
        <NavItem to="/allproduct" label="All Products" />
        {!user && <NavItem to="/signup" label="Signup" />}
        {!user && <NavItem to="/login" label="Login" />}
        {user?.role === "user" && <NavItem to="/user-dashboard" label="User Dashboard" />}
        {user?.role === "admin" && <NavItem to="/admin-dashboard" label="Admin Dashboard" />}
        {user && (
            <li
                className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-300"
                onClick={logout}
            >
                Logout
            </li>
        )}
        <NavItem to="/cart" label={`Cart (${cartItems.length})`} />
    </ul>
);

// Reusable NavItem Component with Animation
const NavItem = ({ to, label }) => (
    <motion.li
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 150 }}
    >
        <Link
            to={to}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-md hover:bg-gray-500 transition-all duration-300"
        >
            {label}
        </Link>
    </motion.li>
);

export default Navbar;
