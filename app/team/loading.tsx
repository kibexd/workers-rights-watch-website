"use client"

import { Loading } from "@/components/ui/loading"

export default function TeamLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <Loading 
        size={60} 
        color="#10bfae" 
        message="Loading team members..." 
      />
    </div>
  )
} 