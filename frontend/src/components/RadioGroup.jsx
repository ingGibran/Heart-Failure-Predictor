import React from "react";

const RadioGroup = ({ label, name, selected, onChange }) => (
    <div className="mb-6">
        <span className="block text-slate-700 font-semibold mb-3 ml-1">{label}</span>
        <div className="flex gap-4">
            {['yes', 'no'].map((value) => (
                <label
                    key={value}
                    className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selected === value
                            ? "border-brand-500 bg-brand-50 text-brand-700 font-bold"
                            : "border-slate-200 hover:border-brand-200 text-slate-600"
                        }`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={value}
                        checked={selected === value}
                        onChange={onChange}
                        className="hidden" // Hiding the default radio
                    />
                    <span className="capitalize">{value}</span>
                </label>
            ))}
        </div>
    </div>
);

export default RadioGroup;
