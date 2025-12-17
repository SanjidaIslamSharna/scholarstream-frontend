import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const EditScholarship = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        scholarshipName: '', universityName: '', universityImage: '',
        universityCountry: '', universityCity: '', universityWorldRank: '',
        subjectCategory: '', scholarshipCategory: '',
        degree: '', tuitionFees: '', applicationFees: '',
        serviceCharge: '', applicationDeadline: '',
    });

    // ডেটা লোড করা
    useEffect(() => {
        axiosInstance.get(`/scholarships/${id}`)
            .then(res => {
                // ডেট ফরম্যাট ঠিক করা (YYYY-MM-DD) input type="date" এর জন্য
                const fetchedData = res.data;
                if (fetchedData.applicationDeadline) {
                    fetchedData.applicationDeadline = new Date(fetchedData.applicationDeadline).toISOString().split('T')[0];
                }
                setFormData(fetchedData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/scholarships/${id}`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Scholarship details have been updated.',
                confirmButtonColor: '#154E81'
            });
            navigate('/dashboard/manage-scholarships');
        } catch (err) {
            Swal.fire('Error!', 'Failed to update scholarship', 'error');
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen font-bold text-[#154E81]">Loading Data...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 text-left">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                
                {/* Header Section */}
                <div className="bg-linear-to-r from-[#154E81] to-[#5EBDDB] p-8 relative">
                    <button onClick={() => navigate(-1)} className="absolute left-6 top-8 text-white/80 hover:text-white transition-all">
                        <FaArrowLeft size={20}/>
                    </button>
                    <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">Edit Scholarship</h2>
                    <p className="text-indigo-100 text-center text-sm mt-2 opacity-90">Modify the scholarship details below</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-l-4 border-[#154E81] pl-3">University & Program</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Scholarship Name</label>
                                <input type="text" name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">University Name</label>
                                <input type="text" name="universityName" value={formData.universityName} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Media & Rank */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">University Image URL</label>
                            <input type="url" name="universityImage" value={formData.universityImage} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">World Rank</label>
                            <input type="number" name="universityWorldRank" value={formData.universityWorldRank} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                    </div>

                    {/* Geography */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Country</label>
                            <input type="text" name="universityCountry" value={formData.universityCountry} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                            <input type="text" name="universityCity" value={formData.universityCity} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Subject Category</label>
                            <select name="subjectCategory" value={formData.subjectCategory} onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Business">Business</option>
                                <option value="Arts">Arts</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Scholarship Category</label>
                            <select name="scholarshipCategory" value={formData.scholarshipCategory} onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Full Funding">Full Funding</option>
                                <option value="Partial Funding">Partial Funding</option>
                                <option value="Self Funded">Self Funded</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Degree</label>
                            <select name="degree" value={formData.degree} onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded">
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                    </div>

                    {/* Financials & Deadline */}
                    <div className="bg-indigo-50/50 p-6 rounded border border-indigo-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Tuition ($)</label>
                            <input type="number" name="tuitionFees" value={formData.tuitionFees} onChange={handleChange} className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" placeholder="Optional" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">App. Fees ($)</label>
                            <input type="number" name="applicationFees" value={formData.applicationFees} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Service ($)</label>
                            <input type="number" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-[#154E81] uppercase tracking-wider">Deadline</label>
                            <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} required className="border border-[#154E81] bg-gray-50/50 p-2 focus:ring-[#5EBDDB] rounded" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white font-black py-4 rounded shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
                            <FaSave /> Update Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditScholarship;