import { FaTrash, FaStar, FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review, handleDelete }) => {
  return (
    <div
      key={review._id}
      className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 hover:shadow-md transition group relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-1 text-yellow-500">
          {[...Array(review.ratingPoint || 0)].map((_, i) => (
            <FaStar key={i} size={14} />
          ))}
        </div>

        {handleDelete && (
          <button
            onClick={() => handleDelete(review._id)}
            className="p-2 text-red-300 hover:text-red-500 bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100"
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>

      <FaQuoteLeft className="text-gray-100 absolute top-12 left-6" size={40} />

      <p className="text-gray-600 text-sm italic mb-6 relative z-10">
        "{review.reviewComment || "No comment provided"}"
      </p>

      <div className="flex items-center gap-3 border-t pt-4">
        <img
          src={review.userImage || "https://i.ibb.co/2kR1Y5C/avatar.png"}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          alt={review.userName}
        />
        <div>
          <h4 className="font-bold text-gray-800 text-xs">{review.userName}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase">
            {review.universityName}
          </p>
          <p className="text-[8px] text-gray-400 italic">
            {new Date(review.reviewDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
