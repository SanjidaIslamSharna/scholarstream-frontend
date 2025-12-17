import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <section className="relative w-full py-10 flex items-center bg-linear-to-r from-[#154E81] to-[#5EBDDB] overflow-hidden">
            <div className='container mx-auto px-4'>
                <div className="flex w-full flex-col md:flex-row items-center md:items-start justify-center gap-8">
                    <motion.div 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.5 }}
                        className="text-white text-center"
                    >
                        <h1 className="text-4xl font-bold mb-4">Welcome to ScholarStream</h1>
                        <p className="text-lg mb-6">Discover and Apply for Scholarships with Ease</p>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href="/scholarships"
                            className="inline-block px-6 py-3 bg-[#154E81] text-white font-semibold rounded-full shadow-md hover:bg-[#5EBDDB] transition duration-300"
                        >
                            Explore Scholarships
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Banner;