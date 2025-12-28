import React from "react";

const Button = ({ onClick, children, type = "button", className = "" }) => (
    <button
        type={type}
        onClick={onClick}
        className={`px-8 py-3 bg-brand-500 text-white font-semibold rounded-full shadow-lg hover:shadow-glow hover:bg-brand-600 hover:-translate-y-0.5 transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-200 ${className}`}
    >
        {children}
    </button>
);

export default Button;
