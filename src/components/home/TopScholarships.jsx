import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScholarshipCard from '../cards/ScholarshipCard';
import { FaUniversity, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const TopScholarships = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        axiosInstance.get('/scholarships?limit=6&sort=applicationFees')
            .then(res => setScholarships(res.data.slice(0, 8)))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="container mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#154E81]">Top Scholarships</h2>
                    <div className="h-1 w-20 bg-[#5EBDDB] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {scholarships.map((s, index) => (
                        <ScholarshipCard key={index} scholarship={s} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TopScholarships;