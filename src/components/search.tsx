"use client"

export function Search() {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-4 py-2 w-[200px] md:w-[300px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

