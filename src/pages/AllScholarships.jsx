import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import ScholarshipCard from '../components/cards/ScholarshipCard';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({ category: '', degree: '' });

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filters.category) params.append('category', filters.category);
            if (filters.degree) params.append('degree', filters.degree);

            const res = await axiosInstance.get(`/scholarships?${params.toString()}`);
            setScholarships(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchScholarships();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search, filters]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-[#154E81] text-center mb-10">Explore Scholarships</h2>

                {/* Search & Filter Bar */}
                <div className="bg-white px-6 py-3 rounded-xl shadow-sm mb-12 flex flex-wrap gap-4 items-center justify-between border border-gray-100">
                    <div className="relative flex-1 min-w-[300px]">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by Name, University, or Degree..."
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#5EBDDB] outline-none transition-all"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <select 
                            className="px-4 py-2 bg-gray-50 rounded-xl border-none outline-none text-gray-600 font-medium"
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                            <option value="">All Categories</option>
                            <option value="Full Funding">Full Funding</option>
                            <option value="Partial Funding">Partial Funding</option>
                        </select>
                        <select 
                            className="px-4 py-2 bg-gray-50 rounded-xl border-none outline-none text-gray-600 font-medium"
                            onChange={(e) => setFilters({...filters, degree: e.target.value})}
                        >
                            <option value="">All Degrees</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                </div>

                {/* Grid Layout */}
                {loading ? (
                    <div className="text-center py-20 font-bold text-[#154E81]">Loading Scholarships...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {scholarships.map((s) => (
                            <ScholarshipCard key={s._id} scholarship={s} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarships;