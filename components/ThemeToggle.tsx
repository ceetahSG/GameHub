'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const t = useTranslations('nav');
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      /* storage unavailable: keep the in-memory choice only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('theme')}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-pill border border-muted/30 bg-surface text-fg transition hover:border-secondary"
    >
      {light ? '☾' : '☀'}
    </button>
  );
}
