import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity, clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Debugging to verify state updates
    useEffect(() => {
        console.log("Cart Items: ", cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const buyNowFunction = async () => {
        if (
            !addressInfo.name || 
            !addressInfo.address || 
            !addressInfo.pincode || 
            !addressInfo.mobileNumber
        ) {
            return toast.error("All fields are required");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        };

        try {
            const orderRef = collection(fireDB, 'order');
            await addDoc(orderRef, orderInfo);
            dispatch(clearCart()); // Clear the cart after placing the order
            setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" });
            toast.success("Order placed successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to place the order");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8 shadow-lg">
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category } = item;
                                        return (
                                            <li key={index} className="flex py-6">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={productImageUrl}
                                                        alt="Product"
                                                        className="h-24 w-24 rounded-md object-contain object-center shadow-md"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                                                            <p className="text-sm text-gray-500 mt-1">{category}</p>
                                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                                Rs.{price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2 flex items-center">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => handleDecrement(id)}
                                                            className="bg-gray-200 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-300"
                                                        >
                                                            -
                                                        </button>
                                                        {/* Updated to bind quantity properly */}
                                                        <input
                                                            type="number"
                                                            value={quantity}
                                                            className="mx-1 h-8 w-12 text-center border rounded-md"
                                                            readOnly
                                                        />
                                                        <button
                                                            onClick={() => handleIncrement(id)}
                                                            className="bg-gray-200 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-300"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="ml-6 text-red-500 hover:text-red-700 flex items-center space-x-1"
                                                    >
                                                        <Trash size={12} />
                                                        <span className="text-xs font-medium">Remove</span>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <h1 className="text-center text-xl text-gray-700">Your cart is empty.</h1>
                                )}
                            </ul>
                        </section>

                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 shadow-lg"
                        >
                            <h2 id="summary-heading" className="border-b px-4 py-3 text-lg font-medium text-gray-900">
                                Price Details
                            </h2>
                            <dl className="space-y-1 px-4 py-4">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-800">Price ({cartItemTotal} items)</dt>
                                    <dd className="text-sm font-medium text-gray-900">Pkr.{cartTotal}</dd>
                                </div>
                                <div className="flex justify-between py-4">
                                    <dt className="text-sm text-gray-800">Delivery Charges</dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex justify-between border-y py-4">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">Pkr.{cartTotal}</dd>
                                </div>
                            </dl>
                            <div className="px-4 pb-4">
                                {user ? (
                                    <BuyNowModal
                                        addressInfo={addressInfo}
                                        setAddressInfo={setAddressInfo}
                                        buyNowFunction={buyNowFunction}
                                    />
                                ) : (
                                    <Navigate to="/login" />
                                )}
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
