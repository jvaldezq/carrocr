import { Search } from "lucide-react"

export const Filters = () => {
  return (
    <button className="fixed bottom-4 right-4 z-10 bg-black rounded-full p-2 md:p-3 drop-shadow-lg">
      <Search className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </button>
  )
}