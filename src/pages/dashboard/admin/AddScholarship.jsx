import React, { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth'; 

const AddScholarship = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        scholarshipName: '', universityName: '', universityImage: '',
        universityCountry: '', universityCity: '', universityWorldRank: '',
        subjectCategory: 'Agriculture', scholarshipCategory: 'Full Funding',
        degree: 'Bachelor', tuitionFees: '', applicationFees: '',
        serviceCharge: '', applicationDeadline: '',
        scholarshipPostDate: new Date().toISOString().split('T')[0],
        postedUserEmail: user?.email || '', 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalData = { ...formData, postedUserEmail: user?.email };
            await axiosInstance.post('/scholarships', finalData);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Scholarship has been published successfully.',
                confirmButtonColor: '#4F46E5'
            });
            e.target.reset();
        } catch (err) {
            Swal.fire('Error!', err.response?.data?.message || 'Failed to add scholarship', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#154E81]">
                {/* Header Section */}
                <div className="bg-linear-to-r from-[#154E81] to-[#5EBDDB] p-8">
                    <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">Add New Scholarship</h2>
                    <p className="text-indigo-100 text-center text-sm mt-2 opacity-90">Enter the scholarship details accurately for the applicants</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    
                    {/* section: Basic Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-l-4 border-[#154E81] pl-3">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Scholarship Name</label>
                                <input type="text" name="scholarshipName" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="Enter scholarship name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">University Name</label>
                                <input type="text" name="universityName" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="Enter university name" />
                            </div>
                        </div>
                    </div>

                    {/* section: Media & Ranking */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">University Image URL</label>
                            <input type="url" name="universityImage" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="https://example.com/image.jpg" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">University World Rank</label>
                            <input type="number" name="universityWorldRank" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="e.g. 120" />
                        </div>
                    </div>

                    {/* section: Geography */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Country</label>
                            <input type="text" name="universityCountry" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="e.g. Canada" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                            <input type="text" name="universityCity" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="e.g. Toronto" />
                        </div>
                    </div>

                    {/* section: Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Subject Category</label>
                            <select name="subjectCategory" onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Scholarship Category</label>
                            <select name="scholarshipCategory" onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Full Funding">Full Funding</option>
                                <option value="Partial Funding">Partial Funding</option>
                                <option value="Self Funded">Self Funded</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Degree</label>
                            <select name="degree" onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>

                    {/* section: Financials & Deadline */}
                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Tuition Fees</label>
                            <input type="text" name="tuitionFees" onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="Optional" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">App. Fees</label>
                            <input type="number" name="applicationFees" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="0.00" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Service Charge</label>
                            <input type="number" name="serviceCharge" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="0.00" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Deadline</label>
                            <input type="date" name="applicationDeadline" onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button type="submit" className="w-full bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 transform transition-all hover:-translate-y-1 active:scale-95 text-lg">
                            Publish Opportunity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;