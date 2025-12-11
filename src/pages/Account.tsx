import React from "react";

const Account: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("logged_user") || "null");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Access denied. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-lg rounded-xl border">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>

        <button
          className="mt-4 px-4 py-2 rounded bg-red-500 text-white"
          onClick={() => {
            localStorage.removeItem("logged_user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
