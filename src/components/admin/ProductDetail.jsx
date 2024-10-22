import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen py-8 px-4 md:px-10">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-2xl text-white font-extrabold">All Products</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-gray-700 text-white hover:bg-gray-600 transition rounded-lg shadow-md">
                        Add Product
                    </button>
                </Link>
            </div>

            {loading && (
                <div className="flex justify-center mt-10">
                    <Loader />
                </div>
            )}

            <div className="w-full overflow-x-auto bg-gray-800 shadow-md rounded-lg mt-8">
                <table className="w-full text-left border-collapse text-gray-300">
                    <thead className="bg-gray-700 text-white font-semibold">
                        <tr>
                            <th className="px-6 py-4">S.No.</th>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Edit</th>
                            <th className="px-6 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={index} className="border-b border-gray-700 hover:bg-gray-600 transition">
                                    <td className="px-6 py-4">{index + 1}.</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <img className="w-20 rounded-lg shadow-sm" src={productImageUrl} alt={title} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 capitalize">{title}</td>
                                    <td className="px-6 py-4">Rs {price}</td>
                                    <td className="px-6 py-4 capitalize">{category}</td>
                                    <td className="px-6 py-4">{date}</td>
                                    <td
                                        onClick={() => navigate(`/updateproduct/${id}`)}
                                        className="px-6 py-4 text-green-400 cursor-pointer hover:underline"
                                    >
                                        Edit
                                    </td>
                                    <td
                                        onClick={() => deleteProduct(id)}
                                        className="px-6 py-4 text-red-400 cursor-pointer hover:underline"
                                    >
                                        Delete
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
