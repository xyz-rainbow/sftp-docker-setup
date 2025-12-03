'use client';

import { useState, useEffect } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [config, setConfig] = useState({
        serverPort: '3000',
        dashboardUrl: 'http://localhost:3000',
        refreshRate: '5',
        theme: 'dark',
        dockerSocket: '/var/run/docker.sock'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempConfig, setTempConfig] = useState(config);

    useEffect(() => {
        if (isOpen) {
            setTempConfig(config);
            setIsEditing(false);
        }
    }, [isOpen, config]);

    const handleSave = () => {
        setConfig(tempConfig);
        setIsEditing(false);
        // Here you would typically save to backend/local storage
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        System Settings
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Server Port</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={tempConfig.serverPort}
                                onChange={(e) => setTempConfig({ ...tempConfig, serverPort: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Dashboard URL</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={tempConfig.dashboardUrl}
                                onChange={(e) => setTempConfig({ ...tempConfig, dashboardUrl: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Refresh Rate (seconds)</label>
                            <input
                                type="number"
                                disabled={!isEditing}
                                value={tempConfig.refreshRate}
                                onChange={(e) => setTempConfig({ ...tempConfig, refreshRate: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Docker Socket</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={tempConfig.dockerSocket}
                                onChange={(e) => setTempConfig({ ...tempConfig, dockerSocket: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <h4 className="text-sm font-medium text-slate-300 mb-2">System Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Version</span>
                                <span className="text-slate-300">v2.0.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Environment</span>
                                <span className="text-slate-300">Production</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Node Version</span>
                                <span className="text-slate-300">v18.16.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Uptime</span>
                                <span className="text-slate-300">5d 12h 30m</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">
                    {isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors shadow-lg shadow-purple-500/20"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Edit Settings
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
