import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
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

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Failed to add product");
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col">
            <Navbar /> {/* Include the Navbar */}
            
            <div className='flex-grow flex justify-center items-center'>
                {loading && <Loader />}
                <div className="bg-gray-800 px-8 py-6 border border-gray-600 rounded-xl shadow-md w-full max-w-md transform transition-transform duration-300 hover:scale-105">
                    <h2 className='text-center text-3xl font-bold text-white mb-6'>
                        Add Product
                    </h2>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-gray-700 border text-white border-gray-600 px-3 py-2 w-full rounded-md outline-none placeholder-gray-400 transition duration-300 focus:border-blue-500'
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-gray-700 border text-white border-gray-600 px-3 py-2 w-full rounded-md outline-none placeholder-gray-400 transition duration-300 focus:border-blue-500'
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder='Product Image URL'
                            className='bg-gray-700 border text-white border-gray-600 px-3 py-2 w-full rounded-md outline-none placeholder-gray-400 transition duration-300 focus:border-blue-500'
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md outline-none transition duration-300 focus:border-blue-500"
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option className="first-letter:uppercase" key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="5"
                            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md outline-none placeholder-gray-400 transition duration-300 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-blue-600 hover:bg-blue-500 w-full text-white text-center py-2 font-bold rounded-md transition duration-300'
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            <Footer /> {/* Include the Footer */}
        </div>
    );
}

export default AddProductPage;
