'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = ['en', 'bn'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: (typeof LOCALES)[number]) {
    if (next === locale) return;
    // Remember the choice for future visits.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="inline-flex shrink-0 rounded-pill border border-muted/30 bg-surface p-1 text-sm font-semibold"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => switchTo(code)}
            className={`rounded-pill px-3 py-1 transition ${
              active ? 'bg-primary text-white' : 'text-muted hover:text-fg'
            }`}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
