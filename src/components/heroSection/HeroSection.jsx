import { useEffect, useState } from "react";

const images = [
    "../img/hero-gray.png",
    "../img/hero1-gray.png",
    "../img/hero2-gray.png",
    "../img/hero3-gray.png"
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Automatically change image every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(nextImage, 3000); // Change image every 3 seconds
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="relative overflow-hidden">
            <img
                className="h-44 lg:h-full transition-opacity duration-700 ease-in-out"
                src={images[currentIndex]}
                alt={`Hero Image ${currentIndex + 1}`}
            />
            {/* Optional: You can add indicators or buttons here */}
        </div>
    );
};

export default HeroSection;
