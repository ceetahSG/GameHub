import { Link } from '@/i18n/navigation';

export default function CategoryChip({
  slug,
  label,
  active = false,
}: {
  slug: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={`/category/${slug}`}
      aria-current={active ? 'page' : undefined}
      className={`shrink-0 snap-start whitespace-nowrap rounded-pill border px-4 py-2 text-sm font-medium transition hover:border-secondary hover:text-secondary ${
        active ? 'border-transparent bg-primary text-white' : 'border-muted/30 bg-surface text-fg'
      }`}
    >
      {label}
    </Link>
  );
}
