import { Metadata } from 'next'
import AdminAuthForm from '@/components/admin-auth-form'

export const metadata: Metadata = {
  title: 'Admin Authentication | Event Ticket Organizer',
  description: 'Login or register as an admin for the Event Ticket Organizer',
}

export default function AdminAuthPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500">
            Login or register as an admin
          </p>
        </div>
        <AdminAuthForm />
      </div>
    </div>
  )
}

