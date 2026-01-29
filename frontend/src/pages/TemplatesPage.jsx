import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Code, Server, Smartphone, Database, Shield, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const templates = [
    {
        id: 'ecommerce',
        title: 'E-commerce Microservices',
        icon: <Server className="text-accent-primary" size={32} />,
        description: 'Complete architecture for an online store including payment, cart, and inventory services.',
        patterns: ['Saga Pattern', 'OAuth 2.0', 'Event Sourcing'],
        complexity: 'High'
    },
    {
        id: 'social-auth',
        title: 'Social Identity System',
        icon: <Shield className="text-success" size={32} />,
        description: 'A robust authentication system with Google, GitHub, and email/password support.',
        patterns: ['Strategy Pattern', 'Factory Method', 'Proxy'],
        complexity: 'Medium'
    },
    {
        id: 'mobile-api',
        title: 'Mobile App Backend',
        icon: <Smartphone className="text-warning" size={32} />,
        description: 'RESTful API structure optimized for mobile clients with caching and rate limiting.',
        patterns: ['BFF Pattern', 'Adapter Pattern', 'Repository'],
        complexity: 'Medium'
    },
    {
        id: 'data-pipeline',
        title: 'Real-time Data Pipeline',
        icon: <Database className="text-error" size={32} />,
        description: 'Architecture for high-throughput data processing using pub/sub and streamers.',
        patterns: ['Observer Pattern', 'Mediator', 'State Pattern'],
        complexity: 'High'
    }
];

const TemplatesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] -z-10"></div>

            <div className="container max-w-7xl mx-auto px-6 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Layout size={14} className="text-accent-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Ready-to-use Blueprints</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6">
                        Start with a <span className="text-gradient">Template</span>
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                        Don't start from scratch. Use our pre-designed architectural templates to kickstart your next big project.
                    </p>
                </motion.div>
            </div>

            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-8 group hover:border-accent-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-primary/10"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                    {template.icon}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-primary/10 text-[10px] font-bold uppercase tracking-widest text-accent-primary border border-accent-primary/20">
                                    Complexity: {template.complexity}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-primary transition-colors">{template.title}</h3>
                            <p className="text-secondary text-sm leading-relaxed mb-8">
                                {template.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {template.patterns.map(pattern => (
                                    <span key={pattern} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted group-hover:border-accent-primary/20 transition-all">
                                        {pattern}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-3 text-sm font-bold text-accent-primary group-hover:gap-5 transition-all"
                            >
                                Use Template <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <section className="mt-32 pt-20 border-t border-glass-border">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="glass-panel p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-accent"></div>
                        <h2 className="text-3xl font-bold mb-6 italic">"The e-commerce template saved us 2 weeks of architecture planning."</h2>
                        <div className="flex justify-center gap-1 text-warning mb-6">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                        </div>
                        <p className="text-lg font-bold">Marcus Chen</p>
                        <p className="text-sm text-secondary uppercase tracking-widest">Lead Architect, ShopFast</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TemplatesPage;
