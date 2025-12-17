import React from 'react';
import { motion } from 'framer-motion';

const SuccessStories = () => {
    const stories = [
        { id: 1, name: "Anisur Rahman", uni: "Oxford University", img: "https://i.pravatar.cc/150?u=1", feedback: "Through this portal, I secured a full fund for my Masters. Truly life-changing!" },
        { id: 2, name: "Sultana Ahmed", uni: "MIT", img: "https://i.pravatar.cc/150?u=2", feedback: "The application process was so smooth. Highly recommended for students." },
        { id: 3, name: "Rakib Hossain", uni: "University of Toronto", img: "https://i.pravatar.cc/150?u=3", feedback: "Found my dream scholarship within days of searching here." }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-[#154E81] mb-16">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {stories.map((story) => (
                        <motion.div 
                            whileHover={{ y: -10 }}
                            key={story.id} 
                            className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center"
                        >
                            <img src={story.img} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#5EBDDB]" alt="" />
                            <h4 className="font-bold text-lg">{story.name}</h4>
                            <p className="text-[#5EBDDB] text-sm mb-4">{story.uni}</p>
                            <p className="text-gray-600 italic">"{story.feedback}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;