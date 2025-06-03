import { Loading } from "@/components/ui/loading"

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm z-50">
      <Loading size={60} color="#10bfae" />
    </div>
  )
} 