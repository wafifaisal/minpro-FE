'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function UserProfileForm() {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')
  const [avatar, setAvatar] = useState('sample')
  const [password, setPassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Update profile', { firstName, lastName, avatar, password })
  }

  const handleVerifyEmail = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      alert('Verification email sent!')
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <Image
          src={`https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill,r_max/${avatar}`}
          alt="Profile Avatar"
          width={200}
          height={200}
          className="mx-auto rounded-full"
        />
      </div>

      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input
          type="text"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-sm text-gray-500">johndoe@example.com</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Verification</label>
        <button
          type="button"
          onClick={handleVerifyEmail}
          disabled={isVerifying}
          className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Referral Code</label>
        <p className="mt-1 text-sm text-gray-500">JOHNDOE123</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Referred By</label>
        <p className="mt-1 text-sm text-gray-500">N/A</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">User Coupons</label>
        <ul className="mt-1 text-sm text-gray-500">
          <li>COUPON1 - Active</li>
          <li>COUPON2 - Used</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">User Points</label>
        <ul className="mt-1 text-sm text-gray-500">
          <li>100 points - Available</li>
          <li>50 points - Used</li>
        </ul>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </form>
  )
}

