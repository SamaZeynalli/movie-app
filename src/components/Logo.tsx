import { Film } from "lucide-react"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
   <Link to="/" className="flex items-center gap-2 font-bold text-xl">
      <Film className="h-6 w-6 text-primary" />
      <span>MovieBox</span>
    </Link>
  )
}

export default Logo
