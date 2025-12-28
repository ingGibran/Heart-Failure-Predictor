import React from "react";

const Card = ({ title, description, icon }) => (
    <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100">
        {icon && <div className="text-brand-500 mb-4 text-3xl">{icon}</div>}
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

export default Card;
