import React from "react";

const InputField = ({ label, type = "text", name, value, onChange, placeholder, helperText, error }) => (
    <div className="mb-5 group">
        <label className="block text-slate-700 font-semibold mb-2 ml-1" htmlFor={name}>
            {label}
        </label>
        <div className="relative">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all duration-200 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-500"
                    }`}
            />
        </div>
        <div className="mt-1 ml-1 flex justify-between items-start">
            {helperText && !error && (
                <p className="text-xs text-slate-500 font-medium">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 font-medium animate-pulse">{error}</p>}
        </div>
    </div>
);

export default InputField;
