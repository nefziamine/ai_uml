import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

const FeedbackSection = () => {
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="py-20 relative overflow-hidden">
                <div className="container max-w-xl mx-auto text-center glass-panel p-12 border-glass-border">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-success/30"
                    >
                        <CheckCircle2 size={40} className="text-success" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                    <p className="text-secondary leading-relaxed">
                        Your feedback helps us build the future of AI-driven architecture design.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="btn btn-secondary mt-8"
                    >
                        Send another feedback
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 relative">
            <div className="container max-w-4xl mx-auto">
                <div className="glass-panel p-8 md:p-16 border-glass-border relative overflow-hidden">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 text-accent-primary mb-6">
                                <MessageSquare size={24} />
                                <span className="text-sm font-bold uppercase tracking-widest">Feedback</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Help us <span className="text-gradient">Improve</span> the Engine
                            </h2>
                            <p className="text-secondary leading-relaxed mb-8">
                                How is the pattern detection working for you? We read every piece of feedback to optimize our AI models.
                            </p>

                            <div className="flex gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setRating(star)}
                                        className={`transition-transform hover:scale-110 ${rating >= star ? 'text-warning fill-warning' : 'text-muted'}`}
                                    >
                                        <Star size={28} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1">Your Opinion</label>
                                <textarea
                                    className="input-field min-h-[150px] resize-none p-4"
                                    placeholder="What features should we add next? How accurate was the last diagram?"
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-full py-4 text-sm font-bold shadow-xl">
                                <Send size={18} />
                                <span>Submit Feedback</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;
