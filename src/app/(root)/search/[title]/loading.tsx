export default function Loading() {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block w-16 h-16 border-4 border-t-blue-500 border-r-blue-500 border-b-gray-200 border-l-gray-200 rounded-full animate-spin" role="status" aria-label="Loading">
                    <span className="sr-only">Searching...</span>
                </div>
                <p className="mt-4 text-lg font-semibold">Loading...</p>
            </div>
        </div>
    )
}