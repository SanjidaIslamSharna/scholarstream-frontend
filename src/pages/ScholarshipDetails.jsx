import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  FaGlobe,
  FaTrophy,
  FaCalendarDay,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/scholarships/${id}`).then((res) => setData(res.data));
    axiosInstance
      .get(`/reviews?scholarshipId=${id}`)
      .then((res) => setReviews(res.data));
  }, [id]);

  if (!data) return <div className="p-20 text-center">Loading Details...</div>;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image & Key Info */}
          <div className="space-y-4">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50">
              <img
                src={data.universityImage}
                alt={data.universityName}
                className="w-full h-[350px] object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-3xl">
                <FaTrophy className="mx-auto text-2xl text-[#154E81] mb-2" />
                <p className="text-xs text-gray-500 uppercase font-bold">
                  World Rank
                </p>
                <p className="text-xl font-bold text-[#154E81]">
                  #{data.universityWorldRank}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-3xl">
                <FaCalendarDay className="mx-auto text-2xl text-red-500 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Deadline
                </p>
                <p className="text-xl font-bold text-red-600">
                  {new Date(data.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="pt-2">
            <span className="text-[#5EBDDB] font-bold tracking-widest uppercase text-sm mb-2 block">
              {data.universityName} • {data.universityCountry}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#154E81] leading-tight mb-4">
              {data.scholarshipName}
            </h1>

            <div className="prose prose-blue text-gray-600 mb-4 leading-loose">
              <p className="mb-2">
                {data.scholarshipDescription ||
                  "Discover this incredible opportunity to further your education at one of the world's leading institutions. This scholarship covers major expenses and provides a platform for academic excellence."}
              </p>
              <p className="font-semibold text-gray-800">
                Coverage/Stipend:{" "}
                <span className="text-[#5EBDDB] font-bold">
                  Fully Funded or Partial Support
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Application Fee
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  ${data.applicationFees}
                </p>
              </div>
              <div className="h-10 w-[1px] bg-gray-200"></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Location
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {data.universityCity}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/checkout/${data._id}`)}
              className="w-full py-3 bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white font-bold text-xl rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
            >
              Apply for Scholarship
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#154E81] mb-8">
            Student Reviews ({reviews.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={r.userImage || "https://i.ibb.co/2kR1Y5C/avatar.png"}
                      alt={r.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#5EBDDB]"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{r.userName}</h4>
                      <p className="text-xs text-gray-400">
                        {new Date(r.reviewDate).toDateString()}
                      </p>
                    </div>
                    <div className="ml-auto flex text-yellow-400 gap-1">
                      {[...Array(Number(r.ratingPoint) || 0)].map(
                        (_, index) => (
                          <FaStar key={index} size={14} />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{r.reviewComment || "No comment provided"}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                No reviews yet for this scholarship.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
