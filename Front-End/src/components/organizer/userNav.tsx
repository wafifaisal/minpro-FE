"use client"

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative h-8 w-8 rounded-full bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image 
          src="/avatars/01.png" 
          alt="@johndoe" 
          width={32}
          height={32}
          className="rounded-full" 
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
            <div className="border-t border-gray-100"></div>
            <Link href="/profile/organizer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
            <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
            <div className="border-t border-gray-100"></div>
            <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Log out</Link>
          </div>
        </div>
      )}
    </div>
  )
}

