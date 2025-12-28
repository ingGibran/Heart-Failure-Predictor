import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";

const SurveyPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        sex: "",
        anaemia: "",
        diabetes: "",
        highBloodPressure: "",
        smoking: "",
        ejectionFraction: "",
        serumCreatinine: "",
        serumSodium: "",
        platelets: "",
        time: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        // Simple required validation
        Object.entries(formData).forEach(([key, value]) => {
            if (value === "" || value === undefined) {
                newErrors[key] = "Required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        console.log("Form Data:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        ✓
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Assessment Complete</h2>
                    <p className="text-slate-600 mb-8">
                        Thank you for providing your details. Your personalized heart health prediction is being processed.
                    </p>
                    <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 text-brand-700 font-medium">
                        Prediction results will appear here.
                    </div>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-brand-600 font-semibold hover:text-brand-800 transition-colors"
                    >
                        Start New Survey
                    </button>
                    <div className="mt-4">
                        <button
                            onClick={() => navigate("/")}
                            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10 relative">
                    <button
                        onClick={() => navigate("/")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600 transition-colors hidden md:flex items-center gap-2 font-medium"
                    >
                        <span>←</span> Return
                    </button>
                    {/* Mobile return button */}
                    <button
                        onClick={() => navigate("/")}
                        className="md:hidden flex items-center gap-2 text-slate-400 mb-4 mx-auto hover:text-brand-600 transition-colors font-medium"
                    >
                        <span>←</span> Return to Home
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Patient Health Survey</h1>
                    <p className="text-slate-500">Please answer honestly for the most accurate prediction.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-soft p-8 md:p-10 border border-slate-100">
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Section: Demographics */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Demographics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Age"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="e.g. 60"
                                    helperText="Years"
                                    error={errors.age}
                                />
                                <RadioGroup
                                    label="Sex"
                                    name="sex"
                                    selected={formData.sex}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Section: Conditions */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Pre-existing Conditions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                <RadioGroup
                                    label="Anaemia"
                                    name="anaemia"
                                    selected={formData.anaemia}
                                    onChange={handleChange}
                                />
                                <RadioGroup
                                    label="Diabetes"
                                    name="diabetes"
                                    selected={formData.diabetes}
                                    onChange={handleChange}
                                />
                                <RadioGroup
                                    label="High Blood Pressure"
                                    name="highBloodPressure"
                                    selected={formData.highBloodPressure}
                                    onChange={handleChange}
                                />
                                <RadioGroup
                                    label="Smoking"
                                    name="smoking"
                                    selected={formData.smoking}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Section: Clinical Values */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Clinical Values</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Ejection Fraction"
                                    type="number"
                                    name="ejectionFraction"
                                    value={formData.ejectionFraction}
                                    onChange={handleChange}
                                    placeholder="e.g. 55"
                                    helperText="%"
                                    error={errors.ejectionFraction}
                                />
                                <InputField
                                    label="Serum Creatinine"
                                    type="number"
                                    name="serumCreatinine"
                                    value={formData.serumCreatinine}
                                    onChange={handleChange}
                                    placeholder="e.g. 1.2"
                                    helperText="mg/dL"
                                    error={errors.serumCreatinine}
                                />
                                <InputField
                                    label="Serum Sodium"
                                    type="number"
                                    name="serumSodium"
                                    value={formData.serumSodium}
                                    onChange={handleChange}
                                    placeholder="e.g. 135"
                                    helperText="mEq/L"
                                    error={errors.serumSodium}
                                />
                                <InputField
                                    label="Platelets"
                                    type="number"
                                    name="platelets"
                                    value={formData.platelets}
                                    onChange={handleChange}
                                    placeholder="e.g. 260000"
                                    helperText="kiloplatelets/mL"
                                    error={errors.platelets}
                                />
                                <div className="md:col-span-2">
                                    <InputField
                                        label="Follow-up Period"
                                        type="number"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        placeholder="e.g. 70"
                                        helperText="Days of follow-up"
                                        error={errors.time}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="w-full md:w-auto text-lg">
                                Generate Prediction
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SurveyPage;
