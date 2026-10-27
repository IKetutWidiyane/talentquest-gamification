"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  const safeTotal = Math.max(1, Math.floor(totalPages));
  const currentPage = Math.min(
    safeTotal,
    Math.max(1, Math.floor(page))
  );
  const siblings = Math.max(0, Math.floor(siblingCount));

  const startPage = Math.max(1, currentPage - siblings);
  const endPage = Math.min(safeTotal, currentPage + siblings);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <nav
      aria-label="Navigasi halaman"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
    >
      <p className="text-sm text-muted">
        Halaman{" "}
        <span className="font-medium text-foreground">{currentPage}</span>
        {" "}dari{" "}
        <span className="font-medium text-foreground">{safeTotal}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          aria-label="Halaman sebelumnya"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <CaretLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "secondary" : "ghost"}
              size="sm"
              aria-current={currentPage === 1 ? "page" : undefined}
              aria-label="Halaman 1"
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
            {startPage > 2 && (
              <span aria-hidden="true" className="px-1 text-muted">
                …
              </span>
            )}
          </>
        )}

        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "secondary" : "ghost"}
            size="sm"
            aria-label={`Halaman ${pageNumber}`}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}

        {endPage < safeTotal && (
          <>
            {endPage < safeTotal - 1 && (
              <span aria-hidden="true" className="px-1 text-muted">
                …
              </span>
            )}
            <Button
              variant={currentPage === safeTotal ? "secondary" : "ghost"}
              size="sm"
              aria-label={`Halaman ${safeTotal}`}
              aria-current={currentPage === safeTotal ? "page" : undefined}
              onClick={() => onPageChange(safeTotal)}
            >
              {safeTotal}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          aria-label="Halaman berikutnya"
          disabled={currentPage >= safeTotal}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <CaretRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}