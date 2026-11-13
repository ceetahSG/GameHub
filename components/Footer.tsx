import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { formatNumber } from '@/lib/format';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Footer() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const locale = await getLocale();
  const year = formatNumber(new Date().getFullYear(), locale);

  const columns = [
    {
      title: t('colGames'),
      links: [
        { href: '/#new-games', label: t('linkNew') },
        { href: '/#top-rated', label: t('linkTop') },
        { href: '/#browse-categories', label: t('linkCategories') },
      ],
    },
    {
      title: t('colCompany'),
      links: [
        { href: '/about', label: t('linkAbout') },
        { href: '/contact', label: t('linkContact') },
      ],
    },
    {
      title: t('colDevelopers'),
      links: [
        { href: '/developer', label: t('linkPublish') },
        { href: '/developer', label: t('linkDashboard') },
      ],
    },
    {
      title: t('colLegal'),
      links: [
        { href: '/privacy', label: t('linkPrivacy') },
        { href: '/terms', label: t('linkTerms') },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-muted/10 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <p className="font-display text-xl font-bold text-fg">
            <span className="text-accent">●</span> {tn('brand')}
          </p>
          <p className="max-w-xs text-sm text-muted">{t('tagline')}</p>
          <LanguageSwitcher />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-display text-sm font-semibold text-fg">{col.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="transition hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="border-t border-muted/10 px-4 py-6 text-center text-xs text-muted">
        {t('copyright', { year })}
      </p>
    </footer>
  );
}
