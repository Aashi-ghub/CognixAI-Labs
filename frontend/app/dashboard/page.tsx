"use client"

import { useAuth } from "../../lib/auth-context"
import { AuthGuard } from "../../components/auth-guard"

function DashboardContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome back!</h2>
              <p className="text-gray-600">
                You are successfully authenticated with Google OAuth.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">User Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">User ID:</span> {user?.id}</p>
                <p><span className="font-medium">Provider:</span> {user?.app_metadata?.provider}</p>
                <p><span className="font-medium">Created:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">🎉 Google Authentication Success!</h3>
              <p className="text-blue-700 text-sm">
                Your Google OAuth integration is working perfectly. The user profile has been automatically 
                created in your Supabase database with the information from their Google account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
