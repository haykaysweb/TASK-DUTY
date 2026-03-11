import { Loader } from "lucide-react"

export default function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-[#980ffa] text-2xl"/>
    </div>
  )
}
