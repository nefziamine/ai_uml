import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Smartphone, Database, Shield, ArrowRight, Star, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/api';

const templates = [
    {
        id: 'ecommerce',
        title: 'E-commerce Microservices',
        icon: <Server className="text-accent-primary" size={32} />,
        description: 'Complete architecture for an online store including payment, cart, and inventory services.',
        patterns: ['Saga Pattern', 'OAuth 2.0', 'Event Sourcing'],
        complexity: 'High',
        requirements: "Design a microservices-based e-commerce platform. Services include: User Service for account management, Catalog Service for products, Order Service for transactions, and Payment Service. Use a Saga pattern for distributed transactions. Implement an API Gateway for client communication."
    },
    {
        id: 'social-auth',
        title: 'Social Identity System',
        icon: <Shield className="text-success" size={32} />,
        description: 'A robust authentication system with Google, GitHub, and email/password support.',
        patterns: ['Strategy Pattern', 'Factory Method', 'Proxy'],
        complexity: 'Medium',
        requirements: "Build a centralized authentication system. Support multiple login providers (Google, GitHub, Local). Use the Strategy pattern to handle different auth providers. Include a Proxy for rate limiting and a Factory for creating user sessions."
    },
    {
        id: 'saas-platform',
        title: 'Modern AI SaaS Platform',
        icon: <Sparkles className="text-accent-tertiary" size={32} />,
        description: 'Multi-tenant architecture with AI processing queues, tiered subscription levels, and dynamic scaling.',
        patterns: ['Command Pattern', 'CQRS', 'Tenant Isolation'],
        complexity: 'High',
        requirements: "Architect a multi-tenant AI SaaS. Requirement: Users can upload datasets for training. Use CQRS to separate read and write operations. Implement a job queue (Redis/RabbitMQ) for asynchronous AI model training. Ensure data isolation between tenants using a 'schema-per-tenant' approach."
    },
    {
        id: 'fintech-banking',
        title: 'Core Banking Hub',
        icon: <Shield className="text-accent-primary" size={32} />,
        description: 'Ultra-secure transaction processor with audit logging, fraud detection, and multi-region failover.',
        patterns: ['Decorator Pattern', 'Chain of Responsibility', 'Memento'],
        complexity: 'Critical',
        requirements: "Design a high-security banking system. Transactions must be atomic. Use Chain of Responsibility for a series of fraud checks. Implement the Memento pattern for transaction rollback/history. Use the Decorator pattern to add logging and encryption layers to the base transaction service."
    },
    {
        id: 'iot-smart-city',
        title: 'IoT Edge Mesh',
        icon: <Zap className="text-warning" size={32} />,
        description: 'Large-scale device management for smart city sensors with edge computing and low-latency metrics.',
        patterns: ['Observer Pattern', 'Flyweight', 'Bridge'],
        complexity: 'High',
        requirements: "Design a smart city IoT network. Use the Flyweight pattern to minimize memory usage for millions of sensor objects. Implement the Observer pattern for real-time alerting. Use a Bridge pattern to decouple the sensor abstraction from its low-level hardware implementations (Zigbee, LoRa, Wi-Fi)."
    },
    {
        id: 'streaming-service',
        title: 'Video Streaming Mesh',
        icon: <Layout className="text-error" size={32} />,
        description: 'Global content delivery network architecture with dynamic adaptive bitrate and user personalization.',
        patterns: ['Proxy Pattern', 'State Pattern', 'Strategy'],
        complexity: 'High',
        requirements: "Architect a video streaming platform. Use the Proxy pattern for CDN edge caching. Implement the State pattern to manage user subscription lifecycle (Trial, Active, Paused, Canceled). Use the Strategy pattern to select different transcoding algorithms based on client connection speed."
    }
];

const TemplatesPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirectTo=/templates');
        }
    }, [isAuthenticated, navigate]);

    const handleUseTemplate = async (template) => {
        try {
            const newProject = await projectService.createProject(
                template.title,
                template.description
            );
            navigate(`/project/${newProject.id}`, { state: { initialRequirements: template.requirements } });
        } catch (error) {
            console.error("Failed to use template:", error);
            alert("Failed to create project from template.");
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] -z-10"></div>

            <div className="container max-w-7xl mx-auto px-6 text-center mb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Layout size={14} className="text-accent-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">Ready-to-use Blueprints</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Start with a <span className="text-gradient">Template</span></h1>
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
                            <p className="text-secondary text-sm leading-relaxed mb-8">{template.description}</p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {template.patterns.map(pattern => (
                                    <span key={pattern} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted group-hover:border-accent-primary/20 transition-all">
                                        {pattern}
                                    </span>
                                ))}
                            </div>

                            <button onClick={() => handleUseTemplate(template)} className="flex items-center gap-3 text-sm font-bold text-accent-primary group-hover:gap-5 transition-all">
                                Use Template <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;
