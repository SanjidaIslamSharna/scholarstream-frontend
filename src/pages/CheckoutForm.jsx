import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ scholarship, user, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/payments/create-payment-intent", {
        scholarshipId: scholarship._id,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error fetching intent:", err));
  }, [scholarship._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "Applicant",
          },
        },
      }
    );

    const applicationData = {
      scholarshipId: scholarship._id,
      userId: user?._id || user?.uid,
      userName: user?.name || "Unknown Student",
      userEmail: user?.email,
      userPhoto: user?.photoURL || "https://i.ibb.co/2kR1Y5C/avatar.png",
      universityName: scholarship.universityName,
      scholarshipName: scholarship.scholarshipName,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree: scholarship.degree,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge || 0,
      applicationStatus: "pending",
      applicationDate: new Date(),
    };

    if (error) {
      await axiosInstance.post("/payments/save-application", {
        ...applicationData,
        paymentStatus: "unpaid",
      });
      setProcessing(false);
      navigate("/payment-fail");
    } else if (paymentIntent.status === "succeeded") {
      await axiosInstance.post("/payments/save-application", {
        ...applicationData,
        paymentStatus: "paid",
        transactionId: paymentIntent.id,
      });
      setProcessing(false);
      navigate("/payment-success", {
        state: {
          scholarship: scholarship,
          amount: totalPrice,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 border-2 border-gray-100 p-5 rounded-2xl bg-gray-50/50">
        <CardElement
          options={{ style: { base: { fontSize: "16px", color: "#1e293b" } } }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-5 bg-linear-to-r from-[#154E81] to-[#5EBDDB] text-white font-black text-lg rounded-2xl shadow-xl disabled:opacity-50"
      >
        {processing ? "Processing..." : `Confirm & Pay $${totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
