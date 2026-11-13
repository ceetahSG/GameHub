import { getTranslations } from 'next-intl/server';

const SIZES = {
  leaderboard: { className: 'h-[90px] w-[728px]', label: '728×90' },
  mobile: { className: 'h-[50px] w-[320px]', label: '320×50' },
  sidebar: { className: 'h-[250px] w-[300px]', label: '300×250' },
} as const;

// Placeholder only. Swap the inner content for a real ad network later.
export default async function AdSlot({
  size,
  className = '',
}: {
  size: keyof typeof SIZES;
  className?: string;
}) {
  const t = await getTranslations('common');
  const s = SIZES[size];

  return (
    <div
      role="region"
      aria-label={t('ad')}
      className={`flex max-w-full flex-col items-center justify-center gap-1 rounded-card border border-dashed border-muted/40 bg-surface text-xs text-muted ${s.className} ${className}`}
    >
      <span>{t('ad')}</span>
      <span>{s.label}</span>
    </div>
  );
}
