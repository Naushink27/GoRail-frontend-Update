import React from "react";
import { useNavigate } from "react-router-dom";

export default function StatCard({ title, count, buttonText, link }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between border-l-4 border-blue-600">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold mt-2 text-blue-800">{count}</p>
      </div>
      {buttonText && link && (
        <button
          className="mt-4 text-blue-600 hover:underline self-start"
          onClick={() => navigate(link)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}