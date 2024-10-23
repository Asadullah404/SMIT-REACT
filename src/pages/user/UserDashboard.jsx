import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear("users");
        navigate("/login");
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8 bg-gray-900 text-white">
                {/* Top */}
                <div className="top ">
                    <div className="bg-gray-800 py-5 rounded-xl border border-gray-600">
                        {/* User Info */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        <div className="">
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Name: </span>
                                {user?.name}
                            </h1>
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Email: </span>
                                {user?.email}
                            </h1>
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Date: </span>
                                {user?.date}
                            </h1>
                            <h1 className="text-center text-lg">
                                <span className="font-bold">Role: </span>
                                {user?.role}
                            </h1>

                            {/* Logout Button */}
                            <div className="flex justify-center mt-4">
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-500 transition-all duration-300"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                            <div key={index}>
                                {order.cartItems.map((item, idx) => {
                                    const { id, date, quantity, price, title, productImageUrl, category } = item;
                                    const { status } = order;
                                    return (
                                        <div key={idx} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-gray-600 md:flex-row">
                                            <div className="w-full border-r border-gray-600 bg-gray-800 md:max-w-xs">
                                                <div className="p-8">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold text-white">Order Id</div>
                                                            <div className="text-sm font-medium text-gray-300">#{id}</div>
                                                        </div>
                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold text-white">Date</div>
                                                            <div className="text-sm font-medium text-gray-300">{date}</div>
                                                        </div>
                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold text-white">Total Amount</div>
                                                            <div className="text-sm font-medium text-gray-300">Rs.{price * quantity}</div>
                                                        </div>
                                                        <div className="mb-4">
                                                            <div className="text-sm font-semibold text-white">Order Status</div>
                                                            <div className="text-sm font-medium text-gray-300">{status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow bg-gray-900 text-white md:p-8">
                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                                    <div className="col-span-2 flex gap-2">
                                                        <img
                                                            src={productImageUrl}
                                                            alt={title}
                                                            className="w-20 rounded-lg object-cover"
                                                        />
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-medium text-gray-300">{title}</div>
                                                            <div className="text-sm font-medium text-gray-300">Category: {category}</div>
                                                            <div className="text-sm font-medium text-gray-300">Quantity: {quantity}</div>
                                                            <div className="text-sm font-medium text-gray-300">Price: Rs.{price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
