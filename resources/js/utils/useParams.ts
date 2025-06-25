import { router } from '@inertiajs/react'
export function useParams(): [
    Record<string, string>,
    (newParams: Record<string, string | null | undefined>) => void
] {
    const getParams = () => Object.fromEntries(new URLSearchParams(window.location.search))

    const setParams = (newParams: Record<string, string | null | undefined>) => {
        const current = new URLSearchParams(window.location.search)
        for (const [key, value] of Object.entries(newParams)) {
            if (!value || value === '0') {
                current.delete(key)
            } else {
                current.set(key, value)
            }
        }
        const query = Object.fromEntries(current.entries())
        router.get(window.location.pathname, query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        })
    }

    return [getParams(), setParams]
}

