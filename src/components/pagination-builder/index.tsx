import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export function PaginationBuilder({
  page,
  limit,
  total,
}: {
  page: number
  limit: number
  total: number
}) {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const pages: Array<number | 'ellipsis'> = []
    const delta = 2

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let start = Math.max(2, page - delta)
      let end = Math.min(totalPages - 1, page + delta)

      if (page <= delta + 1) {
        end = Math.min(2 * delta + 2, totalPages - 1)
      }

      if (page >= totalPages - delta) {
        start = Math.max(2, totalPages - 2 * delta - 1)
      }

      if (start > 2) {
        pages.push('ellipsis')
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages - 1) {
        pages.push('ellipsis')
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()
  const previousPage = page > 1 ? page - 1 : null
  const nextPage = page < totalPages ? page + 1 : null

  const buildSearchParams = (targetPage: number) => ({
    page: targetPage,
    limit: limit,
  })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {previousPage ? (
            <Link
              to="/"
              search={buildSearchParams(previousPage)}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 px-2.5 sm:pl-2.5',
              )}
              aria-label="Go to previous page"
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 px-2.5 sm:pl-2.5 opacity-50 cursor-not-allowed pointer-events-none',
              )}
              aria-disabled="true"
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </span>
          )}
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const isActive = pageNum === page
          return (
            <PaginationItem key={pageNum}>
              <Link
                to="/"
                search={buildSearchParams(pageNum)}
                className={cn(
                  buttonVariants({
                    variant: isActive ? 'outline' : 'ghost',
                    size: 'icon',
                  }),
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </Link>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          {nextPage ? (
            <Link
              to="/"
              search={buildSearchParams(nextPage)}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 px-2.5 sm:pr-2.5',
              )}
              aria-label="Go to next page"
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </Link>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'default' }),
                'gap-1 px-2.5 sm:pr-2.5 opacity-50 cursor-not-allowed pointer-events-none',
              )}
              aria-disabled="true"
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
