import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Code, FileText, HelpCircle, Terminal, Search, ChevronRight, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

const sections = [
    {
        title: 'Getting Started',
        icon: <Book className="text-accent-primary" size={20} />,
        links: [
            { id: 'quick-start', label: 'Quick Start Guide' },
            { id: 'setup', label: 'Project Setup' },
            { id: 'basics', label: 'Architecture Basics' },
            { id: 'first-gen', label: 'First Generation' }
        ]
    },
    {
        title: 'AI Engine',
        icon: <Terminal className="text-success" size={20} />,
        links: [
            { id: 'patterns', label: 'Pattern Recognition' },
            { id: 'prompting', label: 'Prompt Engineering' },
            { id: 'context', label: 'Relationship Context' },
            { id: 'hints', label: 'Semantic Hints' }
        ]
    },
    {
        title: 'Exports & Integration',
        icon: <FileText className="text-warning" size={20} />,
        links: [
            { id: 'plantuml', label: 'PlantUML Support' },
            { id: 'export-formats', label: 'SVG & PNG Export' },
            { id: 'markdown', label: 'Markdown Integration' },
            { id: 'plugins', label: 'IDEs Plugins' }
        ]
    },
    {
        title: 'Core Concepts',
        icon: <HelpCircle className="text-error" size={20} />,
        links: [
            { id: 'sw-patterns', label: 'Software Patterns' },
            { id: 'uml-standards', label: 'UML Standards' },
            { id: 'solid', label: 'SOLID Principles' },
            { id: 'mapping', label: 'System Mapping' }
        ]
    }
];

const contentMap = {
    'quick-start': {
        title: 'Quick Start Guide',
        content: (
            <div className="space-y-6">
                <p className="text-lg text-secondary">Start your architectural journey in less than 2 minutes. Our platform transforms your vision into diagrams instantly.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center mb-4"><Zap size={20} className="text-accent-primary" /></div>
                        <h4 className="font-bold mb-2">1. Paste Requirements</h4>
                        <p className="text-sm text-muted">Write your system description in natural language or upload a spec document.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center mb-4"><Sparkles size={20} className="text-success" /></div>
                        <h4 className="font-bold mb-2">2. Generate diagram</h4>
                        <p className="text-sm text-muted">Click the magic wand to let Gemini 1.5 analyze your text and render the UML.</p>
                    </div>
                </div>
            </div>
        )
    },
    'patterns': {
        title: 'Pattern Recognition',
        content: (
            <div className="space-y-6">
                <p className="text-lg text-secondary">The AI doesn't just draw; it thinks. It scans your text for structural intent and suggests industry-standard design patterns.</p>
                <div className="p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Shield size={18} className="text-accent-primary" /> Supported Patterns</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Singleton', 'Factory', 'Observer', 'Strategy', 'CQRS', 'Event Sourcing', 'Bridge', 'Adapter'].map(p => (
                            <span key={p} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">{p}</span>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    'export-formats': {
        title: 'Exporting Diagrams',
        content: (
            <div className="space-y-6">
                <p className="text-lg text-secondary">High-quality exports for your documentation and presentations.</p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl">
                        <CheckCircle className="text-success mt-1" size={18} />
                        <div>
                            <h5 className="font-bold">SVG (Scalable Vector Graphics)</h5>
                            <p className="text-sm text-muted">Best for web and printing. Infinite resolution.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl">
                        <CheckCircle className="text-success mt-1" size={18} />
                        <div>
                            <h5 className="font-bold">PNG (Portable Network Graphics)</h5>
                            <p className="text-sm text-muted">High-density rasterized images at 2x pixel ratio.</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
};

const DocsPage = () => {
    const [activeId, setActiveId] = useState('quick-start');
    const currentSection = contentMap[activeId] || contentMap['quick-start'];

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/4">
                        <div className="sticky top-32">
                            <div className="flex flex-col gap-10">
                                {sections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6 flex items-center gap-3">
                                            {section.icon}
                                            {section.title}
                                        </h3>
                                        <ul className="flex flex-col gap-3">
                                            {section.links.map((link) => (
                                                <li key={link.id}>
                                                    <button
                                                        onClick={() => setActiveId(link.id)}
                                                        className={`w-full text-left text-sm transition-colors flex items-center justify-between group ${activeId === link.id ? 'text-accent-primary font-bold' : 'text-secondary hover:text-accent-primary'}`}
                                                    >
                                                        {link.label}
                                                        <ChevronRight size={14} className={`${activeId === link.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} transition-all`} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="glass-panel p-10 md:p-16 border-glass-border min-h-[600px]"
                            >
                                <h1 className="text-4xl font-bold mb-8">{currentSection.title}</h1>
                                {currentSection.content}

                                <div className="mt-20 pt-10 border-t border-glass-border text-sm text-muted italic">
                                    Was this helpful? <button className="text-accent-primary hover:underline ml-2">Yes</button> / <button className="text-error hover:underline ml-2">No</button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocsPage;
