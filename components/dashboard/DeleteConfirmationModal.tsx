'use client';

import { useState, useEffect } from 'react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    containerName: string;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, containerName }: DeleteConfirmationModalProps) {
    const [challenge, setChallenge] = useState({ num1: 0, num2: 0 });
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setChallenge({
                num1: Math.floor(Math.random() * 10) + 1,
                num2: Math.floor(Math.random() * 10) + 1
            });
            setAnswer('');
            setError(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(answer) === challenge.num1 + challenge.num2) {
            onConfirm();
            onClose();
        } else {
            setError(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl transform transition-all scale-100">
                <h3 className="text-xl font-bold text-white mb-2">Delete Container</h3>
                <p className="text-slate-400 mb-6">
                    Are you sure you want to delete <span className="text-white font-semibold">{containerName}</span>? This action cannot be undone.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <label className="block text-sm text-slate-400 mb-2">Security Check</label>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-mono text-white">{challenge.num1} + {challenge.num2} = </span>
                            <input
                                type="number"
                                value={answer}
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                    setError(false);
                                }}
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="?"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm mt-2">Incorrect answer. Please try again.</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors shadow-lg shadow-red-500/20"
                        >
                            Delete Container
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
