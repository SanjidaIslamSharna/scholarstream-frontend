import { useLocation, Link } from 'react-router-dom';

const PaymentFail = () => {
    const { state } = useLocation();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✕</div>
                <h1 className="text-3xl font-black text-gray-800 mb-2">Payment Failed</h1>
                <p className="text-red-500 font-medium mb-2">{state?.scholarshipName}</p>
                <p className="text-gray-500 mb-8 italic">"{state?.error || 'Something went wrong during transaction.'}"</p>

                <Link to="/dashboard" className="block w-full py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-black transition">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default PaymentFail;