import { Link } from "react-router-dom";
import logoImage from '../../assets/logo.png'; // Update the path to your logo image

const Footer = () => {
    return (
        <footer className="bg-black/60 backdrop-blur-md border-t border-gray-700 text-gray-400">
            {/* Main Footer Section */}
            <div className="container mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex title-font font-medium items-center text-white">
                <img 
                        src="src/assets/logo.png" 
                        alt="ELogo" 
                        className="h-14 mr-10" // Adjust height as needed
                    />
                    {/* <span className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
                        E-PAKISTAN
                    </span> */}
                </Link>

                {/* Copyright & Link */}
                <p className="text-sm mt-4 sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-600 sm:pl-4">
                    © 2024 SMIT ! E-COMEMRCE 
                   
                </p>

                {/* Social Media Icons */}
                <div className="flex mt-4 sm:mt-0">
                    <SocialIcon platform="facebook" />
                    <SocialIcon platform="twitter" />
                    <SocialIcon platform="instagram" />
                    <SocialIcon platform="linkedin" />
                </div>
            </div>
        </footer>
    );
};

// Social Icon Component
const SocialIcon = ({ platform }) => {
    const icons = {
        facebook: (
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        ),
        twitter: (
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        ),
        instagram: (
            <>
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </>
        ),
        linkedin: (
            <>
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx={4} cy={4} r={2} />
            </>
        ),
    };

    return (
        <a
            href={`https://${platform}.com`} // Change this to the appropriate URL
            className="ml-3 text-gray-400 hover:text-white transition-transform transform hover:scale-125 duration-300 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
            >
                {icons[platform]}
            </svg>
        </a>
    );
};

export default Footer;
