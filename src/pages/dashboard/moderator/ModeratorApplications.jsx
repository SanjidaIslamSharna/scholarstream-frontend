import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { FaEye, FaCommentDots, FaCheck, FaTimes, FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ModeratorApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

    useEffect(() => { fetchApplications(); }, []);

    const fetchApplications = async () => {
        try {
            const res = await axiosInstance.get('/applications'); 
            setApplications(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axiosInstance.patch(`/applications/${id}`, { applicationStatus: status });
            setApplications(prev => prev.map(a => a._id === id ? { ...a, applicationStatus: status } : a));
            Swal.fire("Updated", `Application is now ${status}`, "success");
        } catch (err) { Swal.fire("Error", "Update failed", "error"); }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch(`/applications/${feedbackModal._id}`, { feedback: feedbackText });
            setApplications(prev => prev.map(a => a._id === feedbackModal._id ? { ...a, feedback: feedbackText } : a));
            Swal.fire("Success", "Feedback added!", "success");
            setFeedbackModal(null);
            setFeedbackText('');
        } catch (err) { Swal.fire("Error", "Failed to add feedback", "error"); }
    };

    if (loading) return <div className="p-10 text-center font-bold">Loading...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-black text-[#154E81] mb-6 uppercase">Manage Applied Applications</h1>
            
            <div className="bg-white rounded-[30px] shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-[#154E81] text-white text-xs uppercase">
                        <tr>
                            <th className="p-5">Applicant</th>
                            <th className="p-5">University</th>
                            <th className="p-5">Payment</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {applications.map(app => (
                            <tr key={app._id} className="hover:bg-blue-50/30 transition">
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <img src={app.userPhoto || "https://i.ibb.co/2kR1Y5C/avatar.png"} className="w-8 h-8 rounded-full border border-gray-200" alt="" />
                                        <div>
                                            <div className="font-bold text-gray-800">{app.userName || "No Name"}</div>
                                            <div className="text-[10px] text-gray-400">{app.userEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 text-gray-600 font-medium">{app.universityName}</td>
                                <td className="p-5">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${app.paymentStatus === 'paid' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                                        {app.paymentStatus}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${app.applicationStatus === 'pending' ? 'bg-amber-100 text-amber-700' : app.applicationStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {app.applicationStatus}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => setSelectedApp(app)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><FaEye /></button>
                                        <button onClick={() => setFeedbackModal(app)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"><FaCommentDots /></button>
                                        <button onClick={() => handleUpdateStatus(app._id, 'processing')} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg" title="Set Processing"><FaCheck className="opacity-50" /></button>
                                        <button onClick={() => handleUpdateStatus(app._id, 'completed')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Complete"><FaCheck /></button>
                                        <button onClick={() => handleUpdateStatus(app._id, 'rejected')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Reject"><FaTimes /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal (সংক্ষিপ্ত) */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
                        <button onClick={() => setSelectedApp(null)} className="absolute top-5 right-5 text-gray-400 hover:text-black transition"><FaTimes size={20}/></button>
                        <h2 className="text-xl font-black text-[#154E81] mb-6 uppercase tracking-tight border-b pb-4">Application Profile</h2>
                        <div className="space-y-4">
                           <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                               <img src={selectedApp.userPhoto} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" alt="" />
                               <div>
                                   <p className="font-black text-gray-800 text-lg">{selectedApp.userName}</p>
                                   <p className="text-sm text-gray-500 italic">{selectedApp.userEmail}</p>
                               </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 bg-blue-50/50 rounded-2xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Degree</p><p className="font-bold text-gray-700">{selectedApp.degree}</p></div>
                               <div className="p-4 bg-blue-50/50 rounded-2xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Subject</p><p className="font-bold text-gray-700">{selectedApp.scholarshipCategory}</p></div>
                           </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {feedbackModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
                        <h3 className="font-black text-[#154E81] mb-4 uppercase">Add Feedback</h3>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <textarea 
                                className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-amber-500"
                                rows="4" required placeholder="Reason for rejection or next steps..."
                                value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                            ></textarea>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setFeedbackModal(null)} className="flex-1 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-amber-500 text-white font-black rounded-xl shadow-lg shadow-amber-100">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModeratorApplications;