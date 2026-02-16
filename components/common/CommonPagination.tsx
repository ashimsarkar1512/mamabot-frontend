"use client";

import Button from "@/components/ui/Button";

type CommonPaginationProps = {
  page: number;
  limit: number;
  totalPages: number;
  setLimit: (limit: number) => void;
  onPageChange: (page: number) => void;
};

export default function CommonPagination({
  page,
  limit = 10,
  totalPages,
  setLimit,
  onPageChange,
}: CommonPaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 4) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 3) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-4">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Prev Button */}
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1.5 px-4 py-2 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Prev</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-3 py-2 text-gray-400 select-none"
              >
                ...
              </span>
            ) : (
              <Button
                key={`page-${p}`}
                variant={p === page ? "primary" : "outline"}
                className={`min-w-[40px] px-4 py-2  transition-all ${
                  p === page
                    ? "shadow-md scale-105 font-semibold"
                    : "hover:shadow-sm hover:scale-105"
                }`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            ),
          )}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1.5 px-4 py-2 transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

      {/* Page Info & Limit Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            Page <span className="text-primary font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="limit-select"
            className="text-sm font-medium text-gray-600 whitespace-nowrap"
          >
            Rows per page:
          </label>
          <select
            id="limit-select"
            name="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer transition-all hover:border-primary hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
