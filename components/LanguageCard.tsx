'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageCard({ title, description }: { title: string, description: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Helper to get new path with locale
    const getPath = (locale: string) => {
        const segments = pathname.split('/');
        // segments[0] is empty, segments[1] is locale
        if (segments.length > 1) {
            segments[1] = locale;
        } else {
            segments.push(locale);
        }
        return segments.join('/');
    };

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {!isOpen ? (
                <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                    <p className="text-slate-400">{description}</p>
                </div>
            ) : (
                <div className="relative h-full flex flex-col justify-center animate-fade-in">
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Select Language</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Link href="/en" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white text-sm">
                            <span>🇬🇧</span> English
                        </Link>
                        <Link href="/es" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white text-sm">
                            <span>🇪🇸</span> Español
                        </Link>
                        <Link href="/zh" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white text-sm">
                            <span>🇨🇳</span> 中文
                        </Link>
                        <Link href="/hi" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white text-sm">
                            <span>🇮🇳</span> हिन्दी
                        </Link>
                        <Link href="/fr" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white text-sm">
                            <span>🇫🇷</span> Français
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
