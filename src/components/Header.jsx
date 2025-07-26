import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ user, setUser, cartItems }) => {
  const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const userEmail = user?.email || "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully");
  };


  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <img src="src/assets/Logo.svg" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-blue-700">MedVault</h1>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden block text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Navigation Menu */}
      <nav className={`flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 
absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent 
shadow md:shadow-none px-6 py-4 md:p-0 transition-all duration-300 
${menuOpen ? "flex" : "hidden"} md:flex`}>
        <Link to="/" className="text-gray-800 font-medium hover:text-blue-700">Home</Link>
        <Link to="/about" className="text-gray-800 font-medium hover:text-blue-700">About us</Link>
        <Link to="/products" className="text-gray-800 font-medium hover:text-blue-700">Medicines</Link>

        {!userEmail && (
          <>
            <Link to="/login" className="text-gray-800 font-medium hover:text-blue-700">Login</Link>
            <Link to="/signup" className="text-gray-800 font-medium hover:text-blue-700">SignUp</Link>
          </>
        )}

        {/* Only on mobile: Welcome + Logout */}
        {userEmail && (
          <div className="md:hidden text-center space-y-2">
            <span className="block text-gray-700 font-semibold">
              Welcome,&nbsp;
              <span className="text-blue-700 font-semibold">
                {user?.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                  : userEmail}
              </span>
            </span>


            <button
              onClick={handleLogout}
              className="bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-blue-800 hover:shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Contact Button */}
        <Link to="/contact"
          className="md:hidden bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition text-center w-full"
        >
          Contact us
        </Link>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center flex-wrap space-x-5">
        {/* Desktop Welcome + Logout */}
        {userEmail ? (
          <>
            <span className="text-sm text-gray-700 font-semibold">
              Welcome,&nbsp;
              <span className="text-blue-700">
                {user?.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                  : userEmail}
              </span>
            </span>



            <button
              onClick={handleLogout}
              className="bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-blue-800 hover:shadow transition hover:scale-105 delay-150 duration-300 ease-in-out"
            >
              Logout
            </button>
          </>
        ) : null}

        {/* Icons */}
        <Link to="/cart" title="Cart" className="relative text-blue-700 hover:text-blue-900 transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
            <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 
    2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-200 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/buy" title="Buy" className="text-blue-700 hover:text-blue-800 transition hover:translate-x-1 delay-150 duration-300 ease-in-out hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
          </svg>
        </Link>

        {/* Contact */}
        <Link to="/contact"
          className="bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
        >
          Contact us
        </Link>
      </div>
    </header>
  );
};

export default Header;
