import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="mt-10 bg-gray-900 text-white">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold first-letter:uppercase">{categoryname}</h1>
                </div>

                {/* Main */}
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                {filterProduct.length > 0 ? (
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl } = item;
                                        return (
                                            <div key={index} className="max-w-sm w-full border border-gray-600 rounded-xl overflow-hidden shadow-lg bg-gray-800 transition-transform transform hover:scale-105">
                                                <img
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    className="lg:h-80 h-64 w-full object-cover transition-transform duration-300 transform hover:scale-110"
                                                    src={productImageUrl}
                                                    alt={title}
                                                />
                                                <div className="p-6">
                                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                        E-bharat
                                                    </h2>
                                                    <h1 className="title-font text-lg font-medium text-white mb-3">
                                                        {title.length > 25 ? title.substring(0, 25) + "..." : title}
                                                    </h1>
                                                    <h1 className="title-font text-lg font-medium text-white mb-3">
                                                        ₹{price}
                                                    </h1>

                                                    <div className="flex justify-center">
                                                        {cartItems.some((p) => p.id === item.id) ? (
                                                            <button
                                                                onClick={() => deleteCart(item)}
                                                                className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold transition duration-300">
                                                                Remove from Cart
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => addCart(item)}
                                                                className="bg-green-600 hover:bg-green-500 w-full text-white py-2 rounded-lg font-bold transition duration-300">
                                                                Add to Cart
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <img className="mb-2 w-24 h-24" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        <h1 className="text-white text-xl">No {categoryname} product found</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}

export default CategoryPage;
