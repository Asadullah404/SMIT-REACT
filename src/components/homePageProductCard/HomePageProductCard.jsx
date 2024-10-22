import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    // Add to cart function
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    // Delete from cart function
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10">
            {/* Heading */}
            <div>
                <h1 className="text-center mb-8 text-3xl font-bold text-white tracking-wide">
                    Bestselling Products
                </h1>
            </div>

            {/* Main Section */}
            <section className="text-gray-400 body-font bg-gradient-to-b from-black via-gray-900 to-black">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>

                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;

                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div
                                        className="h-full border border-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-900 cursor-pointer"
                                    >
                                        {/* Product Image */}
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-72 h-96 w-full object-cover transition-opacity duration-300 hover:opacity-90"
                                            src={productImageUrl}
                                            alt="product"
                                        />

                                        {/* Product Info */}
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs font-medium text-gray-500 mb-1">
                                                E-PAKISTAN
                                            </h2>
                                            <h1 className="text-lg font-semibold text-white mb-2">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="text-lg font-bold text-white mb-4">
                                                Rs {price}
                                            </h1>

                                            {/* Add/Delete Button */}
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg font-bold text-white shadow-md transition-all duration-300">
                                                        Delete From Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-lg font-bold text-white shadow-md transition-all duration-300">
                                                        Add To Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
