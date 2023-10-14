import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const TableOne = () => {
    const [users, setUsers] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:7000/api/admin/users-list')
            .then((res) => {
                setUsers(res.data.users)
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            })
    }, []);

    const userControl = async (userId, e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await axios.put("http://localhost:7000/api/admin/user-control", { userId })
            setUsers(prev => {
                return prev.map(user => {
                    if (user._id === response.data._id) {
                        return response.data
                    }
                    return user
                })
            })
        } catch (error) {
            console.error("Error toggling user status", error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="w-full max-w-full">
            {loader && (
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-50">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="table-responsive">
                    <table className="table-auto w-full text-slate-500">
                        <thead className="thead-light">
                            <tr>
                                <th className="py-2 px-4">First Name</th>
                                <th className="py-2 px-4">Last Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Phone</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 font-normal text-sm">{user.fname}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{user.lname}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{user.email}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{user.phone}</td>
                                    <td className="py-2 px-4 font-normal text-sm">
                                        <button
                                            onClick={(e) => userControl(user._id, e)}
                                            className={
                                                user.isActive
                                                    ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    : "bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                                            }
                                        >
                                            {user.isActive ? "Block" : "Unblock"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableOne;
