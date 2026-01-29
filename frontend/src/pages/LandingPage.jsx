import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, Code2, Sparkles, Layout, Shield, Rocket, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeedbackSection from '../components/FeedbackSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary overflow-x-hidden">
            {/* Hero Section */}
            <header className="relative pt-48 pb-20 md:pt-64 md:pb-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/20 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-accent-secondary/10 blur-[100px] rounded-full"></div>
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
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                            Design Better Software <br />
                            <span className="text-gradient">With AI Intelligence</span>
                        </h1>
                        <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                            Upload your requirements and let our AI engine detect design patterns, map relationships, and generate professional UML diagrams in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link to="/login" className="btn btn-primary py-4 px-8 text-lg shadow-2xl">
                                <Rocket size={20} />
                                <span>Get Started Free</span>
                            </Link>
                            <Link to="/templates" className="btn btn-secondary py-4 px-8 text-lg">
                                <Code size={20} />
                                <span>View Templates</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Browser Mockup Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-24 relative mx-auto max-w-5xl"
                    >
                        <div className="glass-panel border-glass-border shadow-2xl overflow-hidden p-1.5 bg-white/5">
                            <div className="bg-bg-secondary/80 rounded-t-xl py-3 px-4 flex items-center gap-2 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-error/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-warning/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-success/40"></div>
                                </div>
                                <div className="mx-auto bg-white/5 rounded-md px-12 py-1 text-[10px] text-muted flex items-center gap-2">
                                    <Shield size={10} />
                                    ai-uml-generator.app/editor
                                </div>
                            </div>
                            <div className="aspect-video bg-[#0f172a] relative overflow-hidden">
                                <img
                                    src="/assets/ai_uml_hero_stable_1768265424261.png"
                                    alt="AI UML Interface"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent pointer-events-none"></div>
                                <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/20 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all group cursor-pointer">
                                    <div className="w-20 h-20 rounded-full bg-accent-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
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
                        />
                        <FeatureCard
                            icon={<Shield className="text-accent-primary" />}
                            title="Pattern Detection"
                            description="Automatically identify SOLID principles and Design Patterns within your architecture description."
                        />
                        <FeatureCard
                            icon={<Code2 className="text-accent-primary" />}
                            title="Code Synchronized"
                            description="Generate clean, production-ready boilerplate code in Java, Python, or TypeScript from your diagrams."
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

const FeatureCard = ({ icon, title, description }) => (
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
        <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-accent-primary mt-auto group transition-all">
            Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
    </motion.div>
);

export default LandingPage;
