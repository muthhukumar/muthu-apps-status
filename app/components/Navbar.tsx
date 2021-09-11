import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'

function Navbar() {
  return (
    <header className="px-4 py-16">
      <nav className="flex items-center">
        <Link to="/">
          <MdDashboard size="50" className="mr-2 text-black" />
        </Link>
        <div className="text-2xl font-semibold">Muthu</div>
      </nav>
    </header>
  )
}

export default Navbar
