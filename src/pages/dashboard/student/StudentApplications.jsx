import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import {
  FaTrash,
  FaEye,
  FaTimes,
  FaCreditCard,
  FaStar,
  FaCommentDots,
  FaUniversity,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null); // Details Modal
  const [reviewModal, setReviewModal] = useState(null); // Review Modal
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchMyApplications = async () => {
    try {
      const response = await axiosInstance.get("/applications/my");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Action: Delete Application (Only if Pending)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove your scholarship application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/applications/${id}`);
          setApplications((prev) => prev.filter((app) => app._id !== id));
          Swal.fire("Deleted!", "Application removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete application.", "error");
        }
      }
    });
  };

  // Action: Submit Review (Only if Completed)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      scholarshipId: reviewModal.scholarshipId,
      universityName: reviewModal.universityName,
      userName: reviewModal.userName || "Student",
      userEmail: reviewModal.userEmail,
      userImage: reviewModal.userPhoto || reviewModal.userImage || "", 
      ratingPoint: Number(rating), 
      reviewComment: comment, 
    };

    try {
      await axiosInstance.post("/reviews", reviewData);
      Swal.fire("Success!", "Your review has been posted.", "success");
      setReviewModal(null);
      setComment("");
    } catch (error) {
      Swal.fire("Error!", "Could not post review.", "error");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-[#154E81] animate-pulse">
        Loading Applications...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#154E81]">My Applications</h2>
        <p className="text-gray-500 text-sm">
          Review your scholarship status and history
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#154E81] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-5">University & Address</th>
                <th className="p-5">Subject Category</th>
                <th className="p-5">App. Fees</th>
                <th className="p-5">App. Status</th>
                <th className="p-5">Payment</th>
                <th className="p-5">Feedback</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-blue-50/20 transition text-sm"
                >
                  <td className="p-5">
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <FaUniversity className="text-[#5EBDDB] shrink-0" />
                      {app.universityName}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5 ml-6">
                      {app.scholarshipName}
                    </div>
                  </td>
                  <td className="p-5 capitalize text-gray-600 font-medium">
                    {app.scholarshipCategory}
                  </td>
                  <td className="p-5 font-black text-[#154E81]">
                    ${app.applicationFees}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        app.applicationStatus === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : app.applicationStatus === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border shadow-xs ${
                        app.paymentStatus === "paid"
                          ? "bg-green-50 text-green-600 border-green-100"
                          : "bg-red-50 text-red-600 border-red-100"
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="p-5 text-[11px] text-gray-500 italic max-w-[150px] truncate">
                    {app.feedback || "Pending..."}
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      {/* Details Action */}
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </button>

                      {/* Pay Action (Pending & Unpaid) */}
                      {app.applicationStatus === "pending" &&
                        app.paymentStatus === "unpaid" && (
                          <button
                            onClick={() =>
                              navigate(`/checkout/${app.scholarshipId}`)
                            }
                            className="p-2.5 text-orange-500 hover:bg-orange-50 rounded-xl animate-pulse transition"
                            title="Complete Payment"
                          >
                            <FaCreditCard size={18} />
                          </button>
                        )}

                      {/* Delete Action (Only Pending) */}
                      {app.applicationStatus === "pending" && (
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
                          title="Cancel Application"
                        >
                          <FaTrash size={18} />
                        </button>
                      )}

                      {/* Review Action (Only Completed) */}
                      {app.applicationStatus === "completed" && (
                        <button
                          onClick={() => setReviewModal(app)}
                          className="p-2.5 text-yellow-600 hover:bg-yellow-50 rounded-xl transition"
                          title="Submit Review"
                        >
                          <FaStar size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: FULL DETAILS --- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-white">
            <div className="bg-[#154E81] p-6 flex justify-between items-center text-white">
              <h3 className="font-black uppercase tracking-widest text-sm">
                Full Application Info
              </h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="hover:rotate-90 transition duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-200">
                <label className="text-[10px] text-gray-400 font-black uppercase block mb-2">
                  Moderator Feedback
                </label>
                <p className="text-gray-700 italic">
                  "
                  {selectedApp.feedback ||
                    "The moderator has not provided any feedback yet."}
                  "
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <label className="text-gray-400 text-[10px] font-black uppercase block">
                    University
                  </label>
                  <p className="font-bold text-gray-800">
                    {selectedApp.universityName}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-[10px] font-black uppercase block">
                    Degree
                  </label>
                  <p className="font-bold text-gray-800">
                    {selectedApp.degree}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-[10px] font-black uppercase block">
                    Fees Paid
                  </label>
                  <p className="font-black text-[#154E81]">
                    ${selectedApp.applicationFees}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-[10px] font-black uppercase block">
                    Transaction ID
                  </label>
                  <p className="font-mono text-xs text-blue-500 break-all">
                    {selectedApp.transactionId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD REVIEW --- */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="bg-yellow-500 p-6 flex justify-between items-center text-white">
              <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                <FaCommentDots /> Scholarship Review
              </h3>
              <button onClick={() => setReviewModal(null)}>
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="p-10 space-y-6">
              <div>
                <label className="block text-gray-700 font-black text-xs uppercase mb-3">
                  Rating (Stars)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                        rating >= star
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-black text-xs uppercase mb-3">
                  Your Comment
                </label>
                <textarea
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-yellow-100 outline-none transition resize-none"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about this university..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-yellow-500 text-white font-black rounded-2xl shadow-xl shadow-yellow-100 hover:-translate-y-1 transition active:scale-95 uppercase tracking-widest text-xs"
              >
                Submit My Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
