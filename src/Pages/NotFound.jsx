// 404 Not Found page
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineWarning } from 'react-icons/ai';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-[200px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <AiOutlineWarning className="text-yellow-500 text-6xl animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Suggestions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 font-semibold mb-3">
              Here's what you can do:
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Check the URL for typos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Go back to the previous page
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Return to the homepage
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition font-semibold"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <AiOutlineHome size={20} />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Fun Illustration */}
        <div className="text-gray-400 text-sm">
          <p>Lost in space? 🚀 Let's get you back on track!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
