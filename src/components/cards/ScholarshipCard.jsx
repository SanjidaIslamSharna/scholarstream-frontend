import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ScholarshipCard = ({ scholarship }) => {
    // Destructuring data for easier access
    const { 
        _id, 
        scholarshipName, 
        universityName, 
        universityImage, 
        universityCountry, 
        universityCity, 
        scholarshipCategory, 
        degree, 
        applicationFees 
    } = scholarship;

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="p-3">
                <div className="h-52 rounded-lg overflow-hidden relative">
                    <img 
                        src={universityImage} 
                        alt={universityName} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#154E81] px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                        {scholarshipCategory}
                    </div>
                </div>
            </div>

            {/* Compact Content Section */}
            <div className="p-4 pt-2 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[#5EBDDB] text-sm font-semibold mb-2">
                    <FaMapMarkerAlt /> 
                    <span>{universityCity}, {universityCountry}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#154E81] transition-colors">
                    {scholarshipName}
                </h3>
                
                <p className="text-gray-500 text-sm mb-2 line-clamp-1 italic">{universityName}</p>

                <div className="flex justify-between items-center py-2 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaGraduationCap className="text-lg text-[#154E81]" /> 
                        <span className="font-medium">{degree}</span>
                    </div>
                    <div className="text-gray-800 font-extrabold">
                        Fee: <span className="text-[#154E81]">${applicationFees}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link to={`/scholarships/${_id}`} className="mt-2">
                    <button className="w-full py-1.5 bg-gray-50 text-[#154E81] font-bold rounded-xl group-hover:bg-linear-to-r from-[#154E81] to-[#5EBDDB] group-hover:text-white transition-all duration-300 shadow-sm active:scale-95">
                        View Details
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

export default ScholarshipCard;