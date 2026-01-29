import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Folder, Clock, ChevronRight, Search, LayoutGrid, List, Edit3, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService, authService } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        fetchProjects();
    }, [navigate]);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const data = await projectService.getUserProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = async () => {
        const name = prompt("Enter project name:");
        if (!name) return;
        try {
            const newProject = await projectService.createProject(name, "New Project Description");
            navigate(`/project/${newProject.id}`);
        } catch (error) {
            alert("Failed to create project");
        }
    };

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-7xl mx-auto px-6">
                {/* Header - Better spacing and alignment */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            My <span className="text-gradient">Projects</span>
                        </h1>
                        <p className="text-secondary text-lg">Manage and analyze your software architectures</p>
                    </div>
                    <button onClick={handleCreateProject} className="btn btn-primary shadow-xl py-3 px-6">
                        <Plus size={18} />
                        <span>New Project</span>
                    </button>
                </div>

                {/* Toolbar - Proper spacing between search and view toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-10">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="input-field pl-12 w-full py-3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10 self-start sm:self-center">
                        <button
                            className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-accent-primary text-white shadow-lg' : 'text-secondary hover:text-primary hover:bg-white/5'}`}
                            onClick={() => setViewMode('grid')}
                            aria-label="Grid view"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-accent-primary text-white shadow-lg' : 'text-secondary hover:text-primary hover:bg-white/5'}`}
                            onClick={() => setViewMode('list')}
                            aria-label="List view"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Projects Grid/List */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="loader mb-4"></div>
                        <p className="text-secondary">Loading your workspace...</p>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                viewMode={viewMode}
                                index={index}
                                onClick={() => navigate(`/project/${project.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel p-20 text-center border-dashed border-2 min-h-[400px] flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Folder size={48} className="text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No projects found</h3>
                        <p className="text-secondary mb-10 max-w-md">
                            {searchQuery ? "Try a different search term" : "Ready to start your next architectural masterpiece?"}
                        </p>
                        {!searchQuery && (
                            <button onClick={handleCreateProject} className="btn btn-secondary py-3 px-6">
                                <Plus size={18} />
                                Create your first project
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProjectCard = ({ project, viewMode, onClick, index }) => {
    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={onClick}
                className="glass-panel p-6 flex items-center justify-between cursor-pointer group"
            >
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
                        <Folder size={22} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-1.5">{project.name}</h3>
                        <p className="text-sm text-secondary flex items-center gap-2">
                            <Clock size={14} />
                            Last edited 2 days ago
                        </p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-secondary group-hover:text-primary transition-all" />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className="glass-panel p-8 cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                    <Folder size={28} />
                </div>
                <div className="flex gap-2">
                    <button
                        className="p-2.5 text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        onClick={(e) => { e.stopPropagation(); }}
                        aria-label="Edit project"
                    >
                        <Edit3 size={16} />
                    </button>
                    <button
                        className="p-2.5 text-secondary hover:text-error transition-colors rounded-lg hover:bg-error/10"
                        onClick={(e) => { e.stopPropagation(); }}
                        aria-label="Delete project"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors">
                {project.name}
            </h3>
            <p className="text-secondary text-sm mb-8 line-clamp-2 leading-relaxed min-h-[40px]">
                {project.description || "No description provided for this project."}
            </p>

            <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Architecture Model
                </span>
                <div className="flex items-center gap-1.5 text-accent-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Open <ChevronRight size={16} />
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
