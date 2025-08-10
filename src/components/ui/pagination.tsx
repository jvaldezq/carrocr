import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  totalPages,
  currentPage,
  basePath = '/',
  baseQuery = {},
  className,
}: {
  totalPages: number;
  currentPage: number;
  basePath?: string;
  baseQuery?: Record<string, string>;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const pageNums = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)}>
      <PageLink
        disabled={currentPage <= 1}
        href={makeHref(basePath, baseQuery, currentPage - 1)}
        ariaLabel="Anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </PageLink>
      {pageNums.map((n, i) =>
        typeof n === 'number' ? (
          <PageLink
            key={i}
            href={makeHref(basePath, baseQuery, n)}
            isActive={n === currentPage}
          >
            {n}
          </PageLink>
        ) : (
          <span key={i} className="px-2 text-sm text-neutral-500">
            …
          </span>
        ),
      )}
      <PageLink
        disabled={currentPage >= totalPages}
        href={makeHref(basePath, baseQuery, currentPage + 1)}
        ariaLabel="Siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  isActive,
  disabled,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const Comp = disabled ? 'span' : Link;
  return (
    <Comp
      href={disabled ? undefined! : href}
      aria-label={ariaLabel}
      className={cn(
        'select-none rounded-md px-3 py-1 text-sm border',
        isActive
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-neutral-200 hover:border-black',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      {children}
    </Comp>
  );
}

function makeHref(basePath: string, baseQuery: Record<string, string>, page: number) {
  const usp = new URLSearchParams(baseQuery);
  usp.set('page', String(page));
  return `${basePath}?${usp.toString()}`;
}

function getPageNumbers(current: number, total: number): (number | '…')[] {
  const delta = 1;
  const pages: (number | '…')[] = [];
  const range: number[] = [];
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }
  if (current - delta > 2) pages.push(1, '…');
  else for (let i = 1; i < Math.max(2, current); i++) pages.push(i);
  pages.push(...range);
  if (current + delta < total - 1) pages.push('…', total);
  else for (let i = Math.max(current + 1, total - 1); i <= total; i++) pages.push(i);
  // Ensure unique and ordered with current
  const set = new Set<number | '…'>(pages);
  const result = Array.from(set).sort((a, b) => (a === '…' ? 0 : b === '…' ? 0 : (a as number) - (b as number)));
  // Insert current if missing
  if (!result.includes(current)) {
    const idx = result.findIndex((n) => n !== '…' && (n as number) > current);
    if (idx === -1) result.push(current);
    else result.splice(idx, 0, current);
  }
  // Normalize ellipses positions
  const normalized: (number | '…')[] = [];
  for (let i = 0; i < result.length; i++) {
    const val = result[i];
    if (val === '…') {
      if (normalized[normalized.length - 1] !== '…') normalized.push('…');
    } else normalized.push(val);
  }
  return normalized;
}
