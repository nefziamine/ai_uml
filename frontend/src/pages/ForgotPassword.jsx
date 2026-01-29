import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 bg-bg-primary relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[100px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[90%] max-w-md z-10"
            >
                <div className="glass-panel p-8 md:p-10 border-glass-border shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-primary/20">
                            <Sparkles size={28} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-3 tracking-tight">
                            {submitted ? 'Email Sent' : 'Reset Password'}
                        </h2>
                        <p className="text-secondary text-sm px-4">
                            {submitted
                                ? `Check your inbox at ${email} for further instructions.`
                                : 'Enter your email address and we\'ll send you a recovery link.'}
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center">
                            <div className="bg-success/10 border border-success/20 text-success text-sm p-4 rounded-xl mb-8 flex items-center gap-3 justify-center">
                                <CheckCircle2 size={18} />
                                <span className="font-medium">Recovery link is on its way!</span>
                            </div>
                            <Link to="/login" className="btn btn-primary w-full py-3.5 text-sm font-bold shadow-lg">
                                <ArrowLeft size={18} />
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Work Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent-primary transition-colors" size={17} />
                                    <input
                                        type="email"
                                        placeholder="architect@company.com"
                                        className="auth-input-refined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary w-full py-4 text-sm font-bold shadow-lg ${loading ? 'opacity-70 cursor-wait' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Send Recovery Link</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-secondary hover:text-accent-primary transition-colors font-medium">
                                <ArrowLeft size={16} />
                                Back to Sign In
                            </Link>
                        </form>
                    )}
                </div>
            </motion.div>

            <style jsx="true">{`
                .auth-input-refined {
                    width: 100%;
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 0.75rem 1rem 0.75rem 3rem;
                    color: white;
                    font-size: 0.875rem;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    outline: none;
                }
                .auth-input-refined:focus {
                    background: rgba(15, 23, 42, 0.6);
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                }
            `}</style>
        </div>
    );
};

export default ForgotPassword;
