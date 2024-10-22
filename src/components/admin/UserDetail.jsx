import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;

    return (
        <div className="bg-gray-900 min-h-screen py-8 px-4 md:px-10 text-white">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-2xl text-pink-300 font-extrabold">All Users</h1>
            </div>

            <div className="w-full overflow-x-auto bg-gray-800 shadow-md rounded-lg">
                <table className="w-full text-left border-collapse text-gray-300">
                    <thead className="bg-gray-700 text-pink-300 font-semibold">
                        <tr>
                            <th className="h-12 px-6">S.No.</th>
                            <th className="h-12 px-6">Name</th>
                            <th className="h-12 px-6">Email</th>
                            <th className="h-12 px-6">Uid</th>
                            <th className="h-12 px-6">Role</th>
                            <th className="h-12 px-6">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUser.map((value, index) => {
                            return (
                                <tr key={index} className="border-b border-gray-600 hover:bg-gray-700 transition">
                                    <td className="h-12 px-6">{index + 1}</td>
                                    <td className="h-12 px-6 capitalize">{value.name}</td>
                                    <td className="h-12 px-6 text-blue-400 cursor-pointer hover:underline">{value.email}</td>
                                    <td className="h-12 px-6 text-blue-400 cursor-pointer hover:underline">{value.uid}</td>
                                    <td className="h-12 px-6 capitalize">{value.role}</td>
                                    <td className="h-12 px-6">{value.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetail;
