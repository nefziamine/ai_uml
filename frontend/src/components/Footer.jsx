import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart, Mail, Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-bg-secondary/30 pt-20 pb-10 border-t border-glass-border overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand section */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center shadow-lg">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                AI <span className="text-gradient">UML</span>
                            </span>
                        </Link>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">
                            Empowering architects with AI-driven design pattern detection and UML generation. Build faster, design better.
                        </p>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-accent-primary hover:border-accent-primary transition-all">
                                <Github size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-accent-primary hover:border-accent-primary transition-all">
                                <Twitter size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-accent-primary hover:border-accent-primary transition-all">
                                <Linkedin size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Product</h4>
                        <ul className="flex flex-col gap-4 text-sm text-secondary">
                            <li><Link to="/templates" className="hover:text-accent-primary transition-colors">Templates</Link></li>
                            <li><Link to="/docs" className="hover:text-accent-primary transition-colors">Documentation</Link></li>
                            <li><Link to="/dashboard" className="hover:text-accent-primary transition-colors">Dashboard</Link></li>
                            <li><Link to="/login" className="hover:text-accent-primary transition-colors">Get Started</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-secondary">
                            <li><Link to="/docs" className="hover:text-accent-primary transition-colors">API Reference</Link></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">Community Forum</a></li>
                            <li><Link to="/templates" className="hover:text-accent-primary transition-colors">Design Patterns Guide</Link></li>
                            <li><Link to="/docs" className="hover:text-accent-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Feedback link */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Stay Connected</h4>
                        <p className="text-sm text-secondary mb-6 leading-relaxed">
                            Subscribe to get latest design patterns and architect tips.
                        </p>
                        <form className="relative group" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                            <input
                                type="email"
                                placeholder="architect@world.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:border-accent-primary outline-none transition-all pr-12"
                                required
                            />
                            <button type="submit" className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-accent-primary text-white shadow-lg hover:bg-accent-secondary transition-colors">
                                <Mail size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted font-medium">
                    <p className="flex items-center gap-2">
                        © 2026 AI UML Architect. Made with <Heart size={14} className="text-error fill-error" /> for developers.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/docs" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                        <Link to="/docs" className="hover:text-secondary transition-colors">Terms of Service</Link>
                        <Link to="/docs" className="hover:text-secondary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
