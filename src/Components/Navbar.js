import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white w-full flex items-center justify-center fixed top-0 max-sm:static -z-0 py-4 shadow-lg">
      <h1 className='text-5xl' onClick={() => navigate('/')}>Lichess</h1>
      <nav className="ml-auto w-96 max-sm:hidden">
        <ul className="flex justify-between mr-8">
          <li onClick={() => navigate('/')}>Home</li>
          <li className='font-bold hover:cursor-pointer hover:underline text-cyan-500 active:underline'><a href='https://lichess.org/?user=maia5#friend' target='_blank'>Play against AI</a></li>
          <li onClick={() => navigate('/contact')}>Contact Us</li>
          <li className='text-red-600 hover:cursor-pointer'>Log Out</li>
        </ul>
      </nav>
    </header>
  )
}