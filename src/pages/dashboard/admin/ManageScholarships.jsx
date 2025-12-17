import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance'; 
import { FaEdit, FaTrash, FaPlus, FaEye, FaTimes, FaUniversity, FaGlobe } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const navigate = useNavigate();

    const fetchScholarships = async () => {
        try {
            const response = await axiosInstance.get('/scholarships');
            setScholarships(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchScholarships(); }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#154E81',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/scholarships/${id}`);
                    setScholarships(prev => prev.filter(s => s._id !== id));
                    Swal.fire('Deleted!', 'Scholarship has been deleted.', 'success');
                } catch (error) { Swal.fire('Error!', 'Failed', 'error'); }
            }
        });
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#154E81]">Manage Scholarships</h2>
                    <p className="text-gray-500 text-sm">Overview of all available scholarship programs</p>
                </div>
                <button onClick={() => navigate('/dashboard/add-scholarship')} className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white rounded-lg font-medium shadow-md hover:opacity-90 transition">
                    <FaPlus /> Add New Scholarship
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white text-sm uppercase">
                        <tr>
                            <th className="p-4">Scholarship & University</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Degree</th>
                            <th className="p-4">App. Fee</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {scholarships.map((s) => (
                            <tr key={s._id} className="hover:bg-blue-50/30 transition">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800">{s.scholarshipName}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <FaUniversity className="text-[#5EBDDB]"/> {s.universityName}, {s.universityCountry}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="px-3 py-1 bg-blue-100 text-[#154E81] rounded-full text-xs font-semibold uppercase">
                                        {s.scholarshipCategory}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600 font-medium">{s.degree}</td>
                                <td className="p-4 text-gray-800 font-bold">${s.applicationFees}</td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => setSelectedScholarship(s)} className="p-2 text-[#5EBDDB] hover:bg-[#5EBDDB]/10 rounded-full transition"><FaEye size={18}/></button>
                                        <button onClick={() => navigate(`/dashboard/edit-scholarship/${s._id}`)} className="p-2 text-[#154E81] hover:bg-[#154E81]/10 rounded-full transition"><FaEdit size={18}/></button>
                                        <button onClick={() => handleDelete(s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"><FaTrash size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {selectedScholarship && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
                        <div className="bg-linear-to-r from-[#154E81] to-[#5EBDDB] p-5 flex justify-between items-center text-white">
                            <h3 className="font-bold text-xl">Scholarship Details</h3>
                            <button onClick={() => setSelectedScholarship(null)} className="hover:rotate-90 transition-transform"><FaTimes size={20}/></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="border-l-4 border-[#154E81] pl-4">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Scholarship Name</p>
                                <p className="text-xl font-bold text-gray-800">{selectedScholarship.scholarshipName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div><p className="text-xs text-gray-400 uppercase font-bold">University</p><p className="font-medium text-gray-700">{selectedScholarship.universityName}</p></div>
                                <div><p className="text-xs text-gray-400 uppercase font-bold">Location</p><p className="font-medium text-gray-700">{selectedScholarship.universityCity}, {selectedScholarship.universityCountry}</p></div>
                                <div><p className="text-xs text-gray-400 uppercase font-bold">Category</p><p className="font-medium text-gray-700">{selectedScholarship.scholarshipCategory}</p></div>
                                <div><p className="text-xs text-gray-400 uppercase font-bold">Degree</p><p className="font-medium text-gray-700">{selectedScholarship.degree}</p></div>
                                <div><p className="text-xs text-gray-400 uppercase font-bold">App. Fee</p><p className="font-bold text-[#154E81]">${selectedScholarship.applicationFees}</p></div>
                                <div><p className="text-xs text-gray-400 uppercase font-bold">Service Charge</p><p className="font-bold text-[#154E81]">${selectedScholarship.serviceCharge}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarships;