import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-50 to-transparent pointer-events-none" />
            <div className="absolute top-[-10rem] right-[-10rem] w-[40rem] h-[40rem] bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-[-10rem] left-[-10rem] w-[40rem] h-[40rem] bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center">
                <header className="text-center mb-16 max-w-3xl">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-50 border border-brand-100 text-brand-600 font-semibold text-sm tracking-wide uppercase">
                        Health Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                        Predicting Health <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                            Protecting Futures
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                        Harnessing the power to detect early signs of heart failure.
                        Simple, fast, and driven by data for your peace of mind.
                    </p>
                    <Button onClick={() => navigate("/survey")} className="text-lg px-10 py-4 shadow-xl shadow-brand-500/20">
                        Start Your Health Assessment
                    </Button>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <Card
                        title="Early Detection"
                        description="Identify potential risks before they become critical issues. Early awareness is the key to prevention."
                    />
                    <Card
                        title="Data-Driven"
                        description="Our analysis is based on clinical datasets and proven indicators of heart health."
                    />
                    <Card
                        title="Secure & Private"
                        description="Your health data is sensitive. We treat your information with the utmost respect and privacy."
                    />
                </section>

                <footer className="mt-24 text-slate-400 text-sm font-medium">
                    © 2025 Heart Health Project. AI used for social good.
                </footer>
            </div>
        </div >
    );
};

export default LandingPage;
