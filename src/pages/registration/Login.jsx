// /* eslint-disable react/no-unescaped-entities */
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import myContext from "../../context/myContext";
// import toast from "react-hot-toast";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, fireDB } from "../../firebase/FirebaseConfig";
// import Loader from "../../components/loader/Loader";
// import { collection, onSnapshot, query, where } from "firebase/firestore";


// const Login = () => {
//     const context = useContext(myContext);
//     const { loading, setLoading } = context;

//     // navigate 
//     const navigate = useNavigate();

//     // User Login State 
//     const [userLogin, setUserLogin] = useState({
//         email: "",
//         password: ""
//     });

//     /**========================================================================
//      *                          User Login Function 
//     *========================================================================**/

//     const userLoginFunction = async () => {
//         // validation 
//         if (userLogin.email === "" || userLogin.password === "") {
//             toast.error("All Fields are required");
//             return;
//         }

//         setLoading(true);
//         try {
//             const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
//             try {
//                 const q = query(
//                     collection(fireDB, "user"),
//                     where('uid', '==', users?.user?.uid)
//                 );
//                 const data = onSnapshot(q, (QuerySnapshot) => {
//                     let user;
//                     QuerySnapshot.forEach((doc) => user = doc.data());
//                     localStorage.setItem("users", JSON.stringify(user));
//                     setUserLogin({
//                         email: "",
//                         password: ""
//                     });
//                     toast.success("Login Successfully");
//                     setLoading(false);
//                     if (user.role === "user") {
//                         navigate('/user-dashboard');
//                     } else {
//                         navigate('/admin-dashboard');
//                     }
//                 });
//                 return () => data;
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//             toast.error("Login Failed");
//         }
//     };

//     return (
//         <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
//             {loading && <Loader />}
//             {/* Login Form  */}
//             <div className="login_Form bg-gray-800 px-8 py-6 border border-gray-600 rounded-xl shadow-md">

//                 {/* Top Heading  */}
//                 <div className="mb-5">
//                     <h2 className='text-center text-2xl font-bold text-white'>
//                         Login
//                     </h2>
//                 </div>

//                 {/* Input One  */}
//                 <div className="mb-3">
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder='Email Address'
//                         value={userLogin.email}
//                         onChange={(e) => {
//                             setUserLogin({
//                                 ...userLogin,
//                                 email: e.target.value
//                             });
//                         }}
//                         className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
//                     />
//                 </div>

//                 {/* Input Two  */}
//                 <div className="mb-5">
//                     <input
//                         type="password"
//                         placeholder='Password'
//                         value={userLogin.password}
//                         onChange={(e) => {
//                             setUserLogin({
//                                 ...userLogin,
//                                 password: e.target.value
//                             });
//                         }}
//                         className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
//                     />
//                 </div>

//                 {/* Login Button  */}
//                 <div className="mb-5">
//                     <button
//                         type='button'
//                         onClick={userLoginFunction}
//                         className='bg-gray-600 hover:bg-gray-500 w-full text-white text-center py-2 font-bold rounded-md '
//                     >
//                         Login
//                     </button>
//                 </div>

//                 <div>
//                     <h2 className='text-gray-300'>Don't Have an account? <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Login;
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Login State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          User Login Function 
    *========================================================================**/
    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };

    return (
        <div className='bg-gray-900 text-white'>
            <Navbar /> {/* Add Navbar here */}
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-gray-800 px-8 py-6 border border-gray-600 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-white'>
                            Login
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder='Email Address'
                            value={userLogin.email}
                            onChange={(e) => {
                                setUserLogin({
                                    ...userLogin,
                                    email: e.target.value
                                });
                            }}
                            className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder='Password'
                            value={userLogin.password}
                            onChange={(e) => {
                                setUserLogin({
                                    ...userLogin,
                                    password: e.target.value
                                });
                            }}
                            className='bg-gray-700 border border-gray-600 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 text-white'
                        />
                    </div>

                    {/* Login Button  */}
                    <div className="mb-5">
                        <button
                            type='button'
                            onClick={userLoginFunction}
                            className='bg-gray-600 hover:bg-gray-500 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Login
                        </button>
                    </div>

                    <div>
                        <h2 className='text-gray-300'>Don't Have an account? <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                    </div>

                </div>
            </div>
            <Footer /> {/* Add Footer here */}
        </div>
    );
}

export default Login;
