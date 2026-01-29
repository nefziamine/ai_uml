import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Image as ImageIcon, Link as LinkIcon, FileText, Check, Download, Share2 } from 'lucide-react';

const ExportPage = () => {
    const exportFormats = [
        { id: 'pdf', name: 'Portable Document (PDF)', icon: <FileText size={40} className="text-red-400" />, desc: 'Best for documentation and sharing.' },
        { id: 'png', name: 'High Res Image (PNG)', icon: <ImageIcon size={40} className="text-blue-400" />, desc: 'Best for web and presentations.' },
        { id: 'svg', name: 'Vector Graphic (SVG)', icon: <FileDown size={40} className="text-green-400" />, desc: 'Lossless scaling for professional design.' },
        { id: 'link', name: 'Shareable Link', icon: <LinkIcon size={40} className="text-purple-400" />, desc: 'Instantly share a view-only version.' },
    ];

    return (
        <div className="export-container pt-32 pb-20 min-h-screen">
            <div className="container max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Export Your Architecture</h1>
                    <p className="text-secondary">Choose your preferred format to share or integrate your diagrams.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {exportFormats.map((format, index) => (
                        <motion.div
                            key={format.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-8 border-glass-border hover:border-accent-primary cursor-pointer group flex items-start gap-6"
                        >
                            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                                {format.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">{format.name}</h3>
                                <p className="text-secondary text-sm leading-relaxed">{format.desc}</p>
                                <button className="mt-4 flex items-center gap-2 text-accent-primary font-bold text-sm">
                                    <span>Select Format</span>
                                    <Check size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-panel border-glass-border p-10 bg-accent-primary/5 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Export?</h3>
                    <p className="text-secondary mb-8 max-w-lg mx-auto">Clicking download will generate a high-resolution version of your current Class Diagram with all design patterns documented.</p>
                    <div className="flex justify-center gap-4">
                        <button className="btn btn-primary px-10 py-4 flex items-center gap-2">
                            <Download size={20} />
                            Download Now
                        </button>
                        <button className="btn btn-secondary px-10 py-4 flex items-center gap-2">
                            <Share2 size={20} />
                            Share Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportPage;
