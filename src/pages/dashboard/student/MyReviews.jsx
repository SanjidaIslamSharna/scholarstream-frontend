import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import ReviewCard from '../../../components/cards/ReviewCard'; 
import { FaCommentSlash } from 'react-icons/fa';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/reviews/my')
            .then(res => setReviews(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-20 text-center font-bold text-[#154E81]">Loading your reviews...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-[#154E81] uppercase tracking-tight">My Reviews</h1>
                    <p className="text-gray-500">Total reviews posted by you: {reviews.length}</p>
                </div>

                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map(review => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                        <FaCommentSlash size={60} className="mb-4 opacity-20" />
                        <p className="text-xl font-medium">You haven't posted any reviews yet!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;