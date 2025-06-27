import { Search } from "lucide-react"

export const Filters = () => {
  return (
    <button className="fixed bottom-4 right-4 z-10 bg-black rounded-full p-2 md:p-4 shadow-lg">
      <Search className="w-6 h-6 md:w-10 md:h-10 text-white" />
    </button>
  )
}