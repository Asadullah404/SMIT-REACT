import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState('');

    const { id } = useParams();

    // Get product data
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins bg-gray-900 text-white">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            {/* Image Section */}
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="relative">
                                    <img
                                        className="w-full lg:h-[39em] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                                        src={product?.productImageUrl}
                                        alt={product?.title}
                                    />
                                </div>
                            </div>

                            {/* Product Details Section */}
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <h2 className="mb-4 text-3xl font-semibold leading-loose tracking-wide text-gray-300">
                                        {product?.title}
                                    </h2>
                                    
                                    {/* Rating Section */}
                                    <div className="flex items-center mb-6">
                                        <ul className="flex mb-4 mr-2 lg:mb-0">
                                            {[...Array(5)].map((_, index) => (
                                                <li key={index}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={20}
                                                        height={20}
                                                        fill="currentColor"
                                                        className="w-5 mr-1 text-red-500"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                    </svg>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="inline-block text-2xl font-semibold text-gray-300 mb-4">
                                        <span>Pkr. {product?.price}</span>
                                    </p>

                                    {/* Description Section */}
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-300">
                                            Description:
                                        </h2>
                                        <p className="text-gray-400">{product?.description}</p>
                                    </div>

                                    {/* Cart Button Section */}
                                    <div className="flex flex-wrap items-center mb-6">
                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="w-full px-4 py-3 text-center text-white bg-red-500 border border-red-600 hover:bg-red-600 rounded-xl transition duration-200 ease-in-out"
                                            >
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addCart(product)}
                                                className="w-full px-4 py-3 text-center text-gray-900 bg-gray-300 hover:bg-gray-400 rounded-xl transition duration-200 ease-in-out"
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
}


export default ProductInfo;
