import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { formatNumber } from '@/lib/format';
import type { Game } from '@/data/games';

export default async function GameCard({ game }: { game: Game }) {
  const t = await getTranslations('common');
  const tcat = await getTranslations('categories');
  const locale = await getLocale();

  return (
    <article className="group relative overflow-hidden rounded-card bg-surface shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-primary/30">
      <Link href={`/games/${game.slug}`} aria-label={`${t('play')} ${game.title}`} className="block">
        <div className="relative flex aspect-video items-center justify-center" style={{ background: game.gradient }}>
          <span aria-hidden className="text-5xl md:text-6xl">
            {game.emoji}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100"
          >
            <span className="grid h-14 w-14 place-items-center rounded-pill bg-accent shadow-lg">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>

        <div className="space-y-2 p-4">
          <span className="inline-block rounded-pill bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            {tcat(game.category)}
          </span>
          <h3 className="truncate font-display text-base font-semibold text-fg">{game.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-semibold text-accent">★ {formatNumber(game.rating, locale, 1)}</span>
            <span>{t('plays', { count: formatNumber(game.plays, locale) })}</span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={t('favourite')}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-pill bg-bg/70 text-fg backdrop-blur transition hover:text-error"
      >
        ♥
      </button>
    </article>
  );
}
