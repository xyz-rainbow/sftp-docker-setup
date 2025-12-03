'use client';

import { useState, useEffect, useRef } from 'react';

interface LogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    containerName: string;
}

export default function LogsModal({ isOpen, onClose, containerName }: LogsModalProps) {
    const [logs, setLogs] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Simulate fetching logs
            const initialLogs = [
                `[${new Date().toISOString()}] INFO: Starting container ${containerName}...`,
                `[${new Date().toISOString()}] INFO: Initializing application...`,
                `[${new Date().toISOString()}] INFO: Connected to database.`,
                `[${new Date().toISOString()}] WARN: High memory usage detected during startup.`,
                `[${new Date().toISOString()}] INFO: Server listening on port 3000.`
            ];
            setLogs(initialLogs);

            // Simulate live logs
            const interval = setInterval(() => {
                const newLog = `[${new Date().toISOString()}] INFO: Processing request ${Math.floor(Math.random() * 1000)}`;
                setLogs(prev => [...prev, newLog]);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isOpen, containerName]);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-4xl h-[80vh] rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white font-mono">Logs: {containerName}</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setLogs([])}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={onClose}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-black/50 rounded-xl border border-slate-800 p-4 font-mono text-sm">
                    {logs.map((log, index) => (
                        <div key={index} className="mb-1">
                            <span className="text-slate-500">{log.split(']')[0]}]</span>
                            <span className={
                                log.includes('WARN') ? 'text-yellow-400' :
                                    log.includes('ERROR') ? 'text-red-400' :
                                        'text-green-400'
                            }>
                                {log.split(']')[1]}
                            </span>
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>
            </div>
        </div>
    );
}
