import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;

    return (
        <div className="bg-gray-900 min-h-screen p-8 text-white">
            <div className="py-5">
                {/* Title */}
                <h1 className="text-2xl text-pink-300 font-bold">All Orders</h1>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-gray-700 text-gray-300">
                    <thead>
                        <tr>
                            {[
                                "S.No.",
                                "Order Id",
                                "Image",
                                "Title",
                                "Category",
                                "Price",
                                "Quantity",
                                "Total Price",
                                "Status",
                                "Name",
                                "Address",
                                "Pincode",
                                "Phone Number",
                                "Email",
                                "Date",
                                "Action"
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    className="h-12 px-6 text-md border-l first:border-l-0 border-gray-600 text-gray-300 bg-gray-800 font-bold"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getAllOrder.map((order, orderIndex) => (
                            <>
                                {order.cartItems.map((item, itemIndex) => {
                                    const { id, productImageUrl, title, category, price, quantity } = item;
                                    return (
                                        <tr key={itemIndex} className="text-gray-200 hover:bg-gray-700 transition">
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {itemIndex + 1}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {id}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                <img src={productImageUrl} alt="img" className="w-12 h-12 rounded" />
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {title}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {category}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                Rs {price}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {quantity}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                Rs {price * quantity}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-green-400">
                                                {order.status}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.addressInfo.name}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.addressInfo.address}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.addressInfo.pincode}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.addressInfo.mobileNumber}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.email}
                                            </td>
                                            <td className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-gray-300">
                                                {order.date}
                                            </td>
                                            <td
                                                onClick={() => orderDelete(order.id)}
                                                className="h-12 px-6 border-t border-l first:border-l-0 border-gray-600 text-red-500 cursor-pointer hover:text-red-700"
                                            >
                                                Delete
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
