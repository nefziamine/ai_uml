import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, User, Github, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);

                // Get redirection path or default to dashboard
                const params = new URLSearchParams(location.search);
                const redirectTo = params.get('redirectTo') || '/dashboard';
                navigate(redirectTo);
            } else {
                await authService.register(email, name, password);
                setIsLogin(true);
                alert('Registration successful! Please sign in.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 bg-bg-primary relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/20 blur-[100px] rounded-full"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[90%] max-w-md z-10"
            >
                <div className="glass-panel p-8 md:p-10 border-glass-border shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-3 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-secondary text-sm px-4">
                            {isLogin
                                ? 'Enter your credentials to access your dashboard'
                                : 'Join our community of elite system architects'}
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-error/10 border border-error/20 text-error text-xs p-3.5 rounded-xl mb-6 text-center font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent-primary transition-colors" size={17} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="auth-input-refined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent-primary transition-colors" size={17} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="auth-input-refined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent-primary transition-colors" size={17} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="auth-input-refined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {isLogin && (
                                <div className="text-right">
                                    <Link to="/forgot-password" className="text-[11px] font-bold text-accent-primary hover:text-accent-secondary transition-colors uppercase tracking-wider">
                                        Forgot Password?
                                    </Link>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full py-3.5 text-sm font-bold shadow-lg mt-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#1e293b] px-4 text-[10px] text-muted font-bold uppercase tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                        <button
                            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/github'}
                            className="btn btn-secondary py-3 text-sm border-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Github size={18} />
                            <span>GitHub</span>
                        </button>
                        <button
                            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                            className="btn btn-secondary py-3 text-sm border-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Chrome size={18} />
                            <span>Google</span>
                        </button>
                    </div>

                    <p className="text-center mt-10 text-sm text-secondary font-medium">
                        {isLogin ? "New to the platform?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-accent-primary font-bold hover:text-accent-secondary transition-colors underline decoration-2 underline-offset-4"
                        >
                            {isLogin ? 'Register Now' : 'Log In'}
                        </button>
                    </p>
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
                .auth-input-refined::placeholder {
                    color: rgba(148, 163, 184, 0.4);
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
