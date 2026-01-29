import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, FileText, HelpCircle, Terminal, Search, ChevronRight } from 'lucide-react';

const sections = [
    {
        title: 'Getting Started',
        icon: <Book className="text-accent-primary" size={20} />,
        links: ['Quick Start Guide', 'Project Setup', 'Architecture Basics', 'First Generation']
    },
    {
        title: 'AI Engine',
        icon: <Terminal className="text-success" size={20} />,
        links: ['Pattern Recognition', 'Prompt Engineering', 'Relationship Context', 'Semantic Hints']
    },
    {
        title: 'Exports & Integration',
        icon: <FileText className="text-warning" size={20} />,
        links: ['PlantUML Support', 'SVG & PNG Export', 'Markdown Integration', 'IDEs Plugins']
    },
    {
        title: 'Core Concepts',
        icon: <HelpCircle className="text-error" size={20} />,
        links: ['Software Patterns', 'UML Standards', 'SOLID Principles', 'System Mapping']
    }
];

const DocsPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar / Categories */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-32">
                            <div className="relative mb-8">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search docs..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent-primary transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-10">
                                {sections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6 flex items-center gap-3">
                                            {section.icon}
                                            {section.title}
                                        </h3>
                                        <ul className="flex flex-col gap-3">
                                            {section.links.map((link) => (
                                                <li key={link}>
                                                    <a href="#" className="text-sm text-secondary hover:text-accent-primary transition-colors flex items-center justify-between group">
                                                        {link}
                                                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-3/4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-panel p-10 md:p-16 border-glass-border"
                        >
                            <h1 className="text-4xl font-bold mb-6">Introduction to AI UML</h1>
                            <p className="text-lg text-secondary leading-relaxed mb-10">
                                Welcome to the official documentation. AI UML Generator is designed to bridge the gap between human requirements and technical diagrams using advanced semantic analysis.
                            </p>

                            <div className="p-6 bg-accent-primary/5 border-l-4 border-accent-primary rounded-r-xl mb-12">
                                <p className="text-sm font-medium leading-relaxed italic">
                                    "Architecture is about the important stuff. Whatever that is." — Ralph Johnson, Author of Design Patterns.
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6">How it works</h2>
                            <p className="text-secondary leading-relaxed mb-8">
                                Our platform uses a specialized Generative Model fine-tuned for software engineering concepts. When you describe a system, the engine:
                            </p>
                            <ul className="space-y-6 mb-12">
                                {[
                                    { title: 'Entity Extraction', desc: 'Identifies Actors, Objects, and Services in your text.' },
                                    { title: 'Relationship Mapping', desc: 'Detects associations, dependencies, and inheritance paths.' },
                                    { title: 'Pattern Recommendation', desc: 'Spots opportunities for GOF and Architectural patterns.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">{item.title}</h4>
                                            <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <h2 className="text-2xl font-bold mb-6">Quick Example</h2>
                            <div className="bg-[#0b1120] rounded-xl p-6 border border-white/5 font-mono text-xs overflow-auto">
                                <span className="text-accent-secondary">@startuml</span><br />
                                <span className="text-accent-primary">class</span> User &#123;<br />
                                &nbsp;&nbsp;+Login()<br />
                                &#125;<br />
                                User <span className="text-success">--&gt;</span> Project : <span className="text-warning">creates</span><br />
                                <span className="text-accent-secondary">@enduml</span>
                            </div>

                            <div className="mt-16 flex justify-between items-center border-t border-glass-border pt-10">
                                <div className="text-left">
                                    <p className="text-xs text-muted uppercase tracking-widest mb-1">Previous</p>
                                    <h4 className="font-bold text-accent-primary">Architecture Hub</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted uppercase tracking-widest mb-1">Next</p>
                                    <h4 className="font-bold text-accent-primary">Quick Start Guide</h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DocsPage;
