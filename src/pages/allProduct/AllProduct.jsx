import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [minPrice, setMinPrice] = useState(""); // State for minimum price filter
    const [maxPrice, setMaxPrice] = useState(""); // State for maximum price filter
    const [sortOrder, setSortOrder] = useState(""); // State for sorting order

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Filter products based on price range and sort them
    const filteredProducts = getAllProduct
        .filter((item) => {
            if (minPrice && maxPrice) {
                return item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice);
            }
            if (minPrice) {
                return item.price >= parseFloat(minPrice);
            }
            if (maxPrice) {
                return item.price <= parseFloat(maxPrice);
            }
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "low-to-high") {
                return a.price - b.price;
            }
            if (sortOrder === "high-to-low") {
                return b.price - a.price;
            }
            return 0;
        });

    return (
        <Layout>
            <div className="py-8 bg-gray-900 text-white">
                {/* Heading */}
                <div>
                    <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
                </div>

                {/* Filter and Sort Section */}
                <div className="flex flex-wrap justify-between items-center mb-6 px-5 lg:px-0">
                    {/* Price Range Filter */}
                    <div className="flex gap-4">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="">Sort by</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Main Section */}
                <section className="text-gray-400 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {filteredProducts.map((item, index) => {
                                const { id, title, price, productImageUrl } = item;
                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-700 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-800">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80 h-96 w-full"
                                                src={productImageUrl}
                                                alt="Product"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                    E-bharat
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-200 mb-3">
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-200 mb-3">
                                                    Rs.{price}
                                                </h1>

                                                <div className="flex justify-center">
                                                    {cartItems.some((p) => p.id === item.id) ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="bg-gray-600 hover:bg-gray-500 w-full text-white py-2 rounded-lg font-bold"
                                                        >
                                                            Remove From Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="bg-gray-500 hover:bg-gray-400 w-full text-white py-2 rounded-lg font-bold"
                                                        >
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
        </Layout>
    );
};

export default AllProduct;
