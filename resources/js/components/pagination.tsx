import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Pagination as PaginationType } from './../types/pagination'

export function Pagination() {
    const { props } = usePage();
    const pagination = props.items as PaginationType<never>;

    const goTo = (url: string | null) => {
        if (url) {
            Inertia.get(url, {}, { preserveScroll: true });
        }
    }

    return (
        <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
                Page {pagination.current_page} of {pagination.last_page}
            </div>

            <div className="flex gap-2">
                <button
                    disabled={!pagination.prev_page_url}
                    onClick={() => goTo(pagination.prev_page_url)}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                >
                    Previous
                </button>

                <button
                    disabled={!pagination.next_page_url}
                    onClick={() => goTo(pagination.next_page_url)}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
