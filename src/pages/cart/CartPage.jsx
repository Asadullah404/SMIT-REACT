import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // User
    const user = JSON.parse(localStorage.getItem('users'));

    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = () => {
        // Validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All fields are required");
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            });
            toast.success("Order placed successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8 shadow-lg">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ?
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
                                                            <div className="flex justify-between">
                                                                <h3 className="text-sm font-semibold text-gray-900">
                                                                    {title}
                                                                </h3>
                                                            </div>
                                                            <div className="mt-1 flex text-sm">
                                                                <p className="text-sm text-gray-500">{category}</p>
                                                            </div>
                                                            <div className="mt-1 flex items-end">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    Pkr.{price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2 flex items-center">
                                                    <div className="min-w-24 flex items-center">
                                                        <button onClick={() => handleDecrement(id)} type="button" className="bg-gray-200 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-300">
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="mx-1 h-8 w-12 rounded-md border text-center"
                                                            value={quantity}
                                                            readOnly
                                                        />
                                                        <button onClick={() => handleIncrement(id)} type="button" className="bg-gray-200 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-300">
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="ml-6 flex text-sm">
                                                        <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0 text-red-500 hover:text-red-700">
                                                            <Trash size={12} />
                                                            <span className="text-xs font-medium">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }) :
                                    <h1 className="text-center text-xl text-gray-700">Your cart is empty.</h1>
                                }
                            </ul>
                        </section>
                        {/* Order Summary */}
                        <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0 shadow-lg">
                            <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
                                Price Details
                            </h2>
                            <div>
                                <dl className="space-y-1 px-4 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item{cartItemTotal !== 1 ? "s" : ""})</dt>
                                        <dd className="text-sm font-medium text-gray-900">Pkr.{cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">Delivery Charges</dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">Pkr.{cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-4 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                        {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            />
                                            : <Navigate to={'/login'} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
