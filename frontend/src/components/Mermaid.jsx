import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#fff',
        primaryBorderColor: '#4f46e5',
        lineColor: '#818cf8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
        mainBkg: '#020617',
        nodeBorder: '#334155',
    },
    flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis'
    },
    securityLevel: 'loose',
});

const Mermaid = ({ chart }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && chart) {
            ref.current.removeAttribute('data-processed');
            try {
                mermaid.contentLoaded();
            } catch (err) {
                console.error("Mermaid render error:", err);
            }
        }
    }, [chart]);

    return (
        <div className="mermaid flex justify-center items-center w-full h-full bg-transparent" ref={ref}>
            {chart}
        </div>
    );
};

export default Mermaid;
