import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [minPrice, setMinPrice] = useState(""); // State for minimum price filter
    const [maxPrice, setMaxPrice] = useState(""); // State for maximum price filter
    const [sortOrder, setSortOrder] = useState(""); // State for sorting

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

    // Filter products based on search query and price range
    const filteredProducts = getAllProduct
        .filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
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
        <div className="bg-gray-900 min-h-screen py-8 px-4 md:px-10">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-2xl text-white font-extrabold">All Products</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-gray-700 text-white hover:bg-gray-600 transition rounded-lg shadow-md">
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="mt-4 mb-6 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by product title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                {/* Price Range Filter */}
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                {/* Sorting Option */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                    <option value="">Sort by</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
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
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, index) => {
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
                            })
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-400">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetail;
