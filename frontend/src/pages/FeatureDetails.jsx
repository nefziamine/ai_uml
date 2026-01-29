import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code2, Rocket, ArrowRight, Brain, Terminal, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturePage = ({ title, description, icon: Icon, features, colorClass }) => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-5xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <div className={`w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center mb-8 ${colorClass}`}>
                        <Icon size={40} />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">{title}</h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">{description}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-8 border-glass-border"
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary"><Rocket size={18} /></div>
                                {feature.title}
                            </h3>
                            <p className="text-secondary leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-panel p-12 text-center bg-gradient-accent shadow-2xl overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Ready to try it out?</h2>
                        <p className="text-white/80 mb-10 max-w-lg mx-auto">Experience the future of system design. Build your first architecture in seconds.</p>
                        <Link to="/login" className="btn bg-white text-accent-primary py-4 px-10 text-lg font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InstantGeneration = () => (
    <FeaturePage
        title="Instant Generation"
        description="Transform your thoughts into structured UML diagrams faster than you can sketch them by hand."
        icon={Zap}
        colorClass="text-warning"
        features={[
            { title: "Natural Language to UML", desc: "Just describe your system like you're talking to a colleague. No complex syntax required." },
            { title: "Mermaid.js Core", desc: "We generate industry-standard Mermaid code that is easily versionable and portable." },
            { title: "Real-time Rendering", desc: "Watch your architecture come to life as the AI parses your requirements." },
            { title: "Edge Case Handling", desc: "Advanced logic to handle vague requirements and suggest reasonable architectural assumptions." }
        ]}
    />
);

export const PatternDetection = () => (
    <FeaturePage
        title="Pattern Detection"
        description="Our AI engine scans your architecture for 23 standard GoF patterns and modern architectural styles."
        icon={Brain}
        colorClass="text-accent-secondary"
        features={[
            { title: "Structural Insights", desc: "Identifies if your system is following microservices, monolith, or event-driven patterns." },
            { title: "Design Pattern Matching", desc: "Spots Singleton, Factory, and Observer patterns automatically based on your descriptions." },
            { title: "SOLID Compliance", desc: "Analyze if your classes follow the Single Responsibility and Dependency Inversion principles." },
            { title: "Pattern Explanations", desc: "Don't just see the code—understand WHY the AI suggested a particular pattern." }
        ]}
    />
);

export const CodeSynchronized = () => (
    <FeaturePage
        title="Code Synchronized"
        description="Bridge the gap between design and implementation with seamless code generation."
        icon={Terminal}
        colorClass="text-success"
        features={[
            { title: "Java & Spring Boot", desc: "Generate JPA entities and Controller interfaces directly from your class diagrams." },
            { title: "TypeScript & React", desc: "Transform your diagrams into clean TS interfaces and type definitions." },
            { title: "Markdown Integration", desc: "Embed your diagrams directly into Github READMEs with auto-syncing code blocks." },
            { title: "IDE Ready", desc: "Export your architectural metadata in formats compatible with VS Code and IntelliJ plugins." }
        ]}
    />
);
