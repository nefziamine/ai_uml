import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Need to get user details because current API stores full user object in localStorage
            // For now, minimal object. Ideally we'd have an endpoint to fetch me.
            const user = {
                token: token,
                // We'll trust the token for now, or fetch user info if needed.
            };
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
        } else {
            navigate('/login?error=OAuth2 Authentication Failed');
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary">
            <Loader2 className="animate-spin text-accent-primary mb-4" size={48} />
            <p className="text-secondary font-medium tracking-wide">Finalizing authentication...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
