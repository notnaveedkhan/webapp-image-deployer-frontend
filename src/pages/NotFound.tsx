import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Redirecting back to the home page...
        </p>
        <img
          src="/path/to/your/not-found-image.png"
          alt="Not Found"
          className="mx-auto w-40"
        />
      </div>
    </div>
  );
};

export default NotFound;
