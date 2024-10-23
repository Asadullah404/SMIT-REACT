import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar"; // Ensure this component exists
import Footer from "../../components/footer/Footer"; // Ensure this component exists

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    // navigate 
    const navigate = useNavigate();
    const { id } = useParams();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity: product?.quantity,
                time: product?.time,
                date: product?.date
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-gray-800">
            <Navbar /> {/* Add Navbar here */}
            <div className="flex-grow flex items-center justify-center py-10">
                {loading && <Loader />}
                {/* Update Product Form */}
                <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105">
                    {/* Top Heading */}
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-white tracking-wide">Update Product</h2>
                    </div>

                    {/* Input Fields */}
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-md placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-md placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder='Product Image URL'
                            className='bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-md placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="4"
                            className="bg-gray-700 text-white border border-gray-600 rounded-md px-4 py-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400">
                        </textarea>
                    </div>

                    {/* Update Product Button */}
                    <div className="mt-6">
                        <button
                            onClick={updateProduct}
                            type='button'
                            className='bg-blue-600 hover:bg-blue-500 w-full text-white text-center py-3 font-bold rounded-md transition duration-200 shadow-md'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
            <Footer /> {/* Add Footer here */}
        </div>
    );
}

export default UpdateProductPage;
