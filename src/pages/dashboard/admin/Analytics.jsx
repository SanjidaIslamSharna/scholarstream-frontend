import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { FaUsers, FaGraduationCap, FaDollarSign } from 'react-icons/fa';
import axiosInstance from '../../../api/axiosInstance';

const COLORS = ['#154E81', '#5EBDDB', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

const Analytics = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalScholarships: 0,
        totalFees: 0,
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/admin/analytics-stats')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="p-20 text-center font-bold text-[#154E81]">Loading Analytics...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-black text-[#154E81] mb-8 uppercase tracking-tight">Platform Analytics</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-blue-50 text-[#154E81] rounded-2xl text-3xl"><FaUsers /></div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase">Total Users</p>
                        <h2 className="text-3xl font-black text-gray-800">{stats.totalUsers}</h2>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-cyan-50 text-[#5EBDDB] rounded-2xl text-3xl"><FaGraduationCap /></div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase">Scholarships</p>
                        <h2 className="text-3xl font-black text-gray-800">{stats.totalScholarships}</h2>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl text-3xl"><FaDollarSign /></div>
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase">Fees Collected</p>
                        <h2 className="text-3xl font-black text-gray-800">${stats.totalFees}</h2>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart: Applications per Category */}
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Applications per Category</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                                    {stats.chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: University Distribution */}
                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Application Distribution</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.chartData}
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {stats.chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{borderRadius: '15px'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;