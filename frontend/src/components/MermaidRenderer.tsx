import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
});

interface MermaidRendererProps {
  chart: string;
}

export const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    const renderChart = async () => {
      if (!chart.trim()) return;
      try {
        setError(null);
        const { svg } = await mermaid.render(uniqueId, chart);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        console.warn('Mermaid Render Notice:', err);
        if (isMounted) {
          setError(err.message || 'Diagram rendering notice');
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
      const elem = document.getElementById(uniqueId);
      if (elem) elem.remove();
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 overflow-x-auto">
        <pre>{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-6 p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-x-auto flex justify-center items-center">
      <div 
        ref={containerRef} 
        dangerouslySetInnerHTML={{ __html: svgContent }} 
        className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
      />
    </div>
  );
};
