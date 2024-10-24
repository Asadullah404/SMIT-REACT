/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar"; // Import Navbar
import Footer from "../../components/footer/Footer"; // Import Footer

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/
    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
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

            // create user Reference
            const userReference = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userReference, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Signup Failed");
        }
    };

    return (
        <div className='bg-gray-900 text-white'>
            {loading && <Loader />}
            <Navbar /> {/* Add Navbar */}

            {/* Signup Form  */}
            <div className="flex justify-center items-center h-screen">
                <div className="signup_Form bg-gray-800 px-8 py-6 border border-gray-600 rounded-xl shadow-md">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-white'>
                            Signup
                        </h2>
                    </div>

                    {/* Input for Full Name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Full Name'
                            value={userSignup.name}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    name: e.target.value
                                });
                            }}
                            className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
                        />
                    </div>

                    {/* Input for Email Address */}
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder='Email Address'
                            value={userSignup.email}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    email: e.target.value
                                });
                            }}
                            className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
                        />
                    </div>

                    {/* Input for Password */}
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder='Password'
                            value={userSignup.password}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    password: e.target.value
                                });
                            }}
                            className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
                        />
                    </div>

                    {/* Signup Button  */}
                    <div className="mb-5">
                        <button
                            type='button'
                            onClick={userSignupFunction}
                            className='bg-gray-600 hover:bg-gray-500 w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Signup
                        </button>
                    </div>

                    <div>
                        <h2 className='text-gray-300'>Have an account? <Link className='text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                    </div>
                </div>
            </div>

            <Footer /> {/* Add Footer */}
        </div>
    );
}

export default Signup;
