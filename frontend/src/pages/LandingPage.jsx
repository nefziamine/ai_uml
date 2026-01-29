import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, Code2, Sparkles, Layout, Shield, Rocket, Code } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackSection from '../components/FeedbackSection';

const LandingPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleTemplatesClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/templates');
        } else {
            navigate('/login?redirectTo=/templates');
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary overflow-x-hidden">
            {/* Hero Section */}
            <header className="relative pt-48 pb-20 md:pt-64 md:pb-40 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                    >
                        <img
                            src="/assets/hero.png"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/80 to-bg-primary"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-transparent to-bg-primary"></div>

                    {/* Additional Glowing Accents */}
                    <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-accent-primary/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-accent-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <Sparkles size={14} className="text-accent-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary">AI-Powered System Design</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tighter">
                            Architect Your <br />
                            <span className="text-gradient">Vision with AI</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            The ultimate platform for software architects. Automatically transform complex requirements into production-grade UML diagrams and detect design patterns with state-of-the-art AI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            {!isAuthenticated && (
                                <Link to="/login" className="btn btn-primary py-4 px-10 text-lg shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                                    <Rocket size={20} />
                                    <span>Get Started Free</span>
                                </Link>
                            )}
                            <button
                                onClick={handleTemplatesClick}
                                className="btn btn-secondary py-4 px-10 text-lg bg-white/5 backdrop-blur-md flex items-center gap-2"
                            >
                                <Code size={20} />
                                <span>View Templates</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-24 relative overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4">Powerful Features for <span className="text-gradient">Architects</span></h2>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">Everything you need to design, document, and evolve your software systems.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-accent-primary" />}
                            title="Instant Generation"
                            description="Convert complex requirements into structured UML diagrams in seconds using our proprietary AI model."
                            link="/features/instant"
                        />
                        <FeatureCard
                            icon={<Shield className="text-accent-primary" />}
                            title="Pattern Detection"
                            description="Automatically identify SOLID principles and Design Patterns within your architecture description."
                            link="/features/patterns"
                        />
                        <FeatureCard
                            icon={<Code2 className="text-accent-primary" />}
                            title="Code Synchronized"
                            description="Generate clean, production-ready boilerplate code in Java, Python, or TypeScript from your diagrams."
                            link="/features/sync"
                        />
                    </div>
                </div>
            </section>

            <FeedbackSection />

            <style>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, link }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="glass-panel p-8 flex flex-col gap-6"
    >
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-secondary text-sm leading-relaxed">
                {description}
            </p>
        </div>
        <Link to={link || "/login"} className="flex items-center gap-2 text-sm font-bold text-accent-primary mt-auto group transition-all">
            Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </motion.div>
);

export default LandingPage;
