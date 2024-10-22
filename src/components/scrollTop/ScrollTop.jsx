import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiArrowUpCircle } from "react-icons/fi"; // Icon from react-icons

const ScrollTop = () => {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Smooth scroll to top when route changes
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300); // Ensures all components are rendered

        setIsVisible(false); // Hide the indicator when navigating
    }, [pathname]);

    // Show indicator when scrolling down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {/* Fancy Scroll-to-Top Button */}
            {isVisible && (
                <div
                    className="fixed bottom-5 right-5 z-50 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <FiArrowUpCircle size={50} className="text-gray-300 hover:text-white" />
                </div>
            )}
        </>
    );
};

export default ScrollTop;
