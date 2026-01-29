import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wand2, Download, Share2, Code, FileCode, CheckCircle2,
    ChevronDown, Lightbulb, Upload, Layers, ZoomIn, ZoomOut,
    Maximize, X, Link as LinkIcon, Mail, Facebook, MessageCircle
} from 'lucide-react';
import Mermaid from '../components/Mermaid';
import { projectService, authService } from '../services/api';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { jsPDF } from 'jspdf';

const ProjectViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);
    const [requirements, setRequirements] = useState(location.state?.initialRequirements || '');
    const [diagramType, setDiagramType] = useState('CLASS');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState('diagram'); // 'diagram', 'code', 'patterns'
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [diagramData, setDiagramData] = useState({
        mermaid: '',
        patterns: {}
    });

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProjectData = async () => {
            try {
                const project = await projectService.getProject(id);
                if (project) {
                    if (project.requirements) setRequirements(project.requirements);
                    // If backend supports saving several diagrams, we take the last one
                    if (project.diagrams && project.diagrams.length > 0) {
                        const lastDiagram = project.diagrams[project.diagrams.length - 1];
                        setDiagramData(prev => ({
                            ...prev,
                            mermaid: lastDiagram.plantUmlCode || '',
                        }));
                        setDiagramType(lastDiagram.type || 'CLASS');
                    }
                    if (project.patternSuggestions && project.patternSuggestions.length > 0) {
                        const patternsObj = {};
                        project.patternSuggestions.forEach(p => {
                            patternsObj[p.patternName] = p.description;
                        });
                        setDiagramData(prev => ({
                            ...prev,
                            patterns: patternsObj
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to load project:", error);
            }
        };

        if (id) {
            fetchProjectData();
        }
    }, [navigate, id]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await projectService.uploadRequirements(id, file);
            setRequirements(result.content);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload file.");
        }
    };

    const handleAnalyze = async () => {
        if (!requirements || requirements.trim().length === 0) {
            alert("Please enter some requirements first.");
            return;
        }

        setIsAnalyzing(true);
        try {
            // Updated to use the correct endpoint and persist
            const result = await projectService.analyzeProject(id, requirements, diagramType);

            if (!result || !result.plantUml) {
                throw new Error("API returned an empty or invalid diagram payload.");
            }

            setDiagramData({
                mermaid: result.plantUml,
                patterns: result.patterns || {}
            });

            // Auto-scroll to diagram if it was just generated
            setActiveTab('diagram');
        } catch (error) {
            console.error("[ERROR] Analysis failed:", error);
            alert(`Architecture Analysis Failed: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const exportDiagram = async (format) => {
        const mermaidElement = document.querySelector('.mermaid');
        if (!mermaidElement) return;

        try {
            const { toPng, toSvg, toJpeg } = await import('html-to-image');
            const download = (await import('downloadjs')).default;

            const bg = '#020617';

            if (format === 'svg') {
                const dataUrl = await toSvg(mermaidElement, { backgroundColor: bg });
                download(dataUrl, `diagram-${id}.svg`, 'image/svg+xml');
            } else if (format === 'jpg') {
                const dataUrl = await toJpeg(mermaidElement, { backgroundColor: bg, quality: 1.0, pixelRatio: 3 });
                download(dataUrl, `diagram-${id}.jpg`, 'image/jpeg');
            } else if (format === 'pdf') {
                const dataUrl = await toPng(mermaidElement, { backgroundColor: bg, pixelRatio: 4 });
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [mermaidElement.scrollWidth, mermaidElement.scrollHeight]
                });
                pdf.addImage(dataUrl, 'PNG', 0, 0, mermaidElement.scrollWidth, mermaidElement.scrollHeight);
                pdf.save(`diagram-${id}.pdf`);
            } else {
                const dataUrl = await toPng(mermaidElement, { backgroundColor: bg, pixelRatio: 4 });
                download(dataUrl, `diagram-${id}.png`, 'image/png');
            }
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to export diagram.');
        } finally {
            setIsExportModalOpen(false);
        }
    };

    const copyShareLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Project link copied to clipboard!');
    };

    const shareToSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out my system architecture designed with AI UML!");
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'gmail':
                shareUrl = `mailto:?subject=AI Architecture Design&body=${text}%0A${url}`;
                break;
            default:
                break;
        }
        if (shareUrl) window.open(shareUrl, '_blank');
    };

    const copyCode = () => {
        navigator.clipboard.writeText(diagramData.mermaid);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="glass-panel p-8 border-glass-border">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <FileCode className="text-accent-primary" size={24} />
                                    Requirements
                                </h2>
                                <button
                                    className="btn btn-secondary p-2.5 rounded-xl transition-all"
                                    onClick={() => fileInputRef.current.click()}
                                    title="Upload text file"
                                >
                                    <Upload size={18} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".txt,.md,.java,.pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                />
                            </div>

                            <textarea
                                className="input-field w-full min-h-[350px] resize-none mb-6 font-mono text-sm leading-relaxed"
                                placeholder="Paste requirements or upload a file (PDF, Word, Code, TXT)..."
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                            />

                            <div className="mb-6">
                                <label className="text-xs font-bold text-muted uppercase tracking-widest mb-3 block flex items-center gap-2">
                                    <Layers size={14} />
                                    Diagram Type
                                </label>
                                <select
                                    className="input-field w-full py-3 bg-bg-secondary cursor-pointer"
                                    value={diagramType}
                                    onChange={(e) => setDiagramType(e.target.value)}
                                >
                                    <option value="CLASS">Class Diagram</option>
                                    <option value="USECASE">Use Case Diagram</option>
                                    <option value="SEQUENCE">Sequence Diagram</option>
                                </select>
                            </div>

                            <button
                                className={`btn btn-primary w-full py-4 text-lg shadow-xl ${isAnalyzing ? 'opacity-70 cursor-wait' : ''}`}
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !requirements}
                            >
                                {isAnalyzing ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    >
                                        <Wand2 size={22} />
                                    </motion.div>
                                ) : <Wand2 size={22} />}
                                <span>{isAnalyzing ? 'Analyzing Architecture...' : 'Generate Architecture'}</span>
                            </button>
                        </div>

                        <div className="glass-panel p-8 border-glass-border">
                            <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-6 flex items-center gap-3">
                                <Lightbulb size={18} className="text-warning" />
                                Quick Tips
                            </h3>
                            <ul className="text-sm text-secondary space-y-4">
                                <li className="flex gap-3 items-start">
                                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                    <span>Be specific about roles (Admin, User).</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                    <span>Mention relationships (e.g., "One-to-many").</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="glass-panel h-full flex flex-col border-glass-border overflow-hidden min-h-[700px]">
                            <div className="p-4 bg-bg-secondary/50 border-b border-glass-border flex justify-between items-center">
                                <div className="flex bg-bg-primary/50 p-1.5 rounded-2xl border border-white/5 w-fit">
                                    {['diagram', 'code', 'patterns'].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all relative ${activeTab === tab
                                                ? 'bg-accent-primary text-white shadow-lg'
                                                : 'text-secondary hover:text-primary hover:bg-white/5'
                                                }`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 bg-bg-primary/50 relative">
                                <AnimatePresence mode="wait">
                                    {isAnalyzing ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-center py-20 absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/80 z-20"
                                        >
                                            <div className="loader mb-8 mx-auto"></div>
                                            <p className="text-lg text-secondary font-medium animate-pulse tracking-wide">
                                                Consulting the AI Pattern Engine...
                                            </p>
                                        </motion.div>
                                    ) : diagramData.mermaid ? (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="w-full h-full relative"
                                        >
                                            {activeTab === 'diagram' && (
                                                <div className="w-full h-[800px] cursor-grab active:cursor-grabbing group/canvas relative bg-bg-primary/30 rounded-3xl border border-white/5 overflow-hidden">
                                                    <TransformWrapper
                                                        initialScale={1}
                                                        minScale={0.05}
                                                        maxScale={8}
                                                        centerOnInit={true}
                                                        limitToBounds={false}
                                                    >
                                                        {({ zoomIn, zoomOut, resetTransform }) => (
                                                            <>
                                                                {/* Refined Small Floating Toolbar */}
                                                                <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 group-hover/canvas:translate-x-0 translate-x-4 opacity-0 group-hover/canvas:opacity-100 transition-all duration-500">
                                                                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1.5">
                                                                        <button
                                                                            onClick={() => zoomIn(0.2)}
                                                                            className="w-10 h-10 flex items-center justify-center hover:bg-accent-primary rounded-xl text-white transition-all hover:scale-110 active:scale-90"
                                                                            title="Zoom In"
                                                                        >
                                                                            <ZoomIn size={18} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => zoomOut(0.2)}
                                                                            className="w-10 h-10 flex items-center justify-center hover:bg-accent-primary rounded-xl text-white transition-all hover:scale-110 active:scale-90"
                                                                            title="Zoom Out"
                                                                        >
                                                                            <ZoomOut size={18} />
                                                                        </button>
                                                                        <div className="h-px bg-white/10 mx-2" />
                                                                        <button
                                                                            onClick={() => resetTransform()}
                                                                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl text-white transition-all hover:scale-110 active:scale-90"
                                                                            title="Reset Zoom"
                                                                        >
                                                                            <Maximize size={18} />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <TransformComponent
                                                                    wrapperClassName="!w-full !h-full"
                                                                    contentClassName="!w-full !h-full"
                                                                >
                                                                    <div className="w-full h-full min-w-full min-h-full flex items-center justify-center p-20">
                                                                        <Mermaid chart={diagramData.mermaid} />
                                                                    </div>
                                                                </TransformComponent>

                                                                <div className="absolute bottom-6 left-6 text-[10px] font-bold uppercase tracking-wider text-muted opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                                                                    Scroll to Zoom • Drag to Pan
                                                                </div>
                                                            </>
                                                        )}
                                                    </TransformWrapper>
                                                </div>
                                            )}
                                            {activeTab === 'code' && (
                                                <div className="w-full h-full max-h-[600px] relative">
                                                    <button
                                                        onClick={copyCode}
                                                        className="absolute top-4 right-4 p-2.5 bg-accent-primary hover:bg-accent-secondary rounded-xl text-white shadow-lg transition-all flex items-center gap-2 text-xs font-bold"
                                                    >
                                                        <Code size={16} /> Copy Code
                                                    </button>
                                                    <pre className="w-full h-full text-sm font-mono text-accent-primary bg-bg-primary/80 p-8 rounded-2xl overflow-auto border border-white/10 shadow-inner">
                                                        {diagramData.mermaid}
                                                    </pre>
                                                </div>
                                            )}
                                            {activeTab === 'patterns' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full self-start p-8">
                                                    {Object.entries(diagramData.patterns).map(([name, desc], i) => (
                                                        <motion.div
                                                            key={name}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="p-6 bg-white/5 border border-glass-border rounded-2xl hover:bg-white/10 transition-colors group"
                                                        >
                                                            <h4 className="font-bold text-accent-primary mb-3 text-lg group-hover:text-accent-secondary transition-colors">{name}</h4>
                                                            <p className="text-secondary leading-relaxed">{desc}</p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center max-w-md mx-auto py-40"
                                        >
                                            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                                <Code size={48} className="text-muted" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">No architecture yet</h3>
                                            <p className="text-secondary">Enter requirements and click generate to see the magic happen.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {diagramData.mermaid && (
                                <div className="p-6 border-t border-glass-border flex justify-end gap-4 bg-bg-secondary/40">
                                    <button className="btn btn-secondary text-sm font-bold" onClick={() => setIsExportModalOpen(true)}>
                                        <Download size={18} /> Export
                                    </button>
                                    <button className="btn btn-primary text-sm font-bold shadow-lg" onClick={() => setIsShareModalOpen(true)}>
                                        <Share2 size={18} /> Share
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Share Modal */}
            <AnimatePresence>
                {isShareModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsShareModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md glass-panel p-8 relative z-10 border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsShareModalOpen(false)}
                                className="absolute top-4 right-4 text-secondary hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold mb-6">Share Project</h3>

                            <div className="flex flex-col gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                                    <span className="text-secondary text-sm truncate">{window.location.href}</span>
                                    <button
                                        onClick={copyShareLink}
                                        className="p-2.5 bg-accent-primary hover:bg-accent-secondary rounded-xl text-white transition-all shadow-lg flex-shrink-0"
                                    >
                                        <LinkIcon size={18} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <button onClick={() => shareToSocial('whatsapp')} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-success/20 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                                            <MessageCircle size={24} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                                    </button>
                                    <button onClick={() => shareToSocial('facebook')} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-blue-500/20 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                            <Facebook size={24} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Facebook</span>
                                    </button>
                                    <button onClick={() => shareToSocial('gmail')} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-red-500/20 transition-all group">
                                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                            <Mail size={24} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Gmail</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Export Modal */}
            <AnimatePresence>
                {isExportModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsExportModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md glass-panel p-8 relative z-10 border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsExportModalOpen(false)}
                                className="absolute top-4 right-4 text-secondary hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold mb-6">Choose Format</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <button onClick={() => exportDiagram('png')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                                            <Download size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold">PNG Image</h4>
                                            <p className="text-xs text-secondary">High quality raster image</p>
                                        </div>
                                    </div>
                                    <ChevronDown size={20} className="-rotate-90 text-secondary" />
                                </button>

                                <button onClick={() => exportDiagram('jpg')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center text-accent-secondary">
                                            <Download size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold">JPG Image</h4>
                                            <p className="text-xs text-secondary">Compressed photographic format</p>
                                        </div>
                                    </div>
                                    <ChevronDown size={20} className="-rotate-90 text-secondary" />
                                </button>

                                <button onClick={() => exportDiagram('pdf')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center text-warning">
                                            <FileCode size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold">PDF Document</h4>
                                            <p className="text-xs text-secondary">Vector-quality document</p>
                                        </div>
                                    </div>
                                    <ChevronDown size={20} className="-rotate-90 text-secondary" />
                                </button>

                                <button onClick={() => exportDiagram('svg')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success">
                                            <Code size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold">SVG Vector</h4>
                                            <p className="text-xs text-secondary">Scalable vector graphics</p>
                                        </div>
                                    </div>
                                    <ChevronDown size={20} className="-rotate-90 text-secondary" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectViewer;
