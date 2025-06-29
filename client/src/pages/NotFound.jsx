import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
    <p className="text-gray-500 mb-6 text-center max-w-md">
      Sorry, the page you are looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/home"
      className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;