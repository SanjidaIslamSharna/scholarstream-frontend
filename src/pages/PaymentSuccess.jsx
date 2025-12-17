import { useLocation, Link, Navigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const { state } = useLocation();

    // যদি কেউ সরাসরি এই লিংকে আসে (state ছাড়া), তাকে রিডাইরেক্ট করে দিন
    if (!state) {
        return <Navigate to="/dashboard/my-applications" />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-lg w-full border border-gray-100">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner">
                    ✓
                </div>
                <h1 className="text-3xl font-black text-[#154E81] mb-2 uppercase tracking-tight">Payment Successful!</h1>
                <p className="text-gray-400 mb-8 font-medium">Your application has been submitted to the university.</p>
                
                <div className="text-left bg-gray-50 p-6 rounded-3xl mb-8 space-y-3 border border-dashed border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-400 text-sm font-bold uppercase">Scholarship</span>
                        <span className="text-gray-800 font-bold">{state?.scholarship?.scholarshipName || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400 text-sm font-bold uppercase">University</span>
                        <span className="text-gray-800 font-bold">{state?.scholarship?.universityName || "N/A"}</span>
                    </div>
                    <div className="h-[1px] bg-gray-200 my-2"></div>
                    <div className="flex justify-between">
                        <span className="text-gray-400 text-sm font-bold uppercase">Amount Paid</span>
                        <span className="text-2xl font-black text-green-600">${state?.amount}</span>
                    </div>
                </div>

                <Link 
                    to="/dashboard/my-applications" 
                    className="block w-full py-4 bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white font-black rounded-2xl shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1"
                >
                    GO TO MY APPLICATIONS
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;