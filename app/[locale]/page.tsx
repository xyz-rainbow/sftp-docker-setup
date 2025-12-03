import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageCard from '@/components/LanguageCard';

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* Main content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <main className="w-full max-w-6xl">
          {/* Hero section */}
          <div className="text-center space-y-8 animate-fade-in">
            {/* Logo/Title */}
            <div className="space-y-4">
              <div className="inline-block">
                <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  {t('title')}
                </h1>
                <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2" />
              </div>

              <p className="text-2xl text-slate-300 font-light">
                {t('welcome')}
              </p>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {t('description')}
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {/* Docker Management - Link to Dashboard */}
              <Link href={`/${locale}/dashboard`} className="block">
                <div className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('features.docker.title')}</h3>
                    <p className="text-slate-400">{t('features.docker.description')}</p>
                  </div>
                </div>
              </Link>

              {/* Real-time Monitoring */}
              <div className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('features.monitoring.title')}</h3>
                  <p className="text-slate-400">{t('features.monitoring.description')}</p>
                </div>
              </div>

              {/* Multi-language - Interactive Card */}
              <LanguageCard
                title={t('features.multilang.title')}
                description={t('features.multilang.description')}
              />
            </div>

            {/* CTA Button */}
            <div className="mt-12">
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300"
              >
                {t('getStarted')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">5+</div>
                <div className="text-slate-400 mt-2">{t('stats.languages')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400">∞</div>
                <div className="text-slate-400 mt-2">{t('stats.containers')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">24/7</div>
                <div className="text-slate-400 mt-2">{t('stats.monitoring')}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Language Selector - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/80 transition-all duration-300 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-sm font-medium">Language</span>
          </button>

          {/* Dropdown */}
          <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="p-2 space-y-1">
              <Link href="/en" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-white text-sm">English</span>
              </Link>
              <Link href="/es" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-2xl">🇪🇸</span>
                <span className="text-white text-sm">Español</span>
              </Link>
              <Link href="/zh" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-2xl">🇨🇳</span>
                <span className="text-white text-sm">中文</span>
              </Link>
              <Link href="/hi" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-white text-sm">हिन्दी</span>
              </Link>
              <Link href="/fr" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-white text-sm">Français</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
