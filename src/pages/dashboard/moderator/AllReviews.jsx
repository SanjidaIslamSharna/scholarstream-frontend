import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import ReviewCard from '../../../components/cards/ReviewCard'; // আগের কার্ডটিই ব্যবহার করছি
import Swal from 'sweetalert2';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await axiosInstance.get('/reviews'); // সব রিভিউ পাওয়ার এন্ডপয়েন্ট
            setReviews(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Review?',
            text: "As a moderator, you are removing this content.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/reviews/${id}`);
                    setReviews(prev => prev.filter(r => r._id !== id));
                    Swal.fire('Deleted!', 'Review removed.', 'success');
                } catch (err) { Swal.fire('Error', 'Failed to delete', 'error'); }
            }
        });
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-black text-[#154E81] mb-8 uppercase">Moderator: All Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default AllReviews;