import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axiosInstance from '../api/axiosInstance';
import useAuth from '../hooks/useAuth';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [scholarship, setScholarship] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/scholarships/${id}`)
            .then(res => setScholarship(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!scholarship) return <div className="min-h-screen flex justify-center items-center font-bold text-[#154E81]">Loading Payment Details...</div>;

    const totalPrice = scholarship.applicationFees + (scholarship.serviceCharge || 0);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-black text-[#154E81] mb-10 text-center uppercase tracking-tight">Secure Checkout</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                        <img src={scholarship.universityImage} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-md" alt="" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{scholarship.scholarshipName}</h3>
                        <p className="text-sm text-gray-500 mb-6">{scholarship.universityName}</p>
                        
                        <div className="space-y-4 border-t border-gray-50 pt-6 font-medium text-gray-600">
                            <div className="flex justify-between"><span>Application Fee</span><span>${scholarship.applicationFees}</span></div>
                            <div className="flex justify-between"><span>Service Charge</span><span>${scholarship.serviceCharge || 0}</span></div>
                            <div className="flex justify-between text-2xl font-black text-[#154E81] pt-4 border-t-2 border-dashed">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5EBDDB]/5 rounded-full -mr-16 -mt-16"></div>
                        <h4 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#154E81] text-white rounded-full flex items-center justify-center text-sm">2</span>
                            Payment Information
                        </h4>
                        
                        <Elements stripe={stripePromise}>
                            <CheckoutForm scholarship={scholarship} user={user} totalPrice={totalPrice} />
                        </Elements>

                        <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-6" alt="Stripe" />
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure SSL Encryption</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;