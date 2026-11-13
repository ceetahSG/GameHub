import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import GameCard from '@/components/GameCard';
import CategoryChip from '@/components/CategoryChip';
import AdSlot from '@/components/AdSlot';
import { categories, games } from '@/data/games';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: '/en', bn: '/bn', 'x-default': '/en' },
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tc = await getTranslations('common');
  const tcat = await getTranslations('categories');

  const featured = games[0];
  const trending = [...games].sort((a, b) => b.plays - a.plays).slice(0, 8);
  const newGames = games.filter((g) => g.isNew).slice(0, 4);
  const topRated = [...games].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="px-4 pt-6 md:px-8 md:pt-10">
        <div
          className="relative flex min-h-[320px] items-end overflow-hidden rounded-card p-6 md:min-h-[420px] md:p-12"
          style={{ background: featured.gradient }}
        >
          <span
            aria-hidden
            className="absolute right-6 top-6 text-7xl md:right-16 md:top-1/2 md:-translate-y-1/2 md:text-[10rem]"
          >
            {featured.emoji}
          </span>
          <div className="relative max-w-xl space-y-4">
            <span className="inline-block rounded-pill bg-bg/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {t('featured')}
            </span>
            <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
              {featured.title}
            </h1>
            <p className="text-sm text-white/90 md:text-base">{t('heroSubtitle')}</p>
            <Link
              href={`/games/${featured.slug}`}
              className="inline-flex items-center rounded-pill bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {tc('playNow')}
            </Link>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section
        aria-label={t('browseByCategory')}
        className="scrollbar-none mt-6 flex gap-2 overflow-x-auto px-4 md:flex-wrap md:overflow-visible md:px-8"
      >
        {categories.map((c) => (
          <CategoryChip key={c.key} slug={c.key} label={tcat(c.key)} />
        ))}
      </section>

      <Section id="trending" title={t('trendingNow')}>
        <div className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8">
          {trending.map((g) => (
            <div key={g.slug} className="w-[220px] flex-none snap-start md:w-[260px]">
              <GameCard game={g} />
            </div>
          ))}
        </div>
      </Section>

      <div className="mx-auto mt-12 flex max-w-7xl justify-center px-4 md:px-8">
        <div className="hidden md:block">
          <AdSlot size="leaderboard" />
        </div>
        <div className="md:hidden">
          <AdSlot size="mobile" />
        </div>
      </div>

      <Section id="new-games" title={t('newGames')}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {newGames.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </Section>

      <Section id="top-rated" title={t('topRated')}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {topRated.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </Section>

      <Section id="browse-categories" title={t('browseByCategory')}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/category/${c.key}`}
              className="flex aspect-[4/3] flex-col justify-between rounded-card p-5 text-white transition hover:-translate-y-1"
              style={{ background: c.gradient }}
            >
              <span aria-hidden className="text-4xl">
                {c.emoji}
              </span>
              <span className="font-display text-lg font-semibold">{tcat(c.key)}</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto mt-12 max-w-7xl scroll-mt-20 px-4 md:px-8">
      <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
