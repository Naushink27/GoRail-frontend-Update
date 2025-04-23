import React, { useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addAllUser } from '../utils/allUsersSlice';

const AllUsers = () => {
    const dispatch=useDispatch();
    const users = useSelector((store) => store.allUser);
    const user = useSelector((store) => store.user);
    const getUsersData=async()=>{
        const users=await axios.get(BASE_URL+'/view/users',{withCredentials:true})
        console.log(users.data.data)
        dispatch(addAllUser(users?.data?.data))
    }
    useEffect(()=>{
       getUsersData();
    },[])


    const handleDeleteUser=async(index)=>{
try{
    console.log(index)
    const targetUser=users[index]
    const targetUserId=targetUser._id;
    console.log(targetUserId)
    
   const res= await axios.delete(BASE_URL+'/delete/user/'+ targetUserId,{withCredentials:true})
    console.log(res)
    window.location.reload()
}catch(err){console.log(err.message)}
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {user ? (
                <div className="flex flex-1 flex-col lg:flex-row">
                    <Sidebar />
                    <main className="flex-1 p-4 sm:p-6">
                        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow">
                            <h2 className="text-2xl font-bold text-blue-800">All Users</h2>
                            <p className="text-sm text-blue-700">Manage all registered users of GoRail 🚆</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
                            <h3 className="text-lg font-semibold text-blue-800 mb-4">User Data</h3>
                            <div className="overflow-auto max-h-[500px]">
                                <table className="table-auto w-full border-collapse border border-blue-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="border border-blue-300 px-4 py-2">firstName</th>
                                            <th className="border border-blue-300 px-4 py-2">lastName</th>
                                            <th className="border border-blue-300 px-4 py-2">email</th>
                                            <th className="border border-blue-300 px-4 py-2">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue-900">
                                        {users.length > 0 ? (
                                            users.map((userItem, index) => (
                                                <tr key={index} className="hover:bg-blue-100">
                                                    <td className="border border-blue-300 px-4 py-2">{userItem.firstName}</td>
                                                    <td className="border border-blue-300 px-4 py-2">{userItem.lastName}</td>
                                                    <td className="border border-blue-300 px-4 py-2">{userItem.email}</td>
                                                    <td className="border border-blue-300 px-4 py-2 capitalize"><button  onClick={(e)=>handleDeleteUser(index)}className="btn btn-warning">Delete</button></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-blue-600">No users found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                <Login />
            )}
            <footer className="bg-blue-200 text-blue-900 text-center py-3">
                © 2025 GoRail. All rights reserved.
            </footer>
        </div>
    );
};

export default AllUsers;
