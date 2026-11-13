'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import SearchBox from './SearchBox';

export default function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/#browse-categories', label: t('categories') },
    { href: '/#new-games', label: t('new') },
    { href: '/#trending', label: t('trending') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-muted/10 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:gap-6 md:px-8">
        <Link href="/" className="shrink-0 font-display text-xl font-bold text-fg">
          <span className="text-accent">●</span> {t('brand')}
        </Link>

        <SearchBox className="mx-auto min-w-0 w-full max-w-md hidden md:block" />

        <nav aria-label={t('mainNav')} className="hidden items-center gap-6 text-sm font-medium text-muted xl:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label={t('openSearch')}
            className="grid h-9 w-9 place-items-center rounded-pill border border-muted/30 bg-surface text-fg md:hidden"
          >
            ⌕
          </button>

          <LanguageSwitcher />
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden whitespace-nowrap rounded-pill px-4 py-2 text-sm font-semibold text-fg transition hover:text-secondary md:inline-flex"
          >
            {t('login')}
          </Link>
          <Link
            href="/login"
            className="hidden whitespace-nowrap rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110 md:inline-flex"
          >
            {t('signup')}
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t('menu')}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-pill border border-muted/30 bg-surface text-fg xl:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-muted/10 px-4 py-3 md:hidden">
          <SearchBox onSubmitDone={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <nav id="mobile-menu" aria-label={t('mobileNav')} className="border-t border-muted/10 px-4 py-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-card px-4 py-3 text-fg hover:bg-surface"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
            <Link href="/login" className="rounded-pill border border-muted/30 py-3 text-center text-sm font-semibold text-fg">
              {t('login')}
            </Link>
            <Link href="/login" className="rounded-pill bg-primary py-3 text-center text-sm font-semibold text-white">
              {t('signup')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
