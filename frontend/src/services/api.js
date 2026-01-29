import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000, // 60 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/signin', { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (email, name, password) => {
        return api.post('/auth/signup', { email, name, password });
    },
    logout: () => {
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export const projectService = {
    createProject: async (name, description = "New Project") => {
        const user = authService.getCurrentUser();
        const projectData = {
            name,
            description,
            user: { id: user.id }
        };
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    getUserProjects: async () => {
        const user = authService.getCurrentUser();
        const response = await api.get(`/projects/user/${user.id}`);
        return response.data;
    },

    getProject: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    analyzeProject: async (projectId, requirements) => {
        const response = await api.post(`/projects/${projectId}/analyze`, { requirements });
        return response.data;
    },

    uploadRequirements: async (projectId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/projects/${projectId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export default api;
