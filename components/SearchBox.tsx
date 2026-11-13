'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function SearchBox({
  className = '',
  onSubmitDone,
}: {
  className?: string;
  onSubmitDone?: () => void;
}) {
  const t = useTranslations('nav');
  const router = useRouter();
  const [query, setQuery] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onSubmitDone?.();
  }

  return (
    <form role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        {t('searchLabel')}
      </label>
      <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        ⌕
      </span>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="h-11 w-full rounded-pill border border-muted/30 bg-surface pl-11 pr-4 text-sm text-fg placeholder:text-muted outline-none transition focus:border-secondary"
      />
    </form>
  );
}
